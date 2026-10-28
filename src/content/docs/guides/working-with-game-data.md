---
title: Working with Game Data
description: Read live Minecraft data in LuaHUD, including player health, biomes, and inventory. Work with optional values, models, lists, and status effect maps.
sidebar:
  order: 30
---

Most game information is exposed as fields under `lh`: `lh.perf.fps`, `lh.player.health`, `lh.pos.biome.name`, and so on. Read them with `.`. These are fields, not functions you call with parentheses. Reading them can still do work internally, so avoid unnecessary repeated reads.

```lua
lh.on("tick", function()
    lh.drawln(string.format("%s - %d / %d HP",
        lh.player.name, lh.player.health, lh.player.maxHealth))
    lh.drawln("Biome: " .. lh.pos.biome.name)
end)
```
Use your editor's completion for the available fields. You don't need to memorize the whole API.

## Read values when you need them
A number you store is a snapshot. It doesn't keep following the game after you read it:
```lua
local startingHealth = lh.player.health

lh.on("tick", function()
    local currentHealth = lh.player.health
    lh.drawln("On load: " .. startingHealth)
    lh.drawln("Now: " .. currentHealth)
end)
```
Keep changing reads inside the callback. If you need a previous value, store it deliberately outside the callback, as in the [damage notification example](#detecting-changes).

## Detecting changes

Keep the previous value outside the callback, then compare it with the current value. This example shows a temporary notification when health decreases:

```lua
local previousHealth = lh.player.health

lh.on("tick", function()
    local health = lh.player.health
    if health < previousHealth then
        lh.section({
            id = "health-loss",
            duration = 3,
            anchor = "topCenter",
            offsetY = 20,
        })
        lh.drawln("Lost " .. (previousHealth - health) .. " HP", {
            textColor = "#FF5555",
        })
    end
    previousHealth = health
end)
```
:::note
You mostly won't need to do that thanks to events, which can trigger on changes automatically. See [Events and Timers](/guides/events-and-timers/).
:::

The section ID replaces an earlier notification and restarts its lifetime when health drops again. See [Drawing Lifetime](/guides/drawing-lifetime/) for how temporary output works.

## Optional values
Some information only exists in certain situations. For example, `lh.sound.record` is `nil` when no tracked jukebox disc is playing nearby:
```lua
lh.on("tick", function()
    local record = lh.sound.record
    if not record then return end

    lh.drawln(string.format("%s - %ds left",
        record.name, math.ceil(record.remaining)))
end)
```
The same idea applies to a horse you aren't riding, a block that you are not looking at, or durability on an item that can't be damaged. Check optional values before indexing them or doing math with them. Other fields use fallback values instead: integrated-server TPS, for example, is `0` when there is no integrated server. The field's description tells you what to expect.

## Models
An item stack or block is represented by a table-like **model** with named fields. Read what you need:
```lua
lh.on("tick", function()
    local stack = lh.slots.mainHand
    if stack.count == 0 then return end

    lh.drawln(stack.name .. " x" .. stack.count)
    if stack.damageLeft ~= nil then
        lh.drawln("Durability: " .. stack.damageLeft .. " / " .. stack.maxDamage)
    end
end)
```
Models expose fields through metatables. Treat them as API views: `pairs(model)` won't necessarily enumerate the fields you see in completion, and assigning to a field doesn't change the game. Copy specific values into an ordinary table if you need a snapshot.

Some drawing functions also accept model input tables. For example, you can draw a made-up stack with `{ id = "minecraft:diamond", count = 16 }`. This describes what to render. It doesn't put diamonds in your inventory.

## Lists and maps
Lists such as `lh.slots.hotbar` use Lua indices. So the first slot is **1**, not 0. Use `ipairs()`:
```lua
lh.on("tick", function()
    for index, stack in ipairs(lh.slots.hotbar) do
        if stack.count > 0 then
            lh.drawln(index .. ": " .. stack.name)
        end
    end
end)
```
Maps use keys. Status effects, for example, are keyed by namespaced IDs:
```lua
lh.on("tick", function()
    local effects = lh.player.effects
    if effects["minecraft:fire_resistance"] then
        lh.drawln("Fire resistance is active.")
    end
end)
```
Use `pairs()` when you want all entries in a map, and sort its keys if display order matters. Lua doesn't promise a useful iteration order for maps.
