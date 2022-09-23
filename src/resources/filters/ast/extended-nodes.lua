local handlers = {
  {
    -- use either string or array of strings
    className = "fancy-callout",
    -- className = {"fancy-callout-warning", "fancy-callout-info", ... }

    -- optional: makePandocExtendedDiv
    -- supply makePandocExtendedDiv if you need to construct
    -- your want to create and extended pandoc Div
    -- 
    -- This is here as an escape hatch, we expect most developers
    -- to not need it.
    -- makePandocExtendedDiv = function(table)
    --   -- returns a pandoc Div that can be parsed back into a table
    --   -- later use
    -- end

    -- the name of the ast node, used as a key in extended ast filter tables
    astName = "FancyCallout",

    -- a function that takes the extended ast node as supplied in user markdown
    -- and parses it into a table. if "attr" is set, then that is used
    -- as the attr attribute of the Div that will hold it.
    parse = function(div)
      return {
        -- the value of class must either be equal to className if it's a string,
        -- or one of the entries in className if it's an array

        -- class must be a string
        class = pandoc.utils.stringify(div.attr.classes),
        
        -- attr, if provided, must be a pandoc Attr
        attr = div.attr,

        -- all other fields must be pandoc Blocks
        title = div.content[1],
        content = div.content[2],
      }
    end,

    -- either a function that unconditionally renders the extendedNode into
    -- output, or a table of functions, whose keys are the output formats
    
    render = function(extendedNode)
      local blocks = {}
      table.insert(blocks, extendedNode.title)
      table.insert(blocks, extendedNode.content)
      extendedNode.attr.attributes["quarto-extended-ast-tag"] = nil
      return pandoc.Div(blocks, extendedNode.attr)
    end,
    -- render = {
    --   html = function(extendedNode)
    --     -- render to html
    --   end,
    --   pdf = function(extendedNode)
    --     -- render to pdf
    --   end,
    --   docx = function(extendedNode)
    --     -- render to docx
    --   end,
    --   default = function(extendedNode)
    --     -- fallback format
    --   end,
    -- }
  },
}

kExtendedAstTag = "quarto-extended-ast-tag"

function ast_node_property_pairs(node)
  local next = pairs(node)
  local index

  return function()
    local k, v
    repeat
      k, v = next(node, index)
      if k == nil then
        return nil
      end
      index = k
    until is_plain_key(k) and k ~= "attr" and type(v) ~= "function"
    return k, v
  end
end

function ast_array_pairs(node, init)
  local next = pairs(node)
  local index

  return function()
    local k, v
    repeat
      k, v = next(node, index)
      if k == nil then
        return nil
      end
      index = k
    until type(k) == "number" and (not init or k >= init)
    return k, v
  end
end

function ast_node_array_map(node_array, fn)
  if tisarray(node_array) then
    return tmap(node_array, fn)
  else
    local result = _build_extended_node(node_array.t)
    for k, v in pairs(node_array) do
      if is_plain_key(k) then
        result[k] = fn(v)
      end
    end
    return result
  end
end

local _quarto_pandoc = {
  Inlines = function(args)
    local result = _build_extended_node("Inlines")
    for k, v in pairs(args or {}) do
      if is_plain_key(k) then
        result[k] = v
      end
    end
    return result
  end,
  Blocks = function(args)
    local result = _build_extended_node("Blocks")
    for k, v in pairs(args or {}) do
      if is_plain_key(k) then
        result[k] = v
      end
    end
    return result
  end,
}

setmetatable(_quarto_pandoc, {
  __index = function(_, key)
    return quarto.ast.makeExtendedNodeFactory(key)
  end
})

