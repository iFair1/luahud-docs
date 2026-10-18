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
print(result) -- Output: 4
```

`local result = 2 + 2` became `local result = 4` just like `print(result)` became `print(4)`

## Types
There are 3 types of operators

### 1. Arithmetic Operators
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

### 2. Relational Operators
These are mostly used in [conditionals](../conditionals). They take `number` and return `true` or `false`.

| Operator | Description | Example Expression | Result |
| --- | --- | --- | --- |
| `==` | Equality | `5 == 5` | `true` |
| `~=` | Inequality | `5 ~= 5` | `false` |
| `<` | Less than | `5 < 10` | `true` |
| `>` | Greater than | `5 > 10` | `false` |
| `<=` | Less than or equal | `5 <= 5` | `true` |
| `>=` | Greater than or equal | `5 >= 6` | `false` |

### 3. Logical Operators
These are also mostly used with [conditionals](../conditionals). They take `boolean` (`true` or `false`). But they are slightly different than what are they in other programming languages.

I'll explain these in more detail later.

| Operator | Description | Example Expressions | Result |
| --- | --- | --- | --- |
| `and` | Logical AND | `first and second` | first if `first` is falsy else `second` |
| `or` | Logical OR | `first or second` | first if `first` is truthy else `second` |
| `not` | Logical NOT (unary) | `not value` | Reverted version of booleanized `value` |
