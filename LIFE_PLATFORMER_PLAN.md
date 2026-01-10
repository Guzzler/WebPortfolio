# Life Platformer Game - Architecture Plan

## Overview
A pixel art walking simulator/narrative platformer that tells Sharang's life story through 4 distinct phases. Focus on exploration, atmosphere, and storytelling rather than complex mechanics.

## Game Concept: "Life.run()" or "Journey.exe"

### Core Philosophy
- **Genre**: Narrative walking simulator with light platforming
- **Style**: Pixel art nostalgia (16-bit SNES/GBA aesthetic)
- **Tone**: Warm, reflective, inspirational
- **Length**: 15-25 minutes of gameplay
- **Platform**: Web-based (Unity WebGL or Phaser.js)

---

## Technical Architecture

### Technology Stack
**Recommended: Phaser 3 (JavaScript)**
- Integrates perfectly with existing React portfolio
- Excellent pixel art support and tilemapping
- Lighter than Unity for a simple walking sim
- Can embed directly in portfolio without iframe
- Strong community for pixel art games

**Alternative: Unity**
- More familiar based on existing game portfolio
- WebGL export for web embedding
- Better if planning to expand later

### Project Structure
```
src/life-platformer/
├── assets/
│   ├── sprites/
│   │   ├── characters/      # 4 phase character sprites
│   │   ├── npcs/           # People you've worked with
│   │   └── collectibles/   # Achievement icons
│   ├── tilesets/
│   │   ├── school-tiles/   # Phase 1
│   │   ├── college-tiles/  # Phase 2
│   │   ├── work-tiles/     # Phase 3
│   │   └── usa-tiles/      # Phase 4
│   ├── backgrounds/        # Parallax layers
│   ├── audio/
│   │   ├── music/          # Ambient tracks per phase
│   │   └── sfx/            # Footsteps, collect, interact
│   └── ui/                 # HUD, dialogue boxes
├── scenes/
│   ├── Phase1School.js
│   ├── Phase2College.js
│   ├── Phase3Work.js
│   └── Phase4USA.js
├── entities/
│   ├── Player.js           # Character controller
│   ├── NPC.js              # Interactive characters
│   └── Collectible.js      # Achievements
└── managers/
    ├── DialogueManager.js
    ├── ProgressTracker.js
    └── AudioManager.js
```

---

## Game Design - 4 Phase Journey

### Phase 1: School Days (2003-2015)
**Setting**: Delhi Public School, Pune
**Character Sprite**: Young student with backpack and basketball
**Color Palette**: Warm yellows, school blues, green grass

**Level Design**:
- Start: School entrance with "2003" sign
- Platforming through: Classrooms, basketball court, computer lab
- Key locations to explore:
  - Student Council office (leadership achievement)
  - Computer lab (Google Code-in, Informatics Olympiad)
  - Basketball court (varsity team)
  - Library (Scholar Honours)

**Collectibles** (8 total):
- Basketball trophy
- Student Council badge
- Programming certificate (Olympiad)
- Google Code-in badge
- Scholar Honours ribbon
- Graduation cap
- Board game piece (hobby)
- Football

**NPCs**: Teachers, teammates, fellow students
**Exit**: Walking toward college gates with transition to "2015"

---

### Phase 2: Undergrad (2015-2019)
**Setting**: Manipal Institute of Technology campus
**Character Sprite**: College student with laptop bag, slightly taller
**Color Palette**: Campus greens, sunset oranges, tech blues

**Level Design**:
- Start: College gates, MIT Manipal sign
- Platforming through: Lecture halls, coding labs, internship offices
- Key locations:
  - Computer lab (coursework projects)
  - Microsoft building (2018 summer internship)
  - Conscia office (2017 internship)
  - OpenShiksha workspace (social impact project)
  - Dorm room (gaming setup - LoL, PC games)

**Collectibles** (10 total):
- B.Tech degree (9.64 GPA medallion)
- Microsoft intern badge
- Conscia intern badge
- OpenShiksha logo (impact achievement)
- Neural Networks textbook
- Computer Vision book
- React.js logo
- Python logo
- Gaming controller
- Coffee cup (all-nighters)

**NPCs**: Professors, intern mentors, fellow students, OpenShiksha beneficiaries
**Exit**: Airplane taking off or walking toward job offer letters

---

