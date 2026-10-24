---
title: Modules
description: Share helper functions between Lua files with require.
sidebar:
  order: 80
---

A module is a Lua file that returns a value, usually a table of functions. Use it to share helpers between profiles.

## Creating a module

Create `helpers/formatting.lua` inside your [profile directory](/getting-started/accessing-files/):

```lua
local formatting = {}

function formatting.label(name, value)
    return name .. ": " .. tostring(value)
end

return formatting
```

`function formatting.label(...)` stores a function in the table's `label` field. Keep drawing and event registration in the profile; this helper only builds text.

## Using a module

In your profile, load the helper with `require()`:

```lua
local formatting = require("helpers.formatting")

lh.drawln(formatting.label("FPS", 120)) -- Output: FPS: 120
```

Use dots between folder names, and leave off `.lua`. In LuaHUD, `helpers.formatting` looks for `helpers/formatting.lua`, then `helpers/formatting/init.lua`, relative to the profile directory.

## Modules are cached

`require()` normally runs a module once and remembers its returned value. Requiring it again returns that same value, including from another profile in the same runtime.

If the returned value is a table, changes to it are shared. Prefer local variables inside helper functions for temporary work.

Remember the final `return formatting`. If a module returns nothing and does not set its own cache entry, `require()` returns `true` instead of your helper table.

For a missing-module error, check the folder, filename, capitalization, and module name. See [Common Errors](/lua/common-errors/) for more debugging tips.
