# Reformer Museum

An interactive museum mini-app that showcases [google/reformer-crime-and-punishment](https://huggingface.co/google/reformer-crime-and-punishment)—Google's Reformer language model fine-tuned on Dostoevsky's *Crime and Punishment*. Explore the model's history, architecture, and live text generation through a dark-canvas Next.js frontend backed by Modal serverless inference.

## Overview

This project is a small educational exhibit around one of the earliest publicly released Reformer checkpoints:

- **Frontend (`web/`)** — Next.js app with an xAI-inspired design system (see [`DESIGN.md`](./DESIGN.md)): near-black canvas, outline pills, display typography, and museum-style content panels.
- **Inference (`modal/`)** — Modal.com deployment that loads the Hugging Face model and exposes a generation endpoint consumed by the web app.
- **Local script** — [`crime-and-punishment.py`](./crime-and-punishment.py) for quick CLI experiments without deploying.

The model generates continuations of English text in the style of *Crime and Punishment* (~0.5M training tokens). It is a research artifact from 2020, not a general-purpose chat model.

## Quick Start

### Prerequisites

- **Node.js** 18+ (for `web/`)
- **Python** 3.10+ (for `modal/` and local scripts)
- **Modal account** — [modal.com](https://modal.com) (for deployed inference)
- **Vercel account** — [vercel.com](https://vercel.com) (optional, for frontend hosting)

### Clone

```bash
git clone https://github.com/<your-org>/old-ai-model-research.git
cd old-ai-model-research
cp .env.example .env
```

Fill in `.env` values (see [Environment variables](#environment-variables)).

### Local CLI (no web stack)

```bash
python -m venv reformer
# Windows
reformer\Scripts\activate
# macOS / Linux
source reformer/bin/activate

pip install -r requirements.txt
python crime-and-punishment.py
```

## Dev Local

### Web (`web/`)

```bash
cd web
npm install
cp ../.env.example .env.local   # or symlink from repo root
npm run dev
```

Open [http://localhost:3000](http://localhost:3000). The app expects `MODAL_ENDPOINT_URL` (or a local proxy) for generation requests.

### Modal (`modal/`)

```bash
cd modal
python -m venv .venv
# Windows
.venv\Scripts\activate
# macOS / Linux
source .venv/bin/activate

pip install -r requirements.txt
modal token set --token-id $MODAL_TOKEN_ID --token-secret $MODAL_TOKEN_SECRET
modal serve app.py
```

`modal serve` prints a dev endpoint URL—set `MODAL_ENDPOINT_URL` in your web `.env.local` to that value.

### Full stack

1. Start Modal: `modal serve app.py` in `modal/`
2. Copy the served URL into `MODAL_ENDPOINT_URL`
3. Start Next.js: `npm run dev` in `web/`
4. Use the museum UI to submit prompts and inspect generations

## Deploy Vercel (`web/`)

The repo root [`vercel.json`](./vercel.json) points Vercel at the Next.js app in `web/`:

1. Import the repository in [Vercel](https://vercel.com/new).
2. Set **Root Directory** to `web` (or configure the monorepo layout to match your project settings).
3. Add environment variables from [`.env.example`](./.env.example):
   - `MODAL_ENDPOINT_URL` — production Modal web endpoint
   - `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` / `NEXT_PUBLIC_POSTHOG_HOST` — analytics (optional)
   - `NEXT_PUBLIC_GITHUB_REPO_URL` — footer link (optional)
4. Deploy. Vercel runs `npm install` and `npm run build` per `vercel.json`.

## Deploy Modal

From `modal/`:

```bash
modal deploy app.py
```

After deploy, copy the permanent web endpoint URL into Vercel's `MODAL_ENDPOINT_URL` (and your local `.env` for parity).

Modal credentials (`MODAL_TOKEN_ID`, `MODAL_TOKEN_SECRET`) are used at deploy time via the Modal CLI or CI secrets—never commit them.

## Marketplace integrations

### Modal (Vercel Marketplace)

Install the [Modal integration](https://vercel.com/integrations/modal) on your Vercel project. It can inject `MODAL_TOKEN_ID`, `MODAL_TOKEN_SECRET`, and related values into preview/production environments so CI and server-side routes can call Modal without manual secret wiring.

### PostHog (Vercel Marketplace)

Install the [PostHog integration](https://vercel.com/integrations/posthog) to auto-provision:

- `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`
- `NEXT_PUBLIC_POSTHOG_HOST`

The web app uses these for anonymous usage analytics (page views, generation events). See [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md) for attribution.

## Environment variables

| Variable | Where | Description |
|---|---|---|
| `MODAL_TOKEN_ID` | Modal CLI / Vercel | Modal API token ID |
| `MODAL_TOKEN_SECRET` | Modal CLI / Vercel | Modal API token secret |
| `MODAL_ENDPOINT_URL` | Web | HTTP endpoint for text generation |
| `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN` | Web | PostHog project API key |
| `NEXT_PUBLIC_POSTHOG_HOST` | Web | PostHog ingest host (default `https://us.i.posthog.com`) |
| `NEXT_PUBLIC_GITHUB_REPO_URL` | Web | Public repo URL for footer link |

See [`.env.example`](./.env.example) for a starter template.

## Project layout

```
old-ai-model-research/
├── web/                    # Next.js museum frontend
├── modal/                  # Modal inference service
├── crime-and-punishment.py # Local generation script
├── DESIGN.md               # xAI-inspired design reference
├── requirements.txt        # Python deps for local/Modal work
├── vercel.json             # Vercel build config
└── .env.example            # Shared env template
```

## Contributing

See [`CONTRIBUTING.md`](./CONTRIBUTING.md) for clone/setup details, code conventions, and how to add i18n translations.

## License

This project is licensed under the **GNU General Public License v3.0**. See [`LICENSE`](./LICENSE).

Third-party models, libraries, and design references are listed in [`THIRD_PARTY_NOTICES.md`](./THIRD_PARTY_NOTICES.md).

## Credits

**Author:** [jseramn](https://github.com/jseramn)

**Model & research:** Google Research — Reformer architecture and `google/reformer-crime-and-punishment` checkpoint ([Hugging Face](https://huggingface.co/google/reformer-crime-and-punishment))

**Source text:** *Crime and Punishment* by Fyodor Dostoevsky (public domain)

**Design reference:** UI tokens and patterns documented in [`DESIGN.md`](./DESIGN.md) are derived from publicly observable xAI marketing-site patterns; Universal Sans is proprietary and substituted with Inter/Geist in implementation.