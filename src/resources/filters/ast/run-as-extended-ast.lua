function do_it(doc, filters)
  if tisarray(filters) then
    -- print("This is the old doc")
    -- quarto.utils.dump(doc)

    for i, v in pairs(filters) do
      -- print("Will run filter " .. tostring(v._filter_name or i) .. ": ")
      -- quarto.utils.dump(doc)
      -- quarto.utils.dump(doc, true)
      local newDoc = doc:walk(v)
      if newDoc ~= nil then
        doc = newDoc
      end
      -- print("This is the new doc:")
      -- quarto.utils.dump(doc)
    end
  elseif type(filters) == "table" then
    doc = doc:walk(filters)
  else
    error("Internal Error: do_it expected a table or array instead of " .. type(filters))
    crash_with_stack_trace()
  end
  return doc
end

function emulate_pandoc_filter(filters, unextended)
  return {
    traverse = 'topdown',
    Pandoc = function(doc)

      -- upgrade pandoc to our stuff
      local walk_block = pandoc.walk_block
      local walk_inline = pandoc.walk_inline

      pandoc.walk_block = function(el, filter)
        if el.is_emulated then
          return el:walk(filter)
        end
        return walk_block(el, filter)
      end
      pandoc.walk_inline = function(el, filter)
        if el.is_emulated then
          return el:walk(filter)
        end
        return walk_inline(el, filter)
      end

      if not unextended then
        doc = normalize(doc)
      end
      doc = do_it(doc, filters)
      if not unextended then
        -- quarto.utils.dump(doc)
        doc = denormalize(doc)
        -- print(doc)
        if doc == nil then
          error("Internal Error: emulate_pandoc_filter received nil from denormalize")
          crash_with_stack_trace()
          return pandoc.Pandoc({}, {}) -- a lie to appease the type system
        end
      end

      -- restore pandoc
      pandoc.walk_block = walk_block
      pandoc.walk_inline = walk_inline

      return pandoc.Pandoc(doc.blocks, doc.meta), false
    end
  }
end

function run_as_extended_ast(specTable, unextended)
  local pandocFilterList = {}
  if specTable.pre then
    for _, v in pairs(specTable.pre) do
      table.insert(pandocFilterList, v)
    end
  end

  table.insert(pandocFilterList, emulate_pandoc_filter(specTable.filters, unextended))
  if specTable.post then
    for _, v in pairs(specTable.post) do
      table.insert(pandocFilterList, v)
    end
  end

  return pandocFilterList
end