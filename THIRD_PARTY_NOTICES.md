# Third-Party Notices

This document lists attributions for models, source texts, research, dependencies, and design references used by the Reformer Museum project.

---

## AI model

### `google/reformer-crime-and-punishment`

- **Provider:** Google Research / Hugging Face Hub
- **URL:** https://huggingface.co/google/reformer-crime-and-punishment
- **Description:** Reformer language model (`ReformerModelWithLMHead`) fine-tuned on English text from Dostoevsky's *Crime and Punishment* (~0.5M tokens). Weights converted from the original Flax/Trax training notebook to PyTorch for use with Hugging Face Transformers.
- **Training reference:** https://colab.research.google.com/github/google/trax/blob/master/trax/models/reformer/text_generation.ipynb
- **Usage in this project:** Loaded at inference time via Modal (`modal/`) and locally via `crime-and-punishment.py`.
- **Notice:** Model card metadata on Hugging Face may not specify a separate license; use subject to Hugging Face Hub terms and the upstream Google Research release. This project does not redistribute model weights—users download them at runtime from Hugging Face.

---

## Source text

### *Crime and Punishment* (novel)

- **Author:** Fyodor Dostoevsky
- **Status:** Public domain (English translations widely available)
- **Project Gutenberg:** https://www.gutenberg.org/ebooks/2554
- **Training data note (per model card):** `gs://trax-ml/reformer/crime-and-punishment-2554.txt`
- **Notice:** The novel text is not bundled in this repository. The museum app references the work for educational context only.

---

## Research

### Reformer: The Efficient Transformer (2020)

- **Authors:** Nikita Kitaev, Łukasz Kaiser, Anselm Levskaya
- **Organization:** Google Research
- **Paper:** https://arxiv.org/abs/2001.04451
- **Blog:** https://research.google/blog/reformer-the-efficient-transformer/
- **BibTeX:**
  ```bibtex
  @article{kitaev2020reformer,
    title={Reformer: The Efficient Transformer},
    author={Kitaev, Nikita and Kaiser, {\L}ukasz and Levskaya, Anselm},
    journal={arXiv preprint arXiv:2001.04451},
    year={2020}
  }
  ```
- **Notice:** Architecture descriptions and museum copy cite this work for historical accuracy.

---

## Python dependencies

### PyTorch

- **License:** BSD-style (see https://github.com/pytorch/pytorch/blob/main/LICENSE)
- **URL:** https://pytorch.org/
- **Version (pinned):** See root `requirements.txt` / `modal/requirements.txt` (`torch==2.12.0` in local lockfile)

### Hugging Face Transformers

- **License:** Apache License 2.0
- **URL:** https://github.com/huggingface/transformers
- **Version (pinned):** `transformers==5.10.2` (see `requirements.txt`)

### Modal

- **License:** Proprietary SDK; subject to [Modal Terms of Service](https://modal.com/legal/terms-of-service)
- **URL:** https://modal.com/
- **Usage:** Serverless GPU/CPU containers for model inference (`modal/`)

### Other Python packages

Transitive dependencies (e.g. `numpy`, `huggingface_hub`, `safetensors`, `tokenizers`) are listed in `requirements.txt` with their respective upstream licenses. Run `pip-licenses` locally for a full bill of materials.

---

## JavaScript / TypeScript dependencies (`web/`)

### Next.js

- **License:** MIT
- **URL:** https://nextjs.org/
- **Copyright:** Vercel, Inc.

### React

- **License:** MIT
- **URL:** https://react.dev/
- **Copyright:** Meta Platforms, Inc.

### PostHog

- **License:** MIT (SDK); hosted service subject to [PostHog Terms](https://posthog.com/terms)
- **URL:** https://posthog.com/
- **Usage:** Anonymous product analytics via Vercel Marketplace integration (`NEXT_PUBLIC_POSTHOG_*` env vars)

### Other npm packages

See `web/package.json` and `web/package-lock.json` (or `pnpm-lock.yaml`) for the complete dependency tree and licenses. Typical UI utilities may include Tailwind CSS, next-intl, and font packages (Inter, Geist Mono)—each governed by its upstream license (commonly MIT or SIL OFL).

---

## Design reference

### `DESIGN.md` (xAI-inspired design system)

- **Source:** Publicly observable patterns from the xAI marketing website (layout, color tokens, typography hierarchy, pill-shaped controls).
- **Purpose:** Internal design reference for the museum frontend—not an official xAI asset pack.
- **Fonts:** `Universal Sans` is proprietary to xAI. This project documents open substitutes (**Inter**, **Geist**, **Geist Mono**, **JetBrains Mono**) per `DESIGN.md`.
- **Notice:** xAI, Universal Sans, and Grok are trademarks of their respective owners. This project is not affiliated with or endorsed by xAI. UI similarity is for educational/demo aesthetics only.

---

## Vercel marketplace integrations

| Integration | Purpose | Env vars |
|---|---|---|
| Modal | Inference deployment & API tokens | `MODAL_TOKEN_ID`, `MODAL_TOKEN_SECRET`, `MODAL_ENDPOINT_URL` |
| PostHog | Analytics | `NEXT_PUBLIC_POSTHOG_PROJECT_TOKEN`, `NEXT_PUBLIC_POSTHOG_HOST` |

Install via the [Vercel Integrations Marketplace](https://vercel.com/integrations). Credentials are injected by Vercel and must not be committed to git.

---

## How to report omissions

If you believe a third-party component is missing from this file, please open an issue or PR updating `THIRD_PARTY_NOTICES.md` with the package name, version, license, and URL.