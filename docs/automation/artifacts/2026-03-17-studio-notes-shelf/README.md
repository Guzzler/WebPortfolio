# Studio Notes Shelf Artifacts

Generated on 2026-03-17 from the local production build served at `http://127.0.0.1:4173`.

## Screenshots

- `desktop-studio-notes-dark.png`
- `desktop-studio-notes-light.png`
- `desktop-games-dark.png`
- `mobile-studio-notes-dark.png`
- `mobile-studio-notes-light.png`
- `mobile-games-dark.png`

## Verification Notes

- `npm run lint` passed.
- `npm test -- --watch=false` passed after adding a `window.matchMedia` mock to the Jest setup.
- `npm run build` passed.
- Desktop and mobile screenshots were captured from the local production build in Chrome via Playwright.
- The Studio Notes shelf and the follow-through into Games were checked in dark mode on desktop and mobile, with light-mode captures for the Studio Notes shelf.
- `verification.json` records no horizontal overflow at `1440px` and `390px` in both themes.
