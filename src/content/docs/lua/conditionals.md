---
title: Conditionals
description: What are conditionals and how do they work?
sidebar:
  order: 30
---

Conditionals are used to run code depending on some conditions.

You can use them like this:
```lua
if <condition> then
    doSomething()
end
```
Syntax is pretty easy and can be read like plain English.

The code block only runs if the `<condition>` is [truthy](#what-if-the-condition-is-not-a-boolean)
The code block ends with the `end` keyword. `end` is used for ending other code blocks too.

For example, you can do this:
```lua
-- Let's assume you have an fps variable
if fps >= 60 then
    lh.drawln("Your computer is very strong!")
end
```

You can optionally add an else part.
```lua
if fps >= 60 then
    lh.drawln("Your computer is very strong!")
else
    lh.drawln("How long do you bake your pc for?") -- this code never runs unless fps is less than 60.
end
```

```lua
if fps >= 60 then lh.drawln("Your computer is very strong!") end
```
This reduces readability little bit, but it saves you from writing 2 additional lines.

Also, you can use elseif to do chains like this
```lua
if fps < 60 then
    lh.drawln("How long do you bake your pc for?") -- ..60
elseif fps < 200 then
    lh.drawln("Your computer is very strong!") -- [60, 200)
else
    lh.drawln("Nasa wants your computer") -- 200..
end
```

## What if the condition is not a boolean?
Then it simply gets converted to a boolean.

An expression is either `truthy` or `falsy`. `truthy` acts as `true`, and `falsy` as `false`. I may call `falsy` values straight up `false` troughtout the documentation, it is not that important.

There are only 2 values that are considered `falsy` in Lua.
* `false`
* `nil`

Everything including empty string (`""`), empty table (`{}`), and `0` is `truthy`.

## Ternary If
This is a popular concept in other programming languages. But Lua doesn't have this.

The main concept is to return a value instead of running a code block depending on a condition.
Here are some examples from other programming languages:

**Python**
```python
result = "It is True!" if 10 > 5 else "It is false :("
```

**Java**
```java
String result = 10 > 5 ? "It is True!" : "It is false :("
```

Lua can do this too! But with a cool hack.

I previously mentioned that `and` and `or` operators return values instead of just `true` or `false`.

So we can use it just as a ternary if:
```lua
local result = 10 > 5 and "It is True!" or "It is false :("
```

1. `and` operator sees that `10 > 5` is True and returns the second value.
2. Then the code turns into this `"It is True" or "It is false :("`.
3. `or` operator returns the the first value if the first value is truthy. So we finally get `local result = "It is True!"` and that is what we want.

The opposite way goes like this:
```lua
local result = 3 < 1 and "It is True!" or "It is false :("
```

```lua
local result = 3 < 1 or "It is false :("
```

```lua
local result = "It is false :("
```

:::caution
While this method is cool, it is not perfect!
Let's say you want to return `nil` if the condition is `truthy`.

```lua
local result = 10 > 5 and nil or "I shouldn't be returned"
```

Here, `and` will return nil which is a **falsy** value.
```lua
local result = nil or "I shouldn't be returned" -- second value gets returned
```
We returned the second value which should have been returned if the condition were false. This is unwanted behavior.
:::
