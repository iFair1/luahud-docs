---
title: Operators
description: Calculate, compare, and combine values in Lua.
sidebar:
  order: 20
---

Operators work on values. For example, `+` adds two numbers:

```lua
local result = 2 + 2
lh.drawln(result) -- Output: 4
```

## Assignment

`=` assigns a value. `==` compares two values:

```lua
local fps = 120
lh.drawln(fps == 120) -- Output: true
```

## Concatenation

`..` joins text. Numbers can also be joined to strings:

```lua
local fps = 120
lh.drawln("FPS: " .. fps) -- Output: FPS: 120
```

For other types, use `tostring(value)` first:

```lua
local enabled = true
lh.drawln("Enabled: " .. tostring(enabled)) -- Output: Enabled: true
```

## Length

`#` gives a string's length in bytes, or the length of a list without gaps:

```lua
lh.drawln(#"iFair") -- Output: 5
lh.drawln(#{ "FPS", "Position" }) -- Output: 2
```

Some characters use multiple bytes, so string length is not always the number of visible characters. For tables, `#` does not count named keys. See [Tables](/lua/tables/#list-length-and-gaps).

## Arithmetic operators

| Operator | Description | Example | Result |
| --- | --- | --- | --- |
| `+` | Addition | `10 + 4` | `14` |
| `-` | Subtraction | `10 - 4` | `6` |
| `*` | Multiplication | `10 * 4` | `40` |
| `/` | Division | `10 / 4` | `2.5` |
| `%` | Modulo (remainder here) | `10 % 4` | `2` |
| `^` | Exponentiation | `10 ^ 4` | `10000` |
| `-` | Negation | `-10` | `-10` |

Use parentheses when the order matters:

```lua
lh.drawln(2 + 3 * 4) -- Output: 14
lh.drawln((2 + 3) * 4) -- Output: 20
```

## Comparison operators

These return `true` or `false` and are useful in [conditionals](/lua/conditionals/).

| Operator | Description | Example | Result |
| --- | --- | --- | --- |
| `==` | Equal | `5 == 5` | `true` |
| `~=` | Not equal | `5 ~= 5` | `false` |
| `<` | Less than | `5 < 10` | `true` |
| `>` | Greater than | `5 > 10` | `false` |
| `<=` | Less than or equal | `5 <= 5` | `true` |
| `>=` | Greater than or equal | `5 >= 6` | `false` |

`5 == "5"` is `false`: a number and a string are different types. Convert numeric text with `tonumber()` before comparing it to a number.

## Logical operators

Only `false` and `nil` are falsy. Everything else is truthy, including `0` and `""`.

| Expression | Result |
| --- | --- |
| `first and second` | `first` if it is falsy; otherwise `second` |
| `first or second` | `first` if it is truthy; otherwise `second` |
| `not value` | `true` if `value` is falsy; otherwise `false` |

`and` and `or` return one of their values, which is not necessarily a boolean. They only evaluate the second expression when needed. This is called **short-circuiting**.

```lua
local nickname = nil
local name = nickname or "Player"
lh.drawln(name) -- Output: Player

local fps = 120
lh.drawln(fps >= 60 and fps < 200) -- Output: true
```

`or` also replaces `false`, so use an explicit `nil` check if `false` is a value you want to keep. When combining logical operators, `not` runs before `and`, and `and` before `or`. Parentheses can make your intent clearer.
