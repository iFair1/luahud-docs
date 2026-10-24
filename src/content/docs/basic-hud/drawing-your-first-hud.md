---
title: Drawing Your First HUD
description: Drawing your first HUD.
sidebar:
  order: 4
---

Before starting, if you don't know [Lua](https://www.lua.org/), take a look at [Lua Basics](/lua/about-lua/). It starts from zero, so you do not need any programming experience. After this, I'll assume that you are familiar with Lua.

`lh` is the global api for **L**ua**H**UD.

The most fundamental function is `lh.draw(text, options?)`. This function draws a text to the HUD. It also takes [TextOptions](todo) but it's optional and we don't need it for now.

Create a profile and write this in it:
```lua
lh.draw("Hello, World!")
```
This code should output this:
![A basic HUD that says "Hello, World!"](/src/assets/hello-world.png)
