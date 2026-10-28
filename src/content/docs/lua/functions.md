---
title: Functions
description: Write reusable Lua functions for LuaHUD profiles. Work with parameters, return values, optional arguments, and callbacks that keep state between ticks.
sidebar:
  order: 50
---

A function is a block of code you can run by calling its name with parentheses. You have already used functions like `lh.drawln()` and `type()`.

## Writing a function

```lua
local function greet(name)
    lh.drawln("Hello, " .. name .. "!")
end

greet("iFair") -- Output: Hello, iFair!
greet("Player") -- Output: Hello, Player!
```

`name` is a **parameter**: a local variable that receives a value when the function is called. `"iFair"` is an **argument**: the value passed to it.

Defining a function does not run its body. `greet("iFair")` runs it. A function can have multiple parameters, separated by commas, or none at all.

## Returning values

`return` sends a result back to the caller and stops the function:

```lua
local function double(number)
    return number * 2
end

local result = double(10)
lh.drawln(result) -- Output: 20
```

A function that reaches its end without `return` produces no results. Assigning that to a variable gives `nil`.

You can return more than one value:

```lua
local function getSize()
    return 100, 20
end

local width, height = getSize()
lh.drawln(width .. " x " .. height) -- Output: 100 x 20
```

## Optional arguments

Missing arguments become `nil`. Check for `nil` to provide a default:

```lua
local function greet(name)
    if name == nil then
        name = "Player"
    end
    lh.drawln("Hello, " .. name .. "!")
end

greet() -- Output: Hello, Player!
```

You may also see `name = name or "Player"`. Remember that it replaces `false` as well as `nil`.

## Callbacks

Functions are values, so you can store them in variables or pass them to other functions. A **callback** is a function another piece of code calls later.

For example, LuaHUD can call your function on each game tick:

```lua
local function drawStatus()
    lh.drawln("My HUD is running!")
end

lh.on("tick", drawStatus)
```

Pass `drawStatus`, without `()`. Writing `drawStatus()` would run it immediately and pass its result instead of the function.

You can also write an unnamed function directly where it is needed:

```lua
lh.on("tick", function()
    lh.drawln("My HUD is running!")
end)
```

A function can use local variables declared before it in an enclosing block. This lets a callback keep a value between calls:

```lua
local ticks = 0

lh.on("tick", function()
    ticks = ticks + 1
    lh.drawln("Ticks: " .. ticks)
end)
```

Here, `ticks` is created outside the callback. Putting `local ticks = 0` inside it would reset the counter on every call.
