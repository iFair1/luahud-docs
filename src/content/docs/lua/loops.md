---
title: Loops
description: Use Lua for, while, and repeat loops in LuaHUD profiles. Iterate through lists and tables with ipairs and pairs, stop with break, and avoid endless loops.
sidebar:
  order: 40
---

Loops repeat a block of code so you do not have to write it several times.

## Numeric for loop

Use a numeric `for` loop when you know the range:

```lua
for i = 1, 3 do
    lh.drawln(i)
end
```

This draws `1`, `2`, and `3` on separate lines. The limit is included if the counter reaches it.

The optional third number is the step. It defaults to `1`. A negative step counts down:

```lua
for i = 5, 1, -2 do
    lh.drawln(i) -- Output: 5, then 3, then 1
end
```

Use a nonzero step. The start, limit, and step are evaluated once before the loop begins. The counter is local to the loop; do not change it inside the body.

## while loop

`while` checks its condition before each repetition. It may never run:

```lua
local i = 1

while i <= 3 do
    lh.drawln(i)
    i = i + 1
end
```

This produces the same output as the first `for` example.

## repeat .. until loop

`repeat` checks its condition after running the body. It always runs at least once, and stops when the condition becomes truthy:

```lua
local i = 1

repeat
    lh.drawln(i)
    i = i + 1
until i > 3
```

There is no `end` after `until`.

:::caution
Make sure your loop can finish. Forgetting `i = i + 1` in the `while` example would make it repeat forever. Do not use a loop to wait for the next game tick; use a [callback](/lua/functions/#callbacks) instead.
:::

## Looping through tables

A [table](/lua/tables/) can hold a list or named values. Generic `for` loops let you visit its entries.

Use `ipairs()` for a list, starting at index `1`:

```lua
local labels = { "FPS", "Position", "Biome" }

for index, label in ipairs(labels) do
    lh.drawln(index .. ": " .. label)
end
```

This draws `1: FPS`, `2: Position`, and `3: Biome` in order. `ipairs()` stops at the first missing (`nil`) entry.

Use `pairs()` for all keys and values, including named keys:

```lua
local settings = { scale = 2, visible = true }

for key, value in pairs(settings) do
    lh.drawln(key .. ": " .. tostring(value))
end
```

`pairs()` does not guarantee an order. Use a list and `ipairs()` when display order matters.

## Stopping early

`break` exits the innermost loop:

```lua
for i = 1, 10 do
    if i > 3 then
        break
    end
    lh.drawln(i) -- Only draws 1, 2, and 3.
end
```

Lua 5.2 has no `continue` keyword. Put the code you want to run inside an `if` instead:

```lua
for i = 1, 4 do
    if i ~= 2 then
        lh.drawln(i) -- Skips 2.
    end
end
```
