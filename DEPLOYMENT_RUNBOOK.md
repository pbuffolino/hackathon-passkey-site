# Deployment & Contribution Runbook

This document outlines the mandatory steps for updating the Passkey Pilot project. Follow this process for every set of changes to ensure the repository and live site remain synchronized.

## 1. Update Documentation

Before committing any code changes, update the `README.md` file to reflect your work.

1.  Open `README.md`.
2.  Locate the **Recent Changes** section near the bottom.
3.  Add a bullet point describing your changes.
    *   *Example:* `- **UI Fix**: Adjusted padding in MFA Leaderboard.`

## 2. Verify Locally (Wait for User Approval)

Before committing or deploying, ensure the user has had time to test the changes locally.

1.  Inform the user that changes are ready for testing.
2.  Wait for explicit confirmation or approval to proceed with deployment.

## 3. Commit and Push to Main

Persist your changes to the primary source code branch.

```bash
# Stage your changes
git add .

# Commit with a descriptive message
git commit -m "Description of your changes"

# Push to the main branch
git push origin main
```

## 4. Deploy to GitHub Pages

The live site is hosted on the `gh-pages` branch. We use a customized script to build the project and push the static output automatically. This replaces the need to manually checkout or merge to the `gh-pages` branch.

**Command:**

```bash
npm run deploy
```

**What this does:**
1.  Runs `next build` to create a static export in the `out/` directory.
2.  Uses the `gh-pages` package to push the content of the `out/` folder directly to the `gh-pages` branch on GitHub.

---

### Summary Checklist

- [ ] **README Updated**: Added notes to "Recent Changes".
- [ ] **Verified Locally**: User has tested and approved the changes.
- [ ] **Main Branch Updated**: Code committed and pushed to `main`.
- [ ] **Live Site Updated**: `npm run deploy` executed successfully.

