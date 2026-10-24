---
title: Conditionals
description: Run code only when a condition is met.
sidebar:
  order: 30
---

Conditionals let you choose which code runs.

```lua
local fps = 120

if fps >= 60 then
    lh.drawln("Your computer is very strong!")
end
```

The code between `then` and `end` runs only when the condition is truthy.

## else and elseif

Use `else` for an alternative, and `elseif` to check more conditions:

```lua
local fps = 120

if fps < 60 then
    lh.drawln("How long do you bake your pc for?")
elseif fps < 200 then
    lh.drawln("Your computer is very strong!")
else
    lh.drawln("NASA wants your computer.")
end
```

Lua checks from top to bottom and runs only the first matching branch. Here, the second branch covers FPS from 60 up to, but not including, 200. `else` covers 200 and above.

`elseif` is one word. You only need one `end` for the whole chain.

## What if the condition is not a boolean?

Lua treats only `false` and `nil` as false in a condition. These are called **falsy** values. All other values are **truthy**, including `0`, `""`, and `{}`. The value itself is not converted or changed.

```lua
local health = 0

if health then
    lh.drawln("A health value exists.") -- This runs even when health is 0.
end

if health > 0 then
    lh.drawln("You are alive.") -- This does not run.
end
```

To check whether a value exists while allowing `false`, write `value ~= nil`.

## Combining conditions

Use `and`, `or`, and `not` to combine checks:

```lua
local fps = 45
local showWarnings = true

if showWarnings and fps < 60 then
    lh.drawln("Try lowering your graphics settings.")
end
```

Write ranges as `fps >= 60 and fps < 200`. Chaining comparisons as `60 <= fps < 200` does not work in Lua.

## Choosing a value

Lua does not have a ternary operator, but this pattern is common:

```lua
local fps = 120
local message = fps >= 60 and "Smooth!" or "Low FPS"
lh.drawln(message) -- Output: Smooth!
```

When the condition is true, `and` returns `"Smooth!"`. Since that is truthy, `or` keeps it. Otherwise, `or` returns `"Low FPS"`.

:::caution
This pattern fails if the value after `and` is `false` or `nil`, because `or` will choose the fallback. Use an ordinary `if` instead:

```lua
local hidden = true
local message

if hidden then
    message = nil
else
    message = "Visible"
end
```
:::
