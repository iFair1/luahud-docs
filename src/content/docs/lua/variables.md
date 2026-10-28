---
title: Variables
description: Learn Lua variables, value types, and local scope with LuaHUD examples. Store and update values, check types, and understand missing values with nil.
sidebar:
  order: 10
---

A variable gives a name to a value so you can use it later.

```lua
local name = "iFair"
lh.drawln(name) -- Output: iFair
lh.drawln("name") -- Output: name
```

Use quotes for text values, but not for variable names.

## Declaring and changing variables

Use `local` to create a variable. To change its value later, use `=` without another `local`:

```lua
local fps = 60
fps = 120
lh.drawln(fps) -- Output: 120

fps = fps + 10
lh.drawln(fps) -- Output: 130
```

The right side is calculated before the value is assigned. Lua does not have `+=` or `++`.

Names can contain letters, digits, and underscores, but cannot start with a digit or be a keyword such as `end`. Names like `playerName` or `player_name` are fine.

## Types

Values have types. Here are the six you will usually work with:

| Type | Meaning | Example |
| --- | --- | --- |
| `number` | A number, including decimals | `10`, `2.5` |
| `string` | Text inside single or double quotes | `"LuaHUD"`, `'Hello'` |
| `boolean` | True or false | `true`, `false` |
| `nil` | No value | `nil` |
| `function` | Code you can call | `lh.drawln` |
| `table` | A group of values | `{ "FPS", "Position" }` |

Lua also has `userdata` and `thread` types. You do not need them for these lessons.

Use `type(value)` to check a type:

```lua
local value = 10
lh.drawln(type(value)) -- Output: number

value = "Hello"
lh.drawln(type(value)) -- Output: string
```

A variable can hold values of different types, though keeping its purpose consistent makes code easier to read.

## Missing values

A local variable without a value starts as `nil`. Reading an undefined global also gives `nil`.

```lua
local name
lh.drawln(type(name)) -- Output: nil

name = "iFair"
name = nil -- Remove the value again.
```

`nil`, `0`, and the string `"nil"` are different values.

## Local and global variables

A local variable is available from its declaration to the end of its block. A block can be a function, loop, or `if` branch. At the top of a file, it lasts until the end of that file.

```lua
local name = "iFair"

if true then
    local message = "Hello, " .. name
    lh.drawln(message)
end

-- message is no longer available here.
```

Assigning to a name without `local` changes an existing variable if one is in scope. Otherwise, it creates or changes a global. Prefer `local` for your own variables to avoid accidentally sharing or overwriting names.
