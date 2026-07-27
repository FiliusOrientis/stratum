# Security Policy

## Reporting a Vulnerability

**Do not open a public issue.** Instead, report vulnerabilities privately:

1. Go to Security → Report a Vulnerability (GitHub Security Advisories)
2. Or email: [security contact TBD]

We respond within 48 hours. We'll keep you updated on the fix timeline.

## Supported Versions

| Version | Supported |
|---------|-----------|
| main    | Yes       |
| < 1.0   | No        |

## Security Practices

- No secrets in source code (Biome `noSecrets` rule enabled)
- Dependencies scanned via Dependabot
- CodeQL SAST analysis on every PR
- All API keys handled via environment variables
- No `dangerouslySetInnerHTML` without explicit review

## Disclosure

We follow coordinated disclosure. Fixes are released before public disclosure.
