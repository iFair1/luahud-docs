---
title: About Lua
description: Learn Lua for LuaHUD with beginner lessons and Minecraft HUD examples. Start with variables, then explore functions, tables, modules, and common errors.
sidebar:
  order: 1
---

:::tip
Already know Lua? Skip to [Your First HUD](/guides/your-first-hud/).
:::

[Lua](https://www.lua.org/) is a small programming language that applications can embed. LuaHUD uses it to let you write your own HUD.

This guide starts from zero. Read the pages in order:

1. [Variables](/lua/variables/):  store and name values.
2. [Operators](/lua/operators/):  calculate and compare values.
3. [Conditionals](/lua/conditionals/):  choose which code runs.
4. [Loops](/lua/loops/):  repeat code.
5. [Functions](/lua/functions/):  reuse code and pass callbacks.
6. [Tables](/lua/tables/):  group values together.
7. [Strings and Math](/lua/strings-and-math/):  format text and numbers.
8. [Modules](/lua/modules/):  share code between files.
9. [Common Errors](/lua/common-errors/):  find and fix mistakes.

## Trying the examples

Put the examples in a `.lua` profile in your [profile directory](/getting-started/accessing-files/). `lh` is the global LuaHUD API. We use `lh.drawln(value)` to draw a value and start a new line.

Examples often use made-up values, such as `local fps = 120`, so you can try them without looking up the game API first. These values do not update themselves from Minecraft.

Text after `--` is a comment. Lua ignores it:

```lua
-- This is a comment.
lh.drawln("Hello, World!") -- This is also a comment.
```

Lua is case-sensitive: `name` and `Name` are different variables. You do not need semicolons at the end of lines.

These lessons use Lua 5.2 syntax. For advanced topics, such as metatables and coroutines, see the official [Lua 5.2 manual](https://www.lua.org/manual/5.2/).
