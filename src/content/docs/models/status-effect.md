---
title: StatusEffect
description: Status effect identity, level, duration, and particle visibility.
---

An active status effect, found in `lh.player.effects` or [Entity.effects](/models/entity/). The map key is the namespaced effect ID. Missing effects have no entry.

## Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | [StatusEffectId](/models/registry-ids/) | Namespaced status effect ID. |
| `name` | `string` | Localized effect name. |
| `level` | `integer` | Effect level, starting at `1` (not a zero-based amplifier). |
| `durationInSeconds` | `integer` | Remaining duration in whole seconds; `-1` for an infinite effect. |
| `durationInTicks` | `integer` | Remaining duration in ticks; `-1` for an infinite effect. |
| `showParticles` | `boolean` | Whether effect particles are shown. |

## Example

```lua
lh.on("tick", function()
    local effect = lh.player.effects["minecraft:speed"]
    if effect then
        local duration = effect.durationInSeconds
        lh.drawln(effect.name .. " " .. effect.level .. ": " ..
            (duration == -1 and "infinite" or duration .. "s"))
    end
end)
```

## StatusEffectInput

Where an API accepts `StatusEffectInput`, a plain table requires `id`. Optional input fields are `level` (default `1`, at least `1`), `durationInSeconds`, `durationInTicks`, and `showParticles` (default `true`). Duration defaults to `0`; it must be `-1` or non-negative. Explicit ticks take precedence over seconds; seconds are multiplied by 20. `name` is output-only. This input type does not itself apply effects to the player.
