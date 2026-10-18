---
title: Introduction
description: Learn what LuaHUD can do and how Lua profiles turn Minecraft data into a custom HUD.
sidebar:
  order: 1
---

LuaHUD is a customizable Minecraft HUD mod for Fabric, powered by the [Lua programming language](https://www.lua.org/). It lets you choose which information appears on your screen, how it looks, and when it is shown.

You build your HUD using Lua scripts called **profiles**. A profile can be as simple as an FPS counter or combine several sections with player information, item icons, and conditional warnings.

## What can you do?

LuaHUD provides an API for reading Minecraft data and drawing it on your HUD. For example, you can:

- Draw text, items/blocks, item stacks, textures, and loaded entities.
- Show a temporary (or permanent) hud after a specific event
- Show performance, player, position, weather, time, and a lot more information.

and you can:

- Organize these huds with independent sections
- Choose different anchors, offsets, scales, colors, spacing, and way more for every section or element.
- Use multiple profiles at once

## Why Lua?

Using a programming language gives you control over both the content and the behavior of your HUD:

- **Variables and math** let you calculate values and format them for display.
- **Conditions** let you show information only when it matters, such as changing a counter's color when FPS drops.
- **Functions and loops** help you reuse logic and draw lists without repeating code.
- **Modules** let you share helper functions between profiles using `require()`.

LuaHUD also provides API definitions for code completion in editors that support the Lua language server. This helps you discover available properties and functions while writing a profile.

Also, these definitons are created each time you start the game, so it can recommend you IDs of items, blocks, entities **including modded ones**; extended api from addons, and warn you if something is wrong.

You don't need to know all of Lua to get started. Small script that reads values and draws text is enough for your first HUD.