### Phase 3: Working Professional (2019-2022)
**Setting**: Urban India - startup offices, tech hubs
**Character Sprite**: Professional with messenger bag, confident posture
**Color Palette**: Modern grays, startup neon accents, Indian cityscape

**Level Design**:
- Multi-floor office building platforming
- Each floor = different company/role
- Vertical progression showing career growth

**Floors/Companies**:
1. **Ground Floor - Instamojo** (Jan 2019-Mar 2021)
   - Fintech theme: payment terminals, merchant shops
   - Django servers, GoLang microservices as platforms

2. **2nd Floor - RedBrickAI** (Apr 2021-Mar 2022)
   - Computer vision lab: image annotation tools, training data
   - "Founding Engineer" plaque on desk
   - Team members working on GraphQL diagrams

3. **3rd Floor - StepChange** (Apr-Aug 2022)
   - Green tech: carbon footprint meters, environmental data
   - AWS cloud platforms floating above

**Side Room - VaccinePost** (May 2021):
- Small office showing COVID vaccine notification system
- Impact counter showing people helped

**Collectibles** (12 total):
- Instamojo payment terminal
- RedBrickAI logo (founding engineer badge)
- StepChange leaf logo
- VaccinePost syringe icon
- Full-stack developer trophy
- TypeScript logo
- AWS cloud badge
- GraphQL logo
- Startup founder badge
- Team leadership medal
- Social impact star
- Career milestone marker

**NPCs**: Colleagues, co-founders, users/customers
**Exit**: Acceptance letter from CMU, airplane to USA

---

### Phase 4: USA & Future (2022-Present)
**Setting**: Carnegie Mellon → San Francisco
**Character Sprite**: Evolved professional with modern tech aesthetic
**Color Palette**: CMU red, SF tech blues, futuristic purples for AI

**Level Design - Two Sub-areas**:

**4A: CMU Campus (2022-2024)**
- University buildings with advanced AI/ML themes
- Gates Center, Newell-Simon Hall
- Floating AI models, neural networks as visual effects
- Key rooms: ML class, Deep Learning lab, Startup studio

**4B: San Francisco - Persona AI (2024-Present)**
- Modern SF office with 3D avatar holograms
- Python/React workstations
- SwiftUI mobile dev area
- Adaptive behavioral systems visualized as flowing data
- Mission statement visible: "Bridge socio-economic gap"

**Collectibles** (10 total):
- MS AI degree (CMU)
- Machine Learning certificate
- LLM research paper
- On-Device ML badge
- Persona AI founding engineer badge
- 3D avatar hologram
- SwiftUI app icon
- FastAPI logo
- Social entrepreneurship medal
- Future vision compass (pointing ahead)

**Special Elements**:
- Your 5 published games visible on a shelf/wall (Easter egg)
- Portfolio website on a computer screen
- Open door at the end labeled "Future" with bright light

**NPCs**: CMU professors, Persona AI team, AI avatars
**Exit**: Character walks toward bright "Future" door, game ends with inspirational message

---

## Gameplay Mechanics

### Basic Controls
- **Arrow Keys / WASD**: Move left/right, climb ladders
- **Space**: Small jump (minimal platforming)
- **E / Enter**: Interact with NPCs and collectibles
- **ESC**: Pause menu

### Core Mechanics
1. **Walking & Exploration**: Primary interaction
2. **Dialogue System**: NPCs share memories, achievements, learnings
3. **Collectible System**: Find achievements that unlock journal entries
4. **Journal/Progress Tracker**: Visual representation of life timeline
5. **Ambient Storytelling**: Environmental details tell micro-stories

### UI Elements
- **HUD**: Collectibles counter, current phase indicator
- **Dialogue Boxes**: Pixel art text boxes for NPC interactions
- **Journal**: Pause menu showing collected achievements with descriptions
- **Phase Indicator**: Visual bar showing progress through 4 phases

---

## Narrative Structure

### Opening
- Title screen: "Life.run()" or "Journey.exe"
- Pixel art of all 4 character versions standing together
- "Press START to begin"
- Opening text: "Every life is a journey. This is mine. - Sharang"

### Transitions Between Phases
- Fade to black with year display
- Character sprite evolves
- Music changes to new theme
- Brief text: "Chapter 2: Learning to Build" etc.

### Ending
- Final collectible near "Future" door
- Character reflects on journey
- Credits roll showing real photos/screenshots from life
- Final message: "The journey continues..."
- Links back to portfolio website

