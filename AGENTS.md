## Automation Run Notes

- This repo is often opened in a detached worktree state. Before selecting a pending task or creating a feature branch, treat `origin/main` as the source of truth and branch from it instead of from the current `HEAD`.
- For git commands in Codex worktrees, keep using an explicit `safe.directory` override for the current repo path.
- For push-access preflight, `git push --dry-run origin HEAD:main` reaching GitHub and returning a non-fast-forward rejection still proves auth/connectivity. Do not treat that response as a blocked run by itself.
- For GitHub CLI commands, prefer the explicit repo form such as `gh pr view <number> --repo Guzzler/WebPortfolio ...` to avoid roaming-config access issues in sandboxed sessions.
- For `ntfy` notifications from PowerShell, set TLS 1.2 before `Invoke-RestMethod`. If the sandbox returns a transport/TLS failure, retry the same notification with escalation instead of marking the run blocked immediately.
