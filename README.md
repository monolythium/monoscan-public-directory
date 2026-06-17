# Monoscan Public dApp Directory

This repository contains the public directory data used by Monoscan's `dApps / Web3` page.

The directory is a discovery list for products that build on, integrate with, or demonstrate Monolythium. A listing is informational only. It is not an audit, endorsement, foundation guarantee, investment recommendation, or security certification.

## Categories

- Games
- Finance
- Bridges
- Social
- ID
- Supply Chain
- Healthcare
- Education
- Prediction Markets
- AI
- Tools

## Repository Layout

- `apps/*.json` - one dApp listing per file.
- `schema/dapp.schema.json` - JSON schema for listing files.
- `scripts/validate.mjs` - dependency-free validation used by CI.
- `.github/PULL_REQUEST_TEMPLATE.md` - contributor checklist.

## Add Or Update A Listing

1. Fork this repository.
2. Copy an existing file in `apps/` or create `apps/<slug>.json`.
3. Use a stable lowercase slug for `id`, for example `anchorfall`.
4. Run `npm run validate`.
5. Open a pull request with evidence for the listing fields.

Monoscan maintainers may ask for changes when the submission is missing ownership proof, uses unsafe wording, points to a broken URL, or claims compatibility that cannot be verified publicly.

Every listing must also declare whether it is available on `mainnet`, `testnet`, or `mainnet-and-testnet`.

## Listing Status

- `official` - operated by the Monolythium Foundation or a formally designated entity.
- `foundation-maintained` - maintained by an affiliated Monolythium team or foundation project.
- `community` - built and maintained independently.
- `experimental` - early, testnet-only, not production ready, or still waiting on required chain/tooling surfaces.
- `deprecated` - no longer recommended for new users but retained for historical context.

## Required User Warning

Monoscan must show a leaving-site warning before users follow a dApp link:

> You are leaving Monoscan. Listed dApps may be community-built and are not necessarily operated, audited, or endorsed by the Monolythium Foundation. Review the destination before connecting a wallet.

## Review Expectations

Maintainers review PRs for shape, category fit, broken links, malicious copy, obvious impersonation, and public evidence. Maintainers do not audit smart contracts or guarantee dApp safety as part of directory review.