_pandoc_constructors_args = {
  Pandoc = { "blocks", "meta" },
  -- FIXME do all of meta
  -- Meta
  
  -- blocks
  BlockQuote = { "content" },
  BulletList = { "content" },
  CodeBlock = { "text", "attr" },
  DefinitionList = { "content" },
  Div = { "content", "attr" },
  Header = { "level", "content", "attr" },
  HorizontalRule = {},
  LineBlock = { "content" },
  Null = {},
  OrderedList = { "content", "listAttributes" },
  Para = { "content" },
  Plain = { "content" },
  RawBlock = { "format", "text" },
  Table = { "caption", "colspecs", "head", "bodies", "foot", "attr" },

  -- inlines
  Cite = { "content", "citations" },
  Code = { "text", "attr" },
  Emph = { "content" },
  Image = { "caption", "src", "title", "attr" },
  LineBreak = {},
  Link = { "content", "target", "title", "attr" },
  Math = { "mathtype", "text" },

  -- FIXME add DisplayMath and InlineMath special cases
  Note = { "content" },
  Quoted = { "quotetype", "content" },
  
  -- FIXME add SingleQuoted and DoubleQuoted special cases
  RawInline = { "format", "text" },

  SmallCaps = { "content" },
  SoftBreak = {},
  Space = {},
  Span = { "content", "attr" },
  Str = { "text" },
  Strikeout = { "content" },
  Strong = { "content" },
  Subscript = { "content" },
  Superscript = { "content" },
  Underline = { "content" }
}

local pandoc_list_methods = {
  extend = function(self, lst)
    for _, v in pairs(lst) do
      table.insert(self, v)
    end
  end,
  find = function(self, needle, init)
    for _, v in ast_array_pairs(self, init) do
      if needle == v then
        return i, v
      end
    end
  end,
  find_if = function(self, pred, init)
    for _, v in ast_array_pairs(self, init) do
      if pred(v) then
        return i, v
      end
    end
  end,
  filter = function(self, pred)
    local result = _build_extended_node(self.t)
    for _, v in ast_array_pairs(self) do
      if pred(v) then
        table.insert(result, v)
      end
    end
    return result
  end,
  includes = function(self, needle, init)
    for _, v in ast_array_pairs(self, init) do
      if needle == v then
        return true
      end
    end
    return false
  end,
  insert = function(self, pos, value)
    table.insert(self, pos, value)
  end,
  map = function(self, fn)
    return ast_node_array_map(self, fn)
  end,
  new = function(self, tbl)
    print("pandoc.List:new() emulation is Unimplemented")
    crash_with_stack_trace()
    -- FIXME don't know how to make this work
  end,
  remove = function(self, pos)
    return table.remove(self, pos)
  end,
  sort = function(self, comp)
    local tmp = {}
    for _, v in ast_array_pairs(self) do
      table.insert(tmp, v)
    end
    table.sort(tmp, comp)
    for i, v in pairs(tmp) do
      self[i] = v
    end
  end
}

local pandoc_ast_methods = {
  show = function(_)
    return "UNIMPLEMENTED_SHOW_RESULT"
  end,
  clone = function(self)
    -- FIXME this should be a deep copy
    return quarto.ast.copyAsExtendedNode(self)
  end,
  walk = emulate_pandoc_walk
}

function _build_extended_node(t)
  local ExtendedAstNode = {}

  if t == "Inlines" or t == "Blocks" then
    setmetatable(ExtendedAstNode, {
      __index = function(_, key)
        if key == "t" or key == "tag" then return t end
        if key == "-is-extended-ast-" then return true end
        if key == "-quarto-internal-type-" then return t end
        if key == "attributes" and tbl.attr then return tbl.attr.attributes end
        return pandoc_ast_methods[key] or pandoc_list_methods[key]
      end
    })
  else
    setmetatable(ExtendedAstNode, {
      __index = function(tbl, key)
        if key == "t" or key == "tag" then return t end
        if key == "-is-extended-ast-" then return true end
        if key == "-quarto-internal-type-" then return t end
        if key == "attributes" and tbl.attr then return tbl.attr.attributes end
        return pandoc_ast_methods[key]
      end
    })
  end

  return ExtendedAstNode
end

