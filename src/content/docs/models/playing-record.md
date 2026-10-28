---
title: PlayingRecord
description: The nearest tracked playing jukebox disc and its playback timing.
---

The nearest tracked jukebox disc playing within 64 blocks, exposed as `lh.sound.record`. The property is `nil` when no tracked disc is available.

## Fields

| Field | Type | Description |
| --- | --- | --- |
| `id` | `string` | Namespaced disc item ID, or the song ID when no matching item exists. |
| `name` | `string` | Localized song name. |
| `length` | `number` | Song length in seconds; may be fractional. |
| `elapsed` | `integer` | Elapsed playback time in whole seconds. |
| `remaining` | `integer` | Remaining playback time in seconds, rounded up for fractional song lengths. |

## Example

```lua
lh.on("tick", function()
    local record = lh.sound.record
    if record then
        lh.drawln(record.name .. " - " .. record.remaining .. "s left")
    end
end)
```
