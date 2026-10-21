---
title: Operators
description: What are and how does operators work?
sidebar:
  order: 20
---

Operators are just cool looking [functions](functions). But since you don't know functions yet, we can say that they *do* things for you.

For example, let's take `+` operator, which adds 2 values.
```lua
local result = 2 + 2
lh.drawln(result) -- Output: 4
```

`local result = 2 + 2` became `local result = 4` just like `print(result)` became `print(4)`

## General

### Assignment Operator
This operator is used for assigning a value to a variable. For example:
```lua
local variable = 10
```

### Concatenation Operator
You use this when you want to **concatenate** text. For example:
```lua
-- Assuming I have fps variable
lh.drawln("FPS: " .. fps) -- Output: FPS: 120
```
It accepts only strings and numbers (casted to strings).
:::caution
Trying to concatenate types other than `string` and `number` (for example a `boolean`), Lua gives an error. You need to do `tostring(value)` first.
:::

### Length Operator
This is straightforward. It gives the length of a string (or tables that are indexed).
```lua
local name = "iFair"
lh.drawln(#name) -- Output: 5
```

## Arithmetic Operators
These are essentially math operations. These take and return `number` [type](../variables/#types)

| Operator | Description | Example expression | Result |
| --- | --- | --- | --- |
| `+` | Addition | `10 + 4` | `14` |
| `-` | Subtraction | `10 - 4` | `6` |
| `*` | Multiplication | `10 * 4` | `40` |
| `/` | Division | `10 / 4` | `2.5` |
| `%` | Modulo | `10 % 4` | `2` |
| `^` | Exponentiation | `10 ^ 4` | `10000.0` |
| `-` | Unary minus | `-(10)` | `-10` |

## Relational Operators
These are mostly used in [conditionals](../conditionals). They return `true` or `false`.

| Operator | Description | Example Expression | Result |
| --- | --- | --- | --- |
| `==` | Equality | `5 == 5` | `true` |
| `~=` | Inequality | `5 ~= 5` | `false` |
| `<` | Less than | `5 < 10` | `true` |
| `>` | Greater than | `5 > 10` | `false` |
| `<=` | Less than or equal | `5 <= 5` | `true` |
| `>=` | Greater than or equal | `5 >= 6` | `false` |

## Logical Operators
These are also mostly used with [conditionals](../conditionals). They are still used to manipulate `truthy` and `falsy` values. But they are slightly different than what are they in other programming languages.

I'll explain these in more detail later.

| Operator | Description | Example Expressions | Result |
| --- | --- | --- | --- |
| `and` | Logical AND | `first and second` | first if `first` is falsy else `second` |
| `or` | Logical OR | `first or second` | first if `first` is truthy else `second` |
| `not` | Logical NOT (unary) | `not value` | Reverted version of booleanized `value` |
