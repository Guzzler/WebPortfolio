# Builder Modes Section - 2026-03-13

## Summary
- Added a new Builder Modes section that reframes Sharang's middle-of-page story around three connected ways of building: AI products, public-interest access work, and play.
- Reworked the Games heading and supporting copy so the gallery feels like evidence for the "Build for play" mode instead of a detached hobbies block.
- Added repo-level automation notes in [`AGENTS.md`](C:\Users\shara\.codex\worktrees\1828\WebPortfolio\AGENTS.md) so future runs branch from `origin/main`, handle `gh` more reliably, and interpret push dry-runs correctly in detached worktrees.

## Verification
- `npm run lint`
- `npm run build`
- `npm test -- --watch=false` (repo currently has no matching tests)
- Local production build served on `http://127.0.0.1:4173`
- Headless Chrome verification at desktop `1440px` and mobile `390px`
- Verified no horizontal overflow in dark or light mode on either viewport
- Verified the Builder Modes bridge correctly navigates to `#games`

## Screenshots
- `desktop-builder-dark.png`
- `desktop-builder-light.png`
- `desktop-games-dark.png`
- `mobile-builder-dark.png`
- `mobile-builder-light.png`
- `mobile-games-dark.png`
