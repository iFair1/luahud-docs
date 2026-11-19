---
title: Events and Timers
description: React to Minecraft events, read callback payloads, and update your LuaHUD on a tick or frame interval.
sidebar:
  order: 50
---

Code at the top level of a profile runs when the profile loads. Register a callback there to run code again when Minecraft or LuaHUD reports an event.

See [Events Reference](/api/events) for all events.

## Listen for an event

`lh.on(event, callback)` runs the callback each time the named event fires.

```lua
lh.on("tick", function()
    lh.drawln("Health: " .. lh.player.health)
end)
```
`"tick"` fires at the end of each client tick and works well for most of the things. 

:::caution
Register listeners once, at the top level of your profile. If you register a new event on every `"tick"` event, registrations will pile up.
:::

## Read the event payload

Some events pass a value as the first argument to the callback. For example, `"item-pickup"` passes an [ItemStack](/models/item-stack/) whose `count` is the number of items picked up.

```lua
lh.on("item-pickup", function(stack)
    lh.section({
        id = "pickup-notice",
        anchor = "topCenter",
        offsetY = 20,
        duration = 3,
    })
    lh.drawln("Picked up " .. stack.count .. " x " .. stack.name)
end)
```

This notice stays visible for three seconds, and another pickup replaces it. See [Drawing Lifetime](/guides/drawing-lifetime) for more.

## Run a callback at an interval
Use `lh.setInterval(count, event, callback)` to run a callback every `count` times of `event`. Each timer counts its selected event from registration, first runs on the requested occurrence, and then starts counting again.

```lua
lh.setInterval(20, "tick", function()
    lh.drawln("FPS: " .. lh.perf.fps)
end)
```

The first draw happens on the 20th client tick after registration. It refreshes every 20 ticks (1 second).

See [Drawing Lifetime](/guides/drawing-lifetime) to understand how to use these callbacks alongside each other.
