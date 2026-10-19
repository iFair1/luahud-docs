---
title: Variables
description: Explains what are variables in lua
sidebar:
  order: 10
---

A variable holds a value.

It's useful if you want to name a value, or store it for future operations.

### Types
Every variable has a data type.

In Lua 5.2 *(the one LuaHUD uses)* has 6 main types. (There are 2 additional types, but they're not important for now.)

| Name | Description | Example |
| --- | --- | --- |
| `number` | Any numeric value | `10` |
| `string` | Text value | `"LuaHUD"` |
| `boolean` | Whether something is true or not, binary | `true` or `false` |
| `nil` | Something being non-existent | only `nil` |
| `function` | A block of code that can be called with arguments. Returns something | `lh.drawln` |
| `table` | Any kind of grouped data. Can be a list, key-value pair, or both. | `lh` |

`number`, `string`, and `boolean` are the most simple ones. You'll use them 80% of the time.

`type(value)` function is used to get the type of a value/variable.

## How to use one?
You *declare* a variable like this:
```lua
local anyNameYouWant = 10
```
after this, when you write `anyNameYouWant` somewhere in your code, it'll act as you wrote `10` there.

### Strings
When writing strings as values, you must write them inside quotes (`""` or `''`). 

This is for them not being confused with any other keyword, variable, function etc.
###

Let's use a variable.
```lua
local name = "iFair"
lh.drawln(name)
```
This code will make the same thing as
```lua
lh.drawln("iFair")
```
because it replaced `lh.drawln(name)` with `lh.drawln("iFair")`

:::caution
You declare name variable inside quotes but you mustn't use it inside quotes.
```lua
local name = "iFair"
lh.drawln(name) -- Output iFair
lh.drawln("name") -- Output: name
```
:::
