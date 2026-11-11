---
title: Reading Client Settings
description: Read Minecraft options with lh.getOption and use HUD visibility, GUI scale, and frame rate limits.
sidebar:
  order: 35
---

`lh.getOption(name)` reads the current Minecraft client setting without changing it. Use the setting's `options.txt` name. Your editor provides name completion and a specific return type for each supported option.

```lua
lh.on("tick", function()
    local fov = lh.getOption("fov")
    local vsync = lh.getOption("enableVsync")
    lh.drawln("FOV: " .. fov)
    lh.drawln("VSync: " .. tostring(vsync))
end)
```

Values are booleans, integers, numbers, or strings. Numbers use Minecraft's stored units; for example, mouse sensitivity uses `0` to `1`. Enum values are lowercase names with underscores, such as `"first_person"` for `perspective`. Compound settings such as resource-pack lists are outside this API. Unknown names raise an error, and available names depend on the Minecraft version.

:::caution
`lh.getOption("guiScale")` brings the configured option, where automatic scaling can be represented by `0`, or higher than what you actually see.

Use `lh.display.scale` for pixel calculations.
:::