---

## Audio Design

### Music Tracks (4 Themes)
1. **Phase 1**: Upbeat, playful 8-bit tune (childhood wonder)
2. **Phase 2**: Energetic chiptune (learning, growth)
3. **Phase 3**: Driven, rhythmic (professional ambition)
4. **Phase 4**: Inspiring, forward-looking (achievement, future)

### Sound Effects
- Footstep sounds (different per surface)
- Collectible pickup chime
- Dialogue text scrolling beep
- Achievement unlock fanfare
- Ambient office/school sounds

---

## Integration with Portfolio

### Embedding Options
1. **Dedicated Game Page**: Add to portfolio navigation
2. **Interactive Resume**: Replace/supplement existing timeline
3. **Easter Egg**: Hidden link in current portfolio
4. **Landing Experience**: Optional intro before main portfolio

### File Structure in Portfolio
```
src/
├── life-platformer/          # New game directory
├── react-app/
│   └── components/
│       └── main-content/
│           └── LifePlatformer.js  # React wrapper component
```

### Loading Strategy
- Lazy load game assets
- Show loading screen with joystick animation (reuse existing)
- Mixpanel tracking for game completion, phase progress

---

## Development Phases

### Phase 1: Core Engine (Week 1)
- [ ] Set up Phaser 3 project
- [ ] Implement player movement and collision
- [ ] Create basic tilemap system
- [ ] Add dialogue system

### Phase 2: Phase 1 Level (Week 2)
- [ ] Create school tileset and background
- [ ] Design school level layout
- [ ] Add collectibles and NPCs
- [ ] Implement phase transition

### Phase 3: Remaining Phases (Week 3-4)
- [ ] Build college, work, USA levels
- [ ] All collectibles and dialogues
- [ ] Music and SFX integration

### Phase 4: Polish & Integration (Week 5)
- [ ] UI/UX refinement
- [ ] Bug fixes and playtesting
- [ ] Portfolio integration
- [ ] Analytics setup

---

## Critical Files to Create/Modify

### New Files
- `src/life-platformer/` (entire game directory)
- `src/react-app/components/main-content/LifePlatformer.js`
- `public/life-platformer-assets/` (game assets)

### Modified Files
- `src/react-app/components/MainContent.js` - Add route
- `src/react-app/components/main-content/BaseContent.js` - Add nav link
- `package.json` - Add Phaser 3 dependency

---

## Verification & Testing

### Functionality Tests
1. Load game in portfolio - verify no performance issues
2. Complete each phase - verify collectibles work
3. Test dialogue system with all NPCs
4. Verify phase transitions smooth
5. Check audio plays correctly
6. Test on mobile (touch controls or link to desktop version)

### User Experience Tests
1. Playthrough time: 15-25 minutes target
2. Clarity: Story makes sense without external context
3. Engagement: No boring/tedious sections
4. Accessibility: Controls simple, text readable

### Analytics Tracking
- Game start
- Phase completion
- Collectibles found
- Full game completion
- Average playtime

---

## Success Criteria
- ✅ Tells your life story in engaging, interactive format
- ✅ Pixel art aesthetic feels nostalgic and polished
- ✅ Walking simulator pace - relaxing, not stressful
- ✅ All major achievements represented as collectibles
- ✅ Seamlessly integrated into portfolio
- ✅ 15-25 minute complete experience
- ✅ Mobile-friendly or clearly desktop-only

---

# IMAGE GENERATION PROMPTS FOR NANO BANANA

See the detailed image generation prompts section in the .claude/plans folder for comprehensive asset generation instructions.

## Quick Reference - Priority Order

### Priority 1 (Core Gameplay)
1. All 4 character phase sprites with animations
2. Basic tileset for each phase (floors, walls, platforms)
3. All collectible icons (40 total across 4 phases)

### Priority 2 (Environment)
4. Background parallax layers
5. Interior room details
6. Phase-specific objects

### Priority 3 (Polish)
7. NPCs (25 characters total)
8. UI elements
9. Special effects
10. Easter eggs

## Technical Specifications
- **Resolution**: 16x16 or 32x32 pixels
- **Style**: 16-bit SNES/GBA aesthetic (NOT 8-bit NES)
- **Format**: PNG with alpha transparency
- **Palette**: Limited but vibrant (~32-64 colors per scene)
