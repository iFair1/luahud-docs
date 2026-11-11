---
title: Colors and Scale
description: Style your LuaHUD with text colors, transparent backgrounds, shadows, and scaling. Learn hex and ARGB formats, section defaults, and element overrides.
sidebar:
  order: 20
---

Section options give all its elements a common style. An element's own options can override the parts it needs.
```lua
lh.on("tick", function()
    lh.section({
        anchor = "topLeft",
        offsetX = 4,
        offsetY = 4,
        textColor = "#FFFFFF",
        backgroundColor = "#80000000",
        shadow = true,
        scale = 2,
        inlineSpacing = 3,
    })

    lh.drawln("Player: " .. lh.player.name)
    lh.draw("Health: ")
    lh.drawln(lh.player.health, {
        textColor = lh.player.health <= 6 and "#FF5555" or "#55FF55",
    })
end)
```
The health value has its own text color. The next element still uses the section's default. An override doesn't change the options for later draw calls.

## Colors
You can use a hex string, an ARGB integer, a [Color](/models/color/) value, or a [ColorInput](/models/color-input/) table. Strings are convenient for fixed colors; mutable colors let you adjust individual channels.

| Value | Meaning |
|-|-|
|`"#55FF55"`| Opaque green, in `RRGGBB` format |
|`"#80000000"`| Partly transparent black, in `AARRGGBB` format |
|`"#00000000"` or `0`| Fully transparent |
|`0xFFFFFFFF`| Opaque white as an ARGB integer |

With eight digits, **alpha comes first**: `00` is transparent and `FF` is opaque. Six-digit strings automatically get full opacity. Numeric values are ARGB integers, so use `0xFF55FF55` if you want opaque green as a number.

:::caution
You won't see anything if you use `0x55FF55`. Because `0x55FF55` is equal to `0x0055FF55`, which is fully transparent.
:::

You can also use `backgroundColor = 0`, because it is the same thing as `0x00000000` anyways.

## Mutable colors

Create a color once and change its channels before drawing:

```lua
local accent = lh.color.rgb(85, 255, 85)

lh.on("tick", function()
    accent.r = lh.player.health <= 6 and 255 or 85
    accent.g = lh.player.health <= 6 and 85 or 255
    lh.drawln("Health: " .. lh.player.health, { textColor = accent })
end)
```

Channels are integers from `0` to `255`; alpha defaults to `255`. Use `lh.color.from("#8055FF55")` for a hex color or `lh.color.fromRgb(0x55FF55)` for an opaque RGB integer. `color.asInt` and `color.asString` reflect the current channels. See [Color](/models/color/) for conversions and snapshot behavior.

## Opacity

`opacity` is a finite number from `0` (invisible) to `1` (fully opaque), defaulting to `1`. Set it on a section, canvas, or individual draw call. Element opacity multiplies with its containing section or canvas opacity and the color's alpha.

```lua
lh.on("tick", function()
    lh.section({ opacity = 0.5 })
    lh.drawln("Half opacity")
    lh.drawln("Quarter opacity", { opacity = 0.5 })
end)
```

Opacity affects the rendered element, including icons, entities, textures, and backgrounds. It does not remove an element from the layout. Use `visible` on a section or standalone canvas to hide its output.

## Scale
The section's `scale` scales the entire section, including text and its layout. `iconScale` sets the default relative scale for its items, item stacks, textures, and entities.
```lua
lh.section({
    scale = 1.5,
    iconScale = 2
})

lh.drawItem("minecraft:diamond_block")
lh.drawItem("minecraft:emerald_block", { scale = 1 })
lh.drawln("Different icon sizes.")
```
Here the diamond block uses the section's `iconScale` of 2. The emerald's own `scale = 1` overrides that default. Both are still affected by the section scale of 1.5.

Per-call text `scale` requires a [canvas](/canvas/getting-started/). In ordinary sections, set text scale on the section.

## Local offsets
`offsetX` and `offsetY` on an individual draw call shift that element within the layout. They are useful for small visual adjustments. Section offsets position the whole block relative to its anchor. Use those when moving your HUD around.
