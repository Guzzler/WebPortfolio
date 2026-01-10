# Life.run() - Pixel Art Life Platformer

A narrative walking simulator that tells Sharang Pai's life story through 4 distinct phases, built with Phaser 3 and React.

## Overview

This is a pixel art platformer game that chronicles the journey from school in Pune, through college at MIT Manipal, into the startup world, and eventually to Carnegie Mellon and San Francisco.

### Features

- **4 Phase Journey**: School (2003-2015), College (2015-2019), Work (2019-2022), USA (2022-Present)
- **40 Collectibles**: Achievements representing life milestones
- **NPCs**: Interactive characters from different life phases
- **Walking Simulator**: Relaxing exploration-focused gameplay
- **Progress Tracking**: Save system with localStorage
- **Phase Transitions**: Smooth transitions between life stages

## Technology Stack

- **Phaser 3**: Game engine for 2D platformer mechanics
- **React**: Integration with portfolio website
- **JavaScript ES6+**: Modern JavaScript features
- **LocalStorage**: Progress persistence

## Project Structure

```
src/life-platformer/
├── assets/                  # Game assets (to be populated with pixel art)
│   ├── sprites/
│   │   ├── characters/     # Player sprites for 4 phases
│   │   ├── npcs/          # NPC character sprites
│   │   └── collectibles/  # Achievement icons
│   ├── tilesets/          # Level tilesets
│   ├── backgrounds/       # Parallax backgrounds
│   ├── audio/            # Music and SFX
│   └── ui/               # UI elements
├── scenes/               # Phaser scenes
│   ├── BootScene.js     # Asset loading
│   ├── TitleScene.js    # Main menu
│   ├── Phase1School.js  # School phase (2003-2015)
│   ├── Phase2College.js # College phase (2015-2019)
│   ├── Phase3Work.js    # Work phase (2019-2022)
│   └── Phase4USA.js     # USA phase (2022-Present)
├── entities/            # Game entities
│   ├── Player.js        # Player controller
│   ├── NPC.js          # NPC interactions
│   └── Collectible.js  # Collectible items
├── managers/           # Game systems
│   ├── DialogueManager.js    # Dialogue system
│   ├── ProgressTracker.js    # Progress and saves
│   └── AudioManager.js       # Audio control
├── config.js           # Phaser configuration
└── game.js            # Game initialization
```

## Game Design

### Phase 1: School Days (2003-2015)
- **Location**: Delhi Public School, Pune
- **Collectibles**: 8 achievements
- **Highlights**: Basketball, Student Council, Programming Olympiads

### Phase 2: Undergrad (2015-2019)
- **Location**: MIT Manipal
- **Collectibles**: 10 achievements
- **Highlights**: Microsoft/Conscia internships, OpenShiksha, B.Tech degree

### Phase 3: Working Professional (2019-2022)
- **Location**: Urban India startup offices
- **Collectibles**: 12 achievements
- **Highlights**: Instamojo, RedBrickAI (Founding Engineer), StepChange, VaccinePost

### Phase 4: USA & Future (2022-Present)
- **Location**: Carnegie Mellon → San Francisco
- **Collectibles**: 10 achievements
- **Highlights**: MS AI degree, Persona AI (Founding Engineer)

## Controls

- **Arrow Keys / WASD**: Move left/right
- **SPACE**: Jump
- **E / ENTER**: Interact with NPCs and dialogue
- **ESC**: Pause menu (future feature)

## Development Status

### Completed ✅
- [x] Phaser 3 project structure
- [x] Player entity with phase evolution
- [x] Dialogue system with typewriter effect
- [x] Progress tracking with save/load
- [x] All 4 phase scenes with level design
- [x] Collectible system with animations
- [x] NPC interaction system
- [x] React integration component
- [x] Portfolio routing

### Pending (Asset Creation) 🎨
- [ ] Character sprites (4 phases × 8 frames each)
- [ ] Collectible icons (40 unique items)
- [ ] NPC sprites (25 characters)
- [ ] Environment tilesets
- [ ] Background parallax layers
- [ ] UI elements
- [ ] Music tracks (4 phase themes)
- [ ] Sound effects

## Asset Requirements

See `LIFE_PLATFORMER_PLAN.md` in the root directory for comprehensive image generation prompts for creating all required pixel art assets.

### Key Specifications
- **Style**: 16-bit SNES/GBA aesthetic (NOT 8-bit NES)
- **Resolution**: 16x16 or 32x32 pixels
- **Format**: PNG with alpha transparency
- **Color Palette**: Limited but vibrant (~32-64 colors per scene)
- **Animation**: 4-8 frames for walk cycles

## How to Play

### In Development
```bash
npm start
# Navigate to http://localhost:3000/life-game
```

### In Production
Visit the deployed portfolio and click "Play Now" on the Life.run() card.

## Next Steps

1. **Generate Pixel Art Assets**: Use the prompts in `LIFE_PLATFORMER_PLAN.md` with image generators
2. **Import Assets**: Replace placeholder graphics with actual pixel art
3. **Add Audio**: Compose or source chiptune music for each phase
4. **Playtesting**: Test progression flow and collectible placement
5. **Polish**: Add particle effects, transitions, and juice
6. **Mobile Support**: Add touch controls or optimize for mobile

## Analytics

The game tracks the following events via Mixpanel:
- Game start
- Phase completion
- Collectibles found
- Full game completion
- Average playtime

## Credits

- **Design & Development**: Sharang Pai
- **Engine**: Phaser 3
- **Framework**: React
- **Inspired by**: Classic 16-bit platformers and walking simulators

## License

This is a personal portfolio project. All rights reserved.
