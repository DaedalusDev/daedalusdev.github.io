---
lang: en
title: "SubRootine — a programming game with a pure, testable engine"
role: "Personal project · design and development"
period: "August 2026"
summary: "Reprogram robots in a post-AI world: the player writes a JavaScript script that drives a robot on a grid."
order: 2
stack: ["Vue 3", "Quasar", "TypeScript", "Pinia", "Vitest", "Playwright", "Three.js", "Web Audio"]
demo: "/subrootine/"
images:
  - src: "/assets/img/subrootine-mobile.webp"
    alt: "First level of SubRootine on a phone: the 3D farm at the top, and below a three-block “Move” program built with simple taps."
    width: 360
    height: 779
  - src: "/assets/img/subrootine.webp"
    alt: "First level of SubRootine on desktop: the block editor on the left, and on the right the 3D farm with the robot, crates, fences and a tractor."
    width: 960
    height: 600
---
The game is playable below, right in the browser, with no server. The source code is private; here is how it is built.

- **Layers that only depend downwards.** Vue UI → pure presentation helpers → engine. The engine never imports Vue: all game logic is testable without a browser.
- **A pure, deterministic engine.** World state is immutable at the API level: applying an action returns a new world. Same inputs, same results.
- **An interpreted player language.** A JavaScript subset, parsed with acorn and run by a custom interpreter that drives the robot through a dedicated interface.
- **Frame-by-frame replay.** Every robot action is recorded as a frame; the UI replays that trace, which keeps animations and debugging simple.
- **Verifiable levels.** Each level ships its reference solution and world variants to check scripts for robustness. Tests use Vitest (engine) and Playwright (full user flows).

**The artistic side**

- **3D sprites “baked” into images.** The robot, crops, fences, ground and props are modelled with Three.js (toon shading with a gradient ramp, rounded shapes, an orthographic 3/4 camera), then rendered offline in a headless Chromium and saved as images: one per direction and per animation. The game ships no 3D engine, it only loads those images. The robot comes in six rarity tiers, made by recolouring its armour.
- **One music per world, a single tune.** Eight instrument palettes (farm, mine, kitchen, guinguette…) play the same score: when the player changes place, the music moves from one palette to the other without breaking the phrase. Notes come from an instrument bank (the FluidR3_GM SoundFont) and are loaded on demand, palette by palette. A set of standalone HTML pages is used to compose and compare variants.
- **Sound effects described, not recorded.** Each effect is a declarative recipe stacking oscillators, filtered noise and plucked strings, interpreted by the Web Audio engine.
