-- pandocwalk.lua
-- emulate the walk method for our extended ast
-- Copyright (C) 2022 by RStudio, PBC

-- We base this emulation on the original Haskell source:
--   https://github.com/pandoc/pandoc-lua-marshal

pairsByKeys = function (t, f)
  local a = {}
  for n in pairs(t) do table.insert(a, n) end
  table.sort(a, f)
  local i = 0      -- iterator variable
  local iter = function ()   -- iterator function
    i = i + 1
    if a[i] == nil then return nil
    else return a[i], t[a[i]]
    end
  end
  return iter
end

local typesThenValues = function(a, b)
  local ta = type(a)
  local tb = type(b)
  if ta < tb then return true end
  if ta > tb then return false end
  return a < b
end

function as_normalize(n)
  if type(n) == "userdata" then
    return normalize(n)
  end
  return n
end

local is_block = {
  BlockQuote = true,
  BulletList = true,
  CodeBlock = true,
  DefinitionList = true,
  Div = true,
  Header = true,
  HorizontalRule = true,
  LineBlock = true,
  OrderedList = true,
  Para = true,
  Plain = true,
  RawBlock = true,
  Table = true
}

local is_inline = {
  Cite = true,
  Code = true,
  Emph = true,
  Image = true,
  LineBreak = true,
  Link = true,
  Math = true,
  Note = true,
  Quoted = true,
  RawInline = true,
  SmallCaps = true,
  SoftBreak = true,
  Space = true,
  Span = true,
  Str = true,
  Strikeout = true,
  Strong = true,
  Subscript = true,
  Superscript = true,
  Underline = true
}

function is_ast_node_array(tbl)
  if type(tbl) ~= "table" then
    return false
  end
  if tisarray(tbl) then
    return true
  end
  local t = tbl.t or tbl["-quarto-internal-type-"]
  return t == "Inlines" or t == "Blocks"
end

function apply_filter_topdown_blocks_or_inlines(filter, blocks_or_inlines)
  local t = blocks_or_inlines.t or blocks_or_inlines["-quarto-internal-type-"]
  local filterFn = filter[t]
  if filterFn ~= nil then
    local filterResult, cut = filterFn(blocks_or_inlines)
    if filterResult ~= nil then
      blocks_or_inlines = ast_node_array_map(filterResult, as_normalize)
    end
    if cut == false then
      return blocks_or_inlines
    end
  end

  local result = quarto.ast.pandoc[t]()
  for k, v in pairsByKeys(blocks_or_inlines, typesThenValues) do
    if is_content_field(k) then
      local filterResult = apply_filter_topdown(filter, v)
      if filterResult == nil then
        -- nil means unchanged object
        table.insert(result, v)
      elseif is_ast_node_array(filterResult) then
        -- array of results: splice those in.
        -- this includes empty array, which means "remove me"
        for _, innerV in ast_node_property_pairs(filterResult) do
          table.insert(result, as_normalize(innerV))
        end
      else
        -- changed object, use that instead
        table.insert(result, as_normalize(filterResult))
      end          
    end
  end
  return result  
end

-- from https://www.lua.org/pil/2.html
is_atom = {
  ["number"] = true,
  ["nil"] = true,
  ["function"] = true,
  ["boolean"] = true,
  ["string"] = true, -- technically not true, but true for our purposes
  -- userdata
  -- thread?!?!
}

