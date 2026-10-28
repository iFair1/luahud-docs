---
title: Events and Timers
description: Update your LuaHUD with tick, render, and reload callbacks or timed intervals. Choose when code runs and keep local state between HUD updates.
sidebar:
  order: 50
---

A profile runs once when it loads. That first run is where you define helpers, create local state, and register callbacks. The callbacks do the ongoing work.

## Choose and update point
| Callback | When it runs | Good for |
|-|-|-|
| `lh.on("reload", callback)` | After active profiles have loaded, including first world entry | Initial output. Actually not needed because not using lh.on() does the same thing anyways. |
| `lh.on("tick", callback)` | At the end of every client tick | Counters, conditionals, most HUD text |
| `lh.on("render", callback)` | Immediately before each HUD frame is painted | Content that should update every frame |
| `lh.setInterval(n, event, callback)` | Repeatedly after `n` `event` event fired. | Less frequent refreshes |

A client normally ticks about 20 times per second, while the frame rate varies. `render` can run much more often, so keep its work small. Use `tick` as a starting point unless you need frame-by-frame updates or *smooth* animatons.

`reload` is the built-in event name for initialization after profiles load. You can do the same thing by not using `lh.on()` though.
```lua
lh.on("reload", function()
    lh.sendMessage("My HUD is ready.")
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
The callback closes over `ticks`, so it remembers the value between calls. Declare it inside the c allback and it would start over every time.

A reload resets this state, including when another profile is saved or enabled. Leaving the world also discard the runtime, entering a world loads profiles afresh.

## Register once
Put event and interval registration at the top level. Registering and interval inside `tick` creates another timer on every tick. Registering a listener inside `render` similarly keeps adding listeners.

Use callbacks to schedule work. A `while true` loop waiting for health to change blocks the game thread instead of waiting for the next tick. LuaHUD stops Lua executions that exceed the configured time budget. Keep each invocation short and let it return.
