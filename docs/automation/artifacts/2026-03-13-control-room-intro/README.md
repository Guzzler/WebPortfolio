# Control Room Intro Artifacts

Generated on 2026-03-13 from the local production build served at `http://127.0.0.1:4173`.

## Screenshots
- `desktop-hero-dark.png`
- `desktop-hero-light.png`
- `mobile-hero-dark.png`
- `mobile-hero-light.png`
- `desktop-games-dark.png`
- `desktop-game-modal-dark.png`
- `mobile-games-dark.png`
- `desktop-dark.png`
- `desktop-light.png`
- `mobile-dark.png`
- `mobile-light.png`

## Verification Notes
- Desktop and mobile hero states were captured in both dark and light mode.
- The Games section was captured at desktop and mobile widths.
- Desktop game-card interaction was verified after fixing a Mixpanel crash that had been preventing the modal from opening.
- Mobile game-card interaction opened the expected `https://dpsguzzler.itch.io/zen-garden` page.
- DOM metrics confirmed no horizontal overflow in the tested desktop (`1440px`) and mobile (`390px`) viewports.
