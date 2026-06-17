# Contributing

Thanks for improving the Monoscan public dApp directory.

## When To Open A PR

Open a PR when you want to:

- add a new dApp listing;
- update a URL, source repository, creator, category, or compatibility status;
- mark a listing as deprecated;
- correct inaccurate public metadata.

Do not use this repository for vulnerability reports. Use the dApp maintainer's security process, or the Monolythium security process when the issue affects foundation-maintained software.

## Listing Requirements

Every listing must:

- use one of the allowed categories;
- include a clear creator or maintainer;
- declare its network as `mainnet`, `testnet`, or `mainnet-and-testnet`;
- state whether the product is open source;
- state browser wallet compatibility as `compatible`, `planned`, `not-compatible`, or `unknown`;
- avoid claims like "audited", "official", "safe", or "endorsed" unless public evidence supports that status;
- use HTTPS URLs for public websites, source, docs, and contact links.

`websiteUrl` is recommended once the dApp is live. Early testnet listings may omit it when `listingStatus` is `experimental`, but must include `sourceUrl` or `docsUrl` so reviewers can inspect the project.

## PR Checklist

Before opening a PR:

1. Run `npm run validate`.
2. Confirm all URLs are correct.
3. Include evidence for browser wallet compatibility.
4. Explain who maintains the dApp.
5. Confirm the listing is not using foundation branding unless authorized.

Maintainers may close listings that are spam, misleading, malicious, duplicated, abandoned, or impossible to verify from public information.
