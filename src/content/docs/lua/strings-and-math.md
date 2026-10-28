---
title: Strings and Math
description: Format LuaHUD text and numbers with Lua string and math functions. Convert values, set decimal precision, search text, round numbers, and clamp ranges.
sidebar:
  order: 70
---

Lua has built-in functions for working with text and numbers. Here are the ones you are likely to need for a HUD.

## Converting values

`tostring()` turns a value into text. `tonumber()` tries to turn numeric text into a number:

```lua
lh.drawln("Visible: " .. tostring(true)) -- Output: Visible: true

local amount = tonumber("12.5")
lh.drawln(amount + 1) -- Output: 13.5
```

If conversion fails, `tonumber()` returns `nil`. Check before using the result:

```lua
local amount = tonumber("not a number")

if amount ~= nil then
    lh.drawln(amount * 2)
else
    lh.drawln("Please enter a number.")
end
```

## Formatting text

`string.format()` fills placeholders in a string:

```lua
local fps = 120
local x = 12.345

lh.drawln(string.format("FPS: %d | X: %.1f", fps, x))
-- Output: FPS: 120 | X: 12.3
```

| Placeholder | Meaning |
| --- | --- |
| `%s` | Text |
| `%d` | Integer |
| `%.1f` | Number with one decimal place |
| `%.2f` | Number with two decimal places |
| `%%` | A literal percent sign |

Pass an integer to `%d`. Use a decimal format like `%.1f` for fractional values. Formatting changes the displayed text, not the original number.

## Useful string functions

```lua
local text = "Hello, LuaHUD!"

lh.drawln(string.upper(text)) -- Output: HELLO, LUAHUD!
lh.drawln(string.lower(text)) -- Output: hello, luahud!
lh.drawln(string.sub(text, 1, 5)) -- Output: Hello
local start = string.find(text, "LuaHUD", 1, true)
lh.drawln(start) -- Output: 8
```

`string.sub()` includes both endpoints. `string.find()` returns the start and end positions, or `nil` if the text is missing. Assigning it to one variable keeps only the first result. Its fourth argument, `true`, makes it search for literal text instead of a Lua pattern.

These positions count bytes, so avoid cutting through characters that use multiple bytes.

## Useful math functions

| Expression | Result | Meaning |
| --- | --- | --- |
| `math.floor(12.8)` | `12` | Round down |
| `math.ceil(12.2)` | `13` | Round up |
| `math.abs(-5)` | `5` | Absolute value |
| `math.min(10, 20)` | `10` | Smaller value |
| `math.max(10, 20)` | `20` | Larger value |

Rounding down goes toward negative infinity: `math.floor(-1.2)` is `-2`.

To keep a number inside a range, combine `min` and `max`:

```lua
local percentage = 125
percentage = math.max(0, math.min(100, percentage))
lh.drawln(percentage) -- Output: 100
```
