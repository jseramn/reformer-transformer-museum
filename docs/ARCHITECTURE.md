# Architecture

## Overview

Museo Reformer is a monorepo with a Next.js frontend and a Modal Python inference service.

```
Browser → Vercel (Next.js web/) → /api/generate → Modal (modal/app.py) → Hugging Face model
                ↓
           PostHog (analytics)
```

## Directories

| Path | Role |
|------|------|
| `web/` | Next.js App Router UI, API proxy, PostHog client |
| `modal/` | Modal app: model load + `/generate` endpoint |
| `scripts/` | Local CLI reference (`crime-and-punishment.py`) |
| `docs/` | Contributor documentation |

## Deploy

- **Vercel**: set Root Directory to `web/`
- **Marketplace**: install Modal + PostHog integrations
- **Modal**: `modal deploy modal/app.py` → set `MODAL_ENDPOINT_URL` in Vercel

## License

Project code: GPL-3.0 (jseramn). See `THIRD_PARTY_NOTICES.md` for model and dependency attributions.