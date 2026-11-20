---
title: Hide Vanilla HUD Elements
description: Hide individual parts of Minecraft’s HUD while a LuaHUD profile is active.
sidebar:
  order: 70
---

Call `lh.display.setHidden(element, true)` to hide a vanilla HUD element. Put the call at the top of a profile to hide the element for as long as that profile is active. For example, this profile hides the scoreboard and both experience indicators.

```lua
lh.display.setHidden("scoreboard", true)
lh.display.setHidden("experience_bar", true)
lh.display.setHidden("experience_level", true)
```

Call `lh.display.setHidden(element, false)` to release your profile’s request. An element stays hidden while any active profile requests it. Disabling a profile releases its requests. Vanilla HUD spacing is preserved, so the remaining elements keep their usual positions.

## Element IDs

| ID | Minecraft HUD element |
| --- | --- |
| `hotbar` | Hotbar |
| `status_effects` | Status effect icons |
| `health_bar` | Health hearts |
| `food_bar` | Hunger bar |
| `armor_bar` | Armor bar |
| `air_bar` | Air bubbles |
| `mount_health` | Mount health |
| `experience_bar` | Experience bar |
| `experience_level` | Experience level number |
| `scoreboard` | Scoreboard sidebar |
| `crosshair` | Crosshair |
