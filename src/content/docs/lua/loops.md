---
title: Loops
description: What are loops and how do they work?
sidebar:
  order: 40
---

Loops are very useful things that saves you from code repetition, and allows you to do incredible logic.

Lua has 3 types of them. Most used one is `for`, but each one is just a little bit tweaked version of other, so you can probably use the one you like.

## While loop
Syntax is like this:
```lua
while <condition> do -- do is the 'then' of loops
    doSomething()
end
```
1. Check if condition is true. 
2. If true continue, else go to the end of the code block
3. Execute the code block
4. Go to Step 1
This is basically how it works.

This can easily turn into an *infinite loop* which freezes your program until you terminate it.

## repeat .. until loop
```lua
repeat
    doSomething()
until <condition>
```
How it works:
1. Execute the code from `repeat` to `until`
2. Check if condition is true.
3. If `false` go to step 1, else continue

## For loop
This is made for making common used loop tasks more convenient. In Lua, it has 2 different uses.

### numeric
```lua
for <variable> = <start>, <limit>, <step> do -- <step> is optional. It defaults to 1.
    doSomething()
end
```
1. Define variable `<variable>` as `<start>`
2. Check if `(step > 0 and variable > limit) or (step < 0 and variable < limit)`.
3. If true go to the end of the code block, else continue
4. Execute the code block
5. Increment `<variable>` by `<step>`.
6. Go to Step 2.

You can visualize it as a while loop.
```lua
local i = 1
while i <= 10 do
    lh.drawln(i)
    i = i + 1
end
```
```lua
for i = 1, 10 do
    lh.drawln(i)
end
```

These 2 code will do the same thing, outputting:
```plaintext
1
2
3
4
5
6
7
8
9
10
```