function apply_filter_topdown(filter, node)

  local nodeType = type(node)
  if is_atom[nodeType] then
    return node
  end
  local t = node.t or node["-quarto-internal-type-"]

  if t == "Blocks" or t == "Inlines" then
    local result = apply_filter_topdown_blocks_or_inlines(filter, node)
    return result
  end 

  -- are there user filter functions or fallback functions?
  local fn = filter[t] or filter[(is_block[t] and "Block") or "Inline"]

  if fn ~= nil then
    local filterResult, cut = fn(node)

    -- if filter function returned false as second value, we cut
    -- short the traverse
    if cut == false then
      -- if filter function returned an actual pandoc object in their filters,
      -- we allow that and renormalize it before continuing.
      if filterResult == nil then
        return node
      elseif is_ast_node_array(filterResult) then
        return ast_node_array_map(filterResult, as_normalize)
      else
        return as_normalize(filterResult)
      end
    end

    -- if filter function returned an array, we recurse
    -- and return the array
    if is_ast_node_array(filterResult) then
      -- if filter function returned an actual pandoc object in their filters,
      -- we allow that and renormalize it before continuing.
      return ast_node_array_map(filterResult, function(innerNode) 
        return apply_filter_topdown(filter, as_normalize(innerNode)) 
      end)
    end

    -- if filter function returned a value, replace original node
    if filterResult ~= nil then
      node = as_normalize(filterResult)
      if is_atom[type(node)] then
        return node
      end
      t = node and (node.t or node["-quarto-internal-type-"])
    end
  end

  -- as a totally hacky special case, we bail out on regular tables
  -- which appear from our Meta handling.
  -- FIXME we need to fix meta handling
  if node.clone == nil then
    return node
  end

  -- now we recurse on the node, either new or old
  local result = node:clone()
  for k, v in ast_node_property_pairs(result) do
    result[k] = apply_filter_topdown(filter, v)
  end
  return result
end

function walk_inline_splicing(filter, node)
  return apply_filter_topdown({
    Inline = function(inline)
      local filterFn = is_inline[inline.t] and (filter[inline.t] or filter.Inline)
      if filterFn == nil then
        return inline
      end
      return filterFn(inline)
    end,
  }, node)
end

function walk_block_splicing(filter, node)
  return apply_filter_topdown({
    Block = function(block)
      local filterFn = is_block[block.t] and (filter[block.t] or filter.Block)
      if filterFn == nil then
        return block
      end
      return filterFn(block)
    end,
  }, node)
end

function walk_inlines_straight(filter, node)
  -- it's a nop, special-case it
  if filter.Inlines == nil then
    return node
  end
  return apply_filter_topdown({
    Inlines = function(inlines)
      return apply_filter_topdown_blocks_or_inlines({
        Inlines = filter.Inlines
      }, inlines)
    end
  }, node)
end

function walk_blocks_straight(filter, node)
  -- it's a nop, special-case it
  if filter.Blocks == nil then
    return node
  end
  return apply_filter_topdown({
    Blocks = function(blocks)
      return apply_filter_topdown_blocks_or_inlines({
        Blocks = filter.Blocks
      }, blocks)
    end
  }, node)
end

-- pandoc-lua-marshal/src/Text/Pandoc/Lua/Marshal/Shared.hs:walkBlocksAndInlines
function walk_blocks_and_inlines(node, filter)
  -- walkBlocksAndInlines filter' =
  -- case filterWalkingOrder filter' of
  --   WalkTopdown     -> walkM (applyFilterTopdown filter')
  --   WalkForEachType -> walkInlineSplicing filter'
  --                  >=> walkInlinesStraight filter'
  --                  >=> walkBlockSplicing filter'
  --                  >=> walkBlocksStraight filter'

  if filter.traverse == "topdown" then
    return apply_filter_topdown(filter, node)
  else
    node = walk_inline_splicing(filter, node)
    node = walk_inlines_straight(filter, node)
    node = walk_block_splicing(filter, node)
    node = walk_blocks_straight(filter, node)
    return node
  end
end

function apply_meta_function(doc, filter)
  if filter.Meta then
    local filterResult = filter.Meta(doc.meta)
    if filterResult ~= nil then
      doc = doc:clone()
      doc.meta = filterResult
    end
  end
  return doc
end

function apply_pandoc_function(doc, filter)
  if filter.Pandoc then
    return filter.Pandoc(doc)
  end
  return doc
end


function apply_fully(filter, doc)
  -- pandoc-lua-marshal/src/Text/Pandoc/Lua/Marshal/Pandoc.hs:applyFully
  if filter.traverse == "topdown" then
    doc = apply_pandoc_function(doc, filter)
    doc = apply_meta_function(doc, filter)
    doc = walk_blocks_and_inlines(doc, filter)
  else -- typewise
    doc = walk_blocks_and_inlines(doc, filter)
    doc = apply_meta_function(doc, filter)
    doc = apply_pandoc_function(doc, filter)
  end
  return doc
end

function emulate_pandoc_walk(node, filter)
  return apply_fully(filter, node)
end