---
title: Introduction
description: Discover how LuaHUD uses Lua profiles to customize your Minecraft HUD with live game data, item icons, flexible layouts, and conditional displays.
sidebar:
  order: 1
---

LuaHUD is an extremely customizable Minecraft HUD mod for Fabric, powered by the [Lua programming language](https://www.lua.org). It lets you choose when, how, and which information appears on your screen.

You build HUDs using Lua scripts called **profiles**. They are basically independent scripts that can run independently.

## What can you do?

LuaHUD provides a rich API for reading Minecraft data, drawing things on your HUD and doing some actions (not the main purpose). For example you can:

- Draw ready elements like text, items, blocks, entities, textures with an advanced layout engine or draw freely with canvases
- Show temporary or persistent HUD elements in response to in-game events.
- Show performance, player, position, weather, time, and a lot more information.
- Give every element (or section/canvas) its own offset, background, scale, color, opacity and more. 

## Why Lua?

Using a programming language gives you way more control over your configurations:

- **Variables and math** let you calculate values and format them for display.
- **Conditions** let you show information only when it matters, such as changing a counter's color when FPS drops.
- **Functions and loops** help you reuse logic and draw lists without repeating code.
- **Modules** let you share helper functions between profiles using `require()`.

LuaHUD also generates API definitions for code completin in editors that support the Lua language server. This helps you discover available properties and functions while writing a profile.

These definitions are generated when the game starts. Your editor can suggest item, block, entity (and more) IDs **including modded ones**, discover APIs provided by addons, and warn you about your mistakes.

Continue to [Installation](/getting-started/installation/) for installation details.
