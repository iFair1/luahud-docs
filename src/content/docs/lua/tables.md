---
title: Tables
description: Use lists, named fields, and nested data in Lua.
sidebar:
  order: 60
---

A table groups values together. Create one with `{}`.

## Lists

```lua
local labels = { "FPS", "Position", "Biome" }

lh.drawln(labels[1]) -- Output: FPS
lh.drawln(labels[3]) -- Output: Biome

labels[2] = "Coordinates"
```

List indices start at **1**, not 0. Reading a missing entry gives `nil`.

Use `ipairs()` to visit a list in order, as shown in [Loops](/lua/loops/#looping-through-tables).

## Named fields

Tables can also hold values under named keys:

```lua
local settings = {
    title = "My HUD",
    scale = 2,
    visible = true,
}

lh.drawln(settings.title) -- Output: My HUD
settings.scale = 3
```

`settings.title` is short for `settings["title"]`. Use brackets when the key is stored in a variable:

```lua
local settings = { title = "My HUD" }
local key = "title"
lh.drawln(settings[key]) -- Output: My HUD
```

`settings.key` would look for a field literally named `key` instead.

Set a field to `nil` to remove it. `false` keeps the field with a false value.

## List length and gaps

`#list` gives the length of a list with consecutive indices from `1`:

```lua
local labels = { "FPS", "Position" }
table.insert(labels, "Biome") -- Append an entry.
lh.drawln(#labels) -- Output: 3

table.remove(labels, 2) -- Remove Position and shift later entries down.
lh.drawln(labels[2]) -- Output: Biome
```

:::caution
Assigning `labels[2] = nil` does not shift later entries. If that leaves a gap, `#labels` is not a reliable entry count and `ipairs()` stops at the gap. Use `table.remove()` to remove an entry from a list.

`#` does not count named fields. Use `pairs()` if you need to visit those.
:::

## Nested tables

A table can contain other tables:

```lua
local hud = {
    position = { x = 10, y = 20 },
    labels = { "FPS", "Biome" },
}

lh.drawln(hud.position.x) -- Output: 10
lh.drawln(hud.labels[1]) -- Output: FPS
```

## Sharing a table

Assigning a table to another variable does not copy its contents. Both variables refer to the same table:

```lua
local settings = { scale = 1 }
local other = settings
other.scale = 2

lh.drawln(settings.scale) -- Output: 2
lh.drawln(settings == other) -- Output: true
lh.drawln(settings == { scale = 2 }) -- Output: false
```

Two separately created tables are different even when their contents match.
