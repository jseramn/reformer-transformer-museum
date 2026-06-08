# Contributing

Thank you for helping improve the Reformer Museum mini-app. This guide covers setup, conventions, and how to add translations.

## Getting started

### Fork and clone

```bash
git clone https://github.com/jseramn/reformer-transformer-museum.git
cd reformer-transformer-museum
git remote add upstream https://github.com/jseramn/reformer-transformer-museum.git
cp .env.example .env
```

### Prerequisites

| Tool | Version | Used for |
|---|---|---|
| Node.js | 18+ | `web/` Next.js app |
| npm or pnpm | latest stable | `web/` package management |
| Python | 3.10+ | `modal/` and local scripts |
| Modal CLI | latest | `pip install modal` |
| Git | 2.x | version control |

## Local development

### Web frontend (`web/`)

```bash
cd web
npm install
cp ../.env.example .env.local
npm run dev
```

- App runs at [http://localhost:3000](http://localhost:3000).
- Follow [`DESIGN.md`](./DESIGN.md) for colors, typography, and component patterns.
- Use outline pills, dark canvas (`#0a0a0a`), and Inter/Geist substitutes—do not introduce light mode.

### Modal backend (`modal/`)

**Authenticate once** (required before `modal serve`):

```bash
modal token new
```

If you see `Error: Token missing`, run the command above and complete login in the browser.

Or use tokens from Vercel Marketplace → Modal integration:

```bash
modal token set --token-id <ID> --token-secret <SECRET>
```

**Serve locally:**

```bash
cd modal
pip install modal transformers torch fastapi pydantic
modal serve app.py
```

Point `MODAL_ENDPOINT_URL` in `web/.env.local` at the URL printed by `modal serve`.

### Local Python script (optional)

For model-only experiments without the full stack:

```bash
python -m venv reformer
reformer\Scripts\activate          # Windows
# source reformer/bin/activate     # macOS/Linux
pip install -r requirements.txt
python crime-and-punishment.py
```

## Conventions

### Git workflow

1. Create a feature branch from `main` (or `master`): `git checkout -b feat/short-description`
2. Keep commits focused; use imperative subject lines (`Add Spanish locale`, `Fix Modal timeout`)
3. Open a pull request using the [PR template](.github/PULL_REQUEST_TEMPLATE.md)
4. Rebase or merge from upstream before requesting review

### TypeScript / React (`web/`)

- **Framework:** Next.js App Router conventions
- **Styling:** Follow tokens in `DESIGN.md`—CSS variables or Tailwind theme extensions, not ad-hoc hex values
- **Components:** Prefer server components unless client interactivity is required
- **Analytics:** Wrap PostHog calls in a small helper; never log prompt text containing PII
- **API calls:** Route generation through the configured `MODAL_ENDPOINT_URL`; do not embed Modal secrets in client bundles

### Python (`modal/`)

- **Style:** PEP 8, type hints on public functions
- **Dependencies:** Pin versions in `modal/requirements.txt` when adding packages
- **Model loading:** Cache the Hugging Face model in Modal `@app.cls` or `@stub.function` containers—avoid reloading per request
- **Secrets:** Use Modal secrets or environment variables; never hard-code tokens

### Documentation

- Update `README.md` when setup steps or env vars change
- Add third-party attributions to `THIRD_PARTY_NOTICES.md` when introducing new libraries or assets
- Keep `DESIGN.md` in sync when adding new UI primitives

### Testing before PR

- [ ] `npm run build` succeeds in `web/`
- [ ] `modal serve app.py` accepts a sample generation request
- [ ] No secrets in committed files (`.env`, tokens, PEM files are gitignored)
- [ ] New UI matches dark-canvas design system

## Adding i18n translations

The museum app supports multiple locales via JSON message files under `web/messages/` (or `web/locales/` depending on the active i18n setup).

### Supported pattern

We use **next-intl** (or equivalent) with locale-based routing:

```
web/
├── messages/
│   ├── en.json      # English (default)
│   ├── es.json      # Spanish
│   └── ...
└── i18n/
    └── config.ts    # locale list + default
```

### Steps to add a new locale

1. **Copy the base file**
   ```bash
   cp web/messages/en.json web/messages/<locale>.json
   ```
   Use a [BCP 47](https://www.rfc-editor.org/rfc/rfc5646) language tag (e.g. `es`, `fr`, `de`, `ja`).

2. **Translate all keys** — Keep JSON keys identical; translate only string values. Do not rename keys used in components.

3. **Register the locale** — Add the tag to the `locales` array in `web/i18n/config.ts` (or `web/middleware.ts` locale matcher):
   ```ts
   export const locales = ['en', 'es', '<your-locale>'] as const;
   ```

4. **Add a language switcher label** — Update the `languages.<code>` entry in every `messages/*.json` so the switcher displays the human-readable name.

5. **Verify routing** — Run `npm run dev` and visit `/<locale>/` (e.g. `/es/`). Confirm museum pages, buttons, and error strings render in the new language.

6. **RTL locales (optional)** — For Arabic (`ar`), Hebrew (`he`), etc., set `dir="rtl"` on the `<html>` element in the locale layout and mirror spacing where needed.

### Translation guidelines

- Preserve `{variable}` placeholders exactly (e.g. `"tokens": "{count} tokens"`)
- Keep museum tone: educational, concise, no marketing fluff
- Model names and paper titles stay in English; translate surrounding copy only
- Do not translate user-generated prompt placeholders in examples if they are quoted from the novel

### Submitting translations

- One locale per PR is preferred for easier review
- Mention the locale code in the PR title: `i18n: add Japanese (ja)`
- Native-speaker review is appreciated but not required for draft locales

## Questions

Open a GitHub issue for bugs, feature ideas, or translation coordination. For security concerns, avoid posting tokens or private endpoints in public issues.

## License

By contributing, you agree that your contributions will be licensed under the [GPL-3.0](./LICENSE) license.