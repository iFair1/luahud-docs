---
title: Drawing Lifetime
description: Control how long LuaHUD drawings stay visible. Learn callback output replacement, temporary section durations, and named IDs for updating notifications.
sidebar:
  order: 60
---

Drawing calls build output that LuaHUD keeps and paints on the HUD. How long that output stays depends on the callback that created it and the section options.

## Ordinary output belongs to its callback
Without `duration`, a section lasts until **the same callback runs again**. Before that call stars, LuaHUD removes that callback's previous ordinary output.
```lua
lh.on("tick", function()
    if lh.player.sprinting then
        lh.drawln("Sprinting")
    end
end)
```

When you stop sprinting, the next call removes the old line even though it draws nothing. This is why conditional HUD elements don't need a separate erase function.

Each registered callback has its own output. A tick callback doesn't clear a differenct callback's section, even if both are in the same profile. Each also starts from the default layout, so assing positions if they might overlap.

Top-level drawins follow the same idea, but that code only runs on load. Their values won't refresh just because the game does. Drawing made in `reload` also remain until a runtime reload clears them.

## Temporary output uses duration
Pass a positive duration in **seconds** to keep a section until lifetime expires:
```lua
lh.on("reload", function()
    lh.section({
        anchor = "topCenter",
        offsetY = 20,
        duration = 5,
    })
    lh.drawln("Welcome back, " .. lh.player.name .. "!")
end)
```
A temporary section survives later calls to the callback that created. That is what makes event-driven notifications work, but it also means drawing an anonymous temporary section on every tick creates many overlapping sections. Create it only when something happens, or give it an ID.

The default duration clock is real time. The `sectionDurationClock` setting in `config/luahud.json` can use `"gameTime` instead of `"realTme`. Game time advances by client ticks while the game isn't paused.

## IDs replace sections
`id` gives a section a shared name. Starting a section with that ID removes the previous section with the same ID, including one created by another callback or profile.
```lua
local function notify(message)
    lh.section({
        id = "reload-notice",
        duration = 3,
        anchor = "topCenter",
        offsetY = 20,
    })
    lh.drawln(message)
end
```

```lua
lh.on("reload", function()
    notify("HUD loaded")
end)
```

Call `notify()` again and it replaces the text and restarts the three-second lifetime. An ID doesn't create a position or prevent overlap with sections that have other IDs.

All output is cleared on runtime reload when leaving the world. A `duration` section doesn't survive those transitions.