quarto.ast = {
  pandoc = _quarto_pandoc,
  makeExtendedNodeFactory = function(t)
    return function(...)
      local argsTable = _pandoc_constructors_args[t]
      if argsTable == nil then
        -- assume this is a special case that's handled directly by quarto.ast.pandoc
        return quarto.ast.pandoc[t](table.unpack(arg or {}))
      else
        local result = _build_extended_node(t)
        for i, v in pairs(argsTable) do
          result[v] = arg[i]
        end
        return result
      end
    end
  end,

  copyAsExtendedNode = function(el)
    -- this will probably crash other places, but they shouldn't be calling us like this anyway
    if el == nil then return nil end

    if type(el) ~= "table" and type(el) ~= "userdata" then
      error("Internal Error: copyAsExtendedNode can't handle type " .. type(el))
      crash_with_stack_trace()
      return {} -- a lie to appease to type system
    end

    local ExtendedAstNode = _build_extended_node(el.t or el["-quarto-internal-type-"] or pandoc.utils.type(el))

    function is_content_field(k)
      return k ~= "walk" and k ~= "clone" and k ~= "show" and is_plain_key(k)
    end

    for k, v in pairs(el) do
      if is_content_field(k) then
        ExtendedAstNode[k] = v
      end
    end
    return ExtendedAstNode
  end,

  normalize = normalize,
  denormalize = denormalize,
  
  addHandler = function(handler)
    local state = (preState or postState).extendedAstHandlers
    if type(handler.className) == "nil" then
      print("ERROR: handler must define className")
      quarto.utils.dump(handler)
      crash_with_stack_trace()
    elseif type(handler.className) == "string" then
      state.namedHandlers[handler.className] = handler
    elseif type(handler.className) == "table" then
      for i, name in pairs(handler.className) do
        state.namedHandlers[name] = handler
      end
    else
      print("ERROR: className must be a string or an array of strings")
      quarto.utils.dump(handler)
      crash_with_stack_trace()
    end
  end,

  resolveHandler = function(name)
    local state = (preState or postState).extendedAstHandlers
    if state.namedHandlers ~= nil then
      return state.namedHandlers[name]
    end
    return nil
  end,

  unbuild = function(extendedAstNode)
    local name = extendedAstNode.attr.attributes["quarto-extended-ast-tag"]
    local handler = quarto.ast.resolveHandler(name)
    if handler == nil then
      print("ERROR: couldn't find a handler for " .. name)
      crash_with_stack_trace()
    end
    local divTable = { attr = extendedAstNode.attr }
    local key
    for i, v in pairs(extendedAstNode.content) do
      if i % 2 == 1 then
        key = pandoc.utils.stringify(v)
      else
        divTable[key] = v
      end
    end
    divTable.class = pandoc.utils.stringify(divTable.class)
    return divTable
  end,

  build = function(name, nodeTable)
    local handler = quarto.ast.resolveHandler(name)
    if handler == nil then
      local pandocArgs = _pandoc_constructors_args[name]
      if pandocArgs == nil then
        print("Internal Error: couldn't find a handler for " .. tostring(name))
        crash_with_stack_trace()
      end
      local args = {}
      for _, v in pairs(pandocArgs) do
        table.insert(args, nodeTable[v])
      end
      return pandoc[name](table.unpack(args))
    end
    if handler.makePandocExtendedDiv then
      return handler.makePandocExtendedDiv(nodeTable)
    end

    local resultAttr
    local blocks = {}
    for key, value in pairs(nodeTable) do
      if key == "attr" then
        resultAttr = value
      else
        table.insert(blocks, pandoc.Str(key))
        table.insert(blocks, value)
      end                    
    end
    if resultAttr == nil then
      resultAttr = pandoc.Attr("", { name }, {})
    end
    resultAttr.attributes[kExtendedAstTag] = name
    return pandoc.Div(blocks, resultAttr)
  end,
}

function constructExtendedAstHandlerState()
  local state = {
    namedHandlers = {},
  }

  if preState ~= nil then
    preState.extendedAstHandlers = state
  end
  if postState ~= nil then
    postState.extendedAstHandlers = state
  end

  for i, handler in pairs(handlers) do
    quarto.ast.addHandler(handler)
  end
end

constructExtendedAstHandlerState()

