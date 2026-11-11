---
title: Events and Timers
description: Update your LuaHUD with tick, render, and reload callbacks or timed intervals. Choose when code runs and keep local state between HUD updates.
sidebar:
  order: 50
---

A profile runs once when it loads. That first run is where you define helpers, create local state, and register callbacks. The callbacks do the ongoing work.

## Choose an update point
| Callback | When it runs | Good for |
|-|-|-|
| `lh.on("reload", callback)` | After profiles load, including first world entry; receives the loaded `Profile[]` | Initialization and reacting to profile reloads. |
| `lh.on("tick", callback)` | At the end of every client tick | Counters, conditionals, most HUD text |
| `lh.on("render", callback)` | Immediately before each HUD frame is painted | Content that should update every frame |
| `lh.setInterval(n, event, callback)` | After every `n` occurrences of the chosen event. | Less frequent refreshes |

A client normally ticks about 20 times per second, while the frame rate varies. `render` can run much more often, so keep its work small. Use `tick` as a starting point unless you need frame-by-frame updates or *smooth* animations.

Use top-level code to define helpers and register callbacks. `reload` runs after the profiles involved in a reload have loaded. On first world entry this includes all active profiles; an incremental reload reports only the profiles loaded by that reload. Existing listeners in other profiles also receive the event.
```lua
lh.on("reload", function(profiles)
    for _, profile in ipairs(profiles) do
        lh.sendMessage("Loaded profile: " .. profile.name)
    end
end)

lh.setInterval(20, "tick", function()
    lh.section({
        anchor = "topRight",
        offsetX = 4,
    })
    lh.drawln("FPS: " .. lh.perf.fps)
end)
```
The FPS text stays visible between interval calls. The interval's first call happens after the first 20 ticks, not immediately.

## Keep state in locals
```lua
local ticks = 0

lh.on("tick", function()
    ticks = ticks + 1
    lh.drawln("Client ticks since load: " .. ticks)
end)
```
The callback closes over `ticks`, so it remembers the value between calls. Declare it inside the callback and it would start over every time.

Saving or changing the active state of a profile reloads that profile independently. Its listeners, timers, and drawings are removed before it loads again. Other profiles keep their local state and registrations. A full runtime reload resets all profiles; leaving the world also discards the runtime. Entering a world loads active profiles afresh. See [Profile](/models/profile/) for the reload payload.

## Register once
Put event and interval registration at the top level. Registering an interval inside `tick` creates another timer on every tick. Registering a listener inside `render` similarly keeps adding listeners.

Use callbacks to schedule work. A `while true` loop waiting for health to change blocks the game thread instead of waiting for the next tick. LuaHUD stops Lua executions that exceed the configured time budget. Keep each invocation short and let it return.
