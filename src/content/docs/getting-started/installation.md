---
title: Installation
description: Installation details for LuaHUD
sidebar:
  order: 2
---

## Fabric
LuaHUD is a [Fabric](https://fabricmc.net) mod. This means you need to launch Minecraft with Fabric Loader to use it.

## Locating the game directory
The location may change depending on your operating system and how you downloaded Minecraft.
Most common ones:

**Windows**
```text
%appdata%\.minecraft\
```

**Windows (Prism Launcher)**
```text
%appdata%\PrismLauncher\instances\<your instance name>\minecraft\
```

**Linux**
```text
~/.minecraft/
```

**Linux (Prism Launcher)**
```text
~/.local/share/PrismLauncher/instances/<your instance name>/minecraft/
```

**Linux (Prism Launcher with Flatpak)**
```text
~/.var/app/org.prismlauncher.PrismLauncher/data/PrismLauncher/instances/<your instance name>/minecraft/
```

**MacOS:**
honestly, i have no idea how that operating system works. I don't even test the mod there

:::tip
In Prism Launcher, you can also find the game directory by right-clicking the instance and selecting **Folder**. 
:::

## Required mods
You need to download these mods to `<minecraft directory>/mods/` in order to run the game.

* [Fabric API](https://modrinth.com/mod/fabric-api)

* [LuaHUD](https://modrinth.com/mod/luahud) (the mod itself)

* And I recommend you to use [Mod Menu](https://modrinth.com/mod/modmenu) since it makes it easier to configure fabric mods.
![A Screenshot of mods that is required to use LuaHUD: fabric-api, luahud, modmenu](/src/assets/mods.png)
