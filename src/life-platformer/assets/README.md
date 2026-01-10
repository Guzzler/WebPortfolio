# Game Assets Directory

This directory will contain all pixel art assets for the Life.run() platformer game.

## Directory Structure

```
assets/
├── sprites/
│   ├── characters/      # Player character sprites (4 phases)
│   ├── npcs/           # NPC character sprites
│   └── collectibles/   # Collectible achievement icons
├── tilesets/
│   ├── school-tiles/   # Phase 1 environment tiles
│   ├── college-tiles/  # Phase 2 environment tiles
│   ├── work-tiles/     # Phase 3 environment tiles
│   └── usa-tiles/      # Phase 4 environment tiles
├── backgrounds/        # Parallax background layers
├── audio/
│   ├── music/          # Background music tracks
│   └── sfx/            # Sound effects
└── ui/                 # UI elements and HUD
```

## Asset Creation Guide

### How to Generate Assets

1. **Open the main plan**: See `/LIFE_PLATFORMER_PLAN.md` in the repository root
2. **Find the "IMAGE GENERATION PROMPTS" section**
3. **Copy prompts to your image generator** (nano banana, DALL-E, Midjourney, etc.)
4. **Save generated images** to the appropriate directories below

### Priority Order

#### Priority 1 (Core Gameplay) - Start Here!
1. **Character sprites** → `sprites/characters/`
   - player-phase1.png (school student)
   - player-phase2.png (college student)
   - player-phase3.png (working professional)
   - player-phase4.png (USA professional)
   - Each should be a sprite sheet with 8 frames (idle, walk, jump)

2. **Collectibles** → `sprites/collectibles/`
   - 8 items for Phase 1 (basketball trophy, badges, certificates...)
   - 10 items for Phase 2 (degree, intern badges, tech logos...)
   - 12 items for Phase 3 (payment terminal, founding engineer badge...)
   - 10 items for Phase 4 (CMU degree, avatar hologram, future compass...)

3. **Basic tilesets** → `tilesets/`
   - Ground tiles (16x16)
   - Platform tiles (16x16)
   - Wall tiles (16x16)

#### Priority 2 (Environment)
4. **Background layers** → `backgrounds/`
   - Sky layers
   - Distant buildings/mountains
   - Mid-ground elements

5. **Interior details** → `tilesets/`
   - School desks, chalkboards, computers
   - College labs, dorm furniture
   - Office equipment, servers
   - CMU/SF tech elements

#### Priority 3 (Polish)
6. **NPCs** → `sprites/npcs/`
   - 5 school NPCs (teachers, coach, students)
   - 6 college NPCs (professors, mentors, classmates)
   - 8 work NPCs (colleagues, co-founders, users)
   - 6 USA NPCs (CMU professors, Persona AI team)

7. **UI elements** → `ui/`
   - Dialogue boxes
   - HUD elements
   - Menu screens
   - Achievement notifications

8. **Special effects** → `sprites/`
   - Particle effects
   - Collectible sparkles
   - Transition effects

## Naming Conventions

### Character Sprites
```
player-phase1.png     (32x32 sprite sheet, 8 frames)
player-phase2.png
player-phase3.png
player-phase4.png
```

### NPCs
```
npc-teacher.png
npc-coach.png
npc-professor.png
npc-mentor.png
npc-colleague.png
```

### Collectibles
```
collectible-trophy.png
collectible-badge.png
collectible-certificate.png
collectible-[specific-item].png
```

### Tilesets
```
tile-ground.png       (16x16)
tile-platform.png     (16x16)
tile-wall.png         (16x16)
```

## Technical Specifications

- **Format**: PNG with alpha transparency
- **Character sprites**: 32x32 pixels
- **Collectibles**: 16x16 pixels
- **Tiles**: 16x16 pixels
- **Style**: 16-bit SNES/GBA aesthetic
- **Color palette**: Limited but vibrant (~32-64 colors per scene)
- **Animation frames**: 4-8 frames for walk cycles, 2-4 for idle

## Current Status

All directories have been created with placeholder graphics in code. Replace these with actual pixel art assets as they're generated.

### Placeholders Currently in Use
- Blue rectangle for player-phase1
- Green rectangle for player-phase2
- Orange rectangle for player-phase3
- Purple rectangle for player-phase4
- Colored circles for collectibles
- Gray rectangles for platforms and tiles

## Audio Assets

### Music (4 tracks needed)
Place in `audio/music/`:
- phase1-music.mp3 (Upbeat, playful 8-bit - childhood wonder)
- phase2-music.mp3 (Energetic chiptune - learning, growth)
- phase3-music.mp3 (Driven, rhythmic - professional ambition)
- phase4-music.mp3 (Inspiring, forward-looking - achievement)

### Sound Effects
Place in `audio/sfx/`:
- collect.mp3 (Collectible pickup)
- achievement.mp3 (Achievement unlock fanfare)
- text-beep.mp3 (Dialogue text scrolling)
- footstep.mp3 (Walking sound)
- jump.mp3 (Jump sound)

## Resources

### Pixel Art Tools
- Aseprite (recommended)
- Piskel (free, web-based)
- GIMP (free)
- Photoshop with pixel art plugins

### Image Generators
- Nano Banana
- DALL-E 3
- Midjourney
- Stable Diffusion

### Audio Resources
- Chiptone (web-based chiptune creator)
- BeepBox (web-based music maker)
- FreeSound.org (CC-licensed sounds)
- OpenGameArt.org (free game assets)

## Notes

- All prompts are optimized for "16-bit" style, not 8-bit
- Emphasize "SNES style" or "GBA style" for quality
- Request "transparent background" for sprites
- Use "seamless tiling" for tilesets
- Consider generating sprite sheets for animations

Once assets are generated and placed in these directories, update the asset loading code in `scenes/BootScene.js` to load the real files instead of generating placeholder graphics.
