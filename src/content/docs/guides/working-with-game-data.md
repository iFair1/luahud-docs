---
title: Working with Game Data
description: Read live Minecraft data in LuaHUD, including player health, biomes, and inventory. Work with optional values, models, lists, and status effect maps.
sidebar:
  order: 30
---

Most game information is readable under `lh`: `lh.perf.fps`, `lh.player.health`, `lh.pos.biome.name`, and so on. 


## Fields
These are the most common and simple ones. For example `lh.perf.fps`, `lh.session.multiplayer`, `lh.player.hunger.saturation` are fields. All fields are under [API Reference](/api).
```lua
lh.on("tick", function()
    lh.drawln("FPS: " .. lh.perf.fps)
    if lh.session.multiplayer then
        lh.drawln("Server Name: " .. lh.session.name)
    else
        lh.drawln("World Name: " .. lh.session.name)
    end
    lh.drawln("Biome: " .. lh.pos.biome.name)
end)
```

`lh.perf.` is the namespace and `fps` is a field. Getting information is as easy as reading it. But it's wrong to think that they cost nothing, because they are actually functions in the background. No fields are calculated unless you read them.

Use your editor's completion for the available fields, or see the [API Reference](/api) for the full list.

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
Most models expose fields through metatables. Treat them as API views: `pairs(model)` won't necessarily enumerate the fields you see in completion, and assigning to a field doesn't change the game. Copy specific values into an ordinary table if you need a snapshot.

When you read an `ItemStack` from the game, it's guaranteed to have a name; but it is not necessary to know the name if you want to draw it on the screen. Because of this, most models have an `Input` version of  them like `ItemStackInput`.

For the `ItemStackInput` example: `id` is required, `count` is optional, and `name` isn't even used.

:::caution
Models may be `nil`. For example if no  music is playing nearby, `lh.sound.record` will be nil and Lua will throw an error the second you try to index it like `record.remaining`. So you need to nil check.
```lua
local record = lh.sound.record
if record ~= nil then
    lh.drawln(record.name .. " - " .. record.remaining .. "s left")
end
```
:::

## Reading Client Settings
`lh.getOption(name)` reads the current Minecraft client settings. Use the setting's `options.txt` name. Your editor should provide name completion and the specific return type for each supported option.

```lua
lh.on("tick", function()
    local fov = lh.getOption("fov")
    local vsync = lh.getOption("enableVsync")
    lh.drawln("FOV: " .. fov)
    lh.drawln("Vsync: " .. tostring(vsync))
end)
```

A boolean, integer, number or string can be returned depending on the option. Enum values are snake_case strings such as `"first_person"` for `lh.getOption("perspective")`. Available names depend on the Minecraft version.
