---
title: "Building OpenTape, a screen recorder for macOS"
slug: "building-opentape"
date: "2026-11-23"
description: "How I designed, built and shipped a native macOS screen recorder on my own, from the first commit to six releases in nine days."
draft: true
---

[OpenTape](https://opentape.app) is a free, open-source screen recorder for macOS. It records the short clips developers put in demos, READMEs, pull requests and social posts, and you edit and export them without leaving the app.

I built it alone and handled the product, design, engineering and release work. I started on October 16, 2026, made version 0.1.0 public on October 31, and shipped six releases in the nine days after that. The code is MIT licensed and [on GitHub](https://github.com/aidankmcalister/OpenTape).

## The problem

A clip for a README or a pull request has to be short and small. A few seconds of 1080p GIF can come out at 19 MB, which is over the 15 MB upload limit on X. Recording a demo also means recording your keyboard, and a keystroke overlay can show whatever you type, passwords included.

I wanted GIFs small enough to post, MP4s that stay sharp at a fraction of the size, and keystroke badges that are safe to leave on.

## How I built it

OpenTape is a Tauri 2 app. Rust handles capture and encoding, and the editor is React 19 with TypeScript. Capture goes through ScreenCaptureKit, and the video work goes through AVFoundation, Core Image and Core Video, all called from Rust. I used ts-rs to generate the TypeScript types from the Rust ones, so the frontend and backend can't drift apart.

I planned the work in Linear, wrote a spec and tickets for each feature, built test first, and kept a numbered manual test guide for each feature. The project has about 470 TypeScript tests and 150 Rust tests.

## Decisions that mattered

### A GIF encoder of my own

I wrote the GIF encoder in Rust. It builds its palette with k-means from only the pixels that changed, encodes only the changed regions of each frame, and uses lossy LZW compression. A real 1080p recording went from 19 MB to about 4 MB, under the X limit. I also fixed a ghosting bug in the encoder along the way.

### Constant-quality H.264

MP4 export targets a quality level instead of a bitrate and places a keyframe every 4 seconds. A 23-second clip went from 5.2 MB to 1.5 MB at the same SSIM score, with no change in export time. Export runs through a custom GPU compositor that reads the native 4:2:0 YUV frames and lets Core Image do the color conversion on the GPU.

### Keystroke badges that respect privacy

Badges label only modifier and named keys, like ⌘, Shift or Return, and show nothing while a password field has focus.

### An editor built for short clips

The timeline has multiple lanes, snapping, multi-select, cuts you can restore, and undo and redo. OpenTape also suggests zooms from the cursor and click log, so a demo can follow the cursor. A command palette covers the rest.

## Shipping it

Every tag runs a GitHub Actions pipeline that builds a signed and notarized DMG with signed updater artifacts, so the app updates itself. It's also in a Homebrew tap.

I locked down the supply chain too. Actions are pinned by SHA, the Rust toolchain and dependencies are pinned, Dependabot and a scheduled cargo audit watch for problems, networking uses rustls only, and I audited the FFI boundary between Rust and the macOS frameworks.

The website runs on Next.js 16, prerendered on Vercel. It embeds an interactive copy of the editor, built from the app's own components.

## Results

- Six releases in the nine days after the public launch.
- GIF exports at about a fifth of their old size (19 MB to about 4 MB at 1080p).
- MP4 exports at under a third of their old size at equal quality (5.2 MB to 1.5 MB).
- About 620 automated tests across TypeScript and Rust.
- Listed in [open-source-mac-os-apps](https://github.com/serhii-londar/open-source-mac-os-apps/pull/1933).
