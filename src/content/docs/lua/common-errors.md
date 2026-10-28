---
title: Common Errors
description: Fix common Lua errors in LuaHUD profiles, from missing brackets and nil values to wrong types and endless loops. Use error messages to find the cause.
sidebar:
  order: 90
---

When something goes wrong, start with the filename and line number in the error message. The actual mistake may be just before that line, such as a missing quote or `end`.

## Missing keywords or brackets

`if` needs `then` and `end`. A function needs `end`, and a `for` or `while` loop needs `do` and `end`. A `repeat` loop ends with `until condition` instead.

Also check that every `(`, `{`, and quote has a matching closing character. Indentation makes missing endings easier to spot:

```lua
local fps = 120

if fps >= 60 then
    lh.drawln("Smooth!")
end
```

## Unexpected nil

Errors mentioning arithmetic, concatenation, or indexing a `nil` value usually mean a value is missing. Check spelling, capitalization, and [scope](/lua/variables/#local-and-global-variables).

```lua
local playerName = "iFair"
lh.drawln(playerName) -- Use the same spelling and capitalization.
```

For an optional value, check before using it:

```lua
local name = nil

if name ~= nil then
    lh.drawln("Hello, " .. name)
else
    lh.drawln("No name available.")
end
```

## Calling the wrong value

An error about calling a `nil`, string, or number means the value before `()` is not a function. Check the function's name and whether you accidentally overwrote it.

When passing a callback, use the function itself, as shown in [Functions](/lua/functions/#callbacks).

## Wrong types

`"120"` is a string; `120` is a number. Use `tonumber()` for numeric text and check whether it returns `nil`. Use `tostring()` before joining a boolean or `nil` to text.

To inspect a value temporarily:

```lua
local value = "120"
lh.drawln("Type: " .. type(value) .. ", value: " .. tostring(value))
-- Output: Type: string, value: 120
```

## Conditions that behave strangely

- Use `==` to compare values; `=` assigns them.
- Use `~=` for “not equal”, not `!=`.
- `0` and `""` are truthy. Check `health > 0` or `text ~= ""` when that is what you mean.
- `condition and first or second` chooses `second` if `first` is `false` or `nil`.

## A loop does not finish

Check that its counter changes and its stopping condition can be reached. To run code on later ticks, register a callback instead of waiting in a loop.

Try a small example first, then add the rest back a little at a time. Once these basics make sense, continue to [Your First HUD](/basic-hud/your-first-hud/).
