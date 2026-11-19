---
title: Your First HUD
description: Create your first Minecraft HUD with LuaHUD. Draw text, display live FPS and coordinates, and add a low-health warning using Lua callbacks.
sidebar:
  order: 1
---

`lh` is the global API for **L**ua**H**UD.

## Create a profile
Create a new profile and open the `minecraft/config/luahud` directory in your code editor. After this, profiles should reload after you edit them.

Let's draw the classic, `"Hello, World!"`:
```lua
lh.draw("Hello, World")
```
![Result in Minecraft](../../../assets/hello-world.png)

## Rows
Let's add another row:
```lua
lh.drawln("Hello, World!") -- Use lh.drawln instead of lh.draw to add a new line
lh.draw("Hello, " .. lh.player.name)
```


Or you can do
```lua
lh.draw("Hello, World!")
lh.newline() -- Manual line break. Pass a count for multiple line breaks.
lh.draw("Hello, " .. lh.player.name)
```


## Make it update
Code at the top, runs **once when the profile loads**. This is good for static huds, but if you need updates, values will stay at their initial value.

Replace the file with:
```lua
lh.on("tick", function()
    lh.drawln("Hello, World")
    lh.drawln("FPS: " .. lh.perf.fps)
    lh.drawln(string.format("XYZ: %.1f / %.1f / %.1f",
        lh.player.x, lh.player.y, lh.player.z))
end)
```

`"tick"` is an [Event](/guides/events) that is fired at each client tick. `lh.on()` registers a callback that runs every single time the selected event is fired. Now the script reads and draws values every tick.

The drawing from this callback is replaced each time it runs. You don't have to erase the previous text yourself, and the rows won't keep piling up. See more at [Sections and Layout](/guides/sections)

## Show something only when it matters
Here's a basic health warning:
```lua
lh.on("tick", function() -- Run the callback every tick
    local health = lh.player.health -- get health (health points, not hearts)

    if health <= 6 then
        lh.drawln("Health is getting low: " .. health, {
            textColor = "#FF5555",
        })
    end
end)
```
When health rises above 6, the callback runs without drawing anything. Its previous output is still cleared, so warning disappears.

Two separate callbacks both start at default topLeft position, so their output can overlap. Continue to [Sections and Layout](/guides/sections) to give everything a place.
