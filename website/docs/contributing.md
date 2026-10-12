---
id: contributing
title: Contributing
sidebar_label: Contributing
description: How to set up a development environment and contribute to EmBuddy.
---

Contributions are welcome. EmBuddy is small, so it is easy to get started.

## Development setup

EmBuddy uses [Poetry 2](https://python-poetry.org/) and targets Python `>=3.14,<3.15`.

```bash
git clone https://github.com/DarbotLM/embuddy
cd embuddy
poetry env use python3.14
poetry install      # installs runtime + dev dependencies
```

## Running the tests

The suite uses `pytest` (with `Faker` for fixture text):

```bash
poetry run pytest
```

With coverage:

```bash
poetry run pytest --cov=embuddy --cov-report=term-missing
```

## Code style

The development dependencies include the formatting and linting tools the project uses:

```bash
black .          # format
isort .          # sort imports
flake8           # lint
mypy src         # type-check
```

## Building the docs site

This documentation site is a [Docusaurus](https://docusaurus.io/) app under `website/`:

```bash
cd website
npm install
npm run start      # local dev server with hot reload
npm run build      # production build into website/build
```

The site deploys automatically to GitHub Pages when changes under `website/` land on `main`.

## Submitting changes

1. Open or comment on an issue at
   [DarbotLM/embuddy/issues](https://github.com/DarbotLM/embuddy/issues) — the
   [Roadmap](./roadmap.md) lists good starting points.
2. Create a branch and make your change.
3. Add or update tests, and run the suite.
4. Open a pull request describing the change and linking the issue.

## Good first contributions

From the [Roadmap](./roadmap.md), several issues are self-contained and well-scoped — for
example storing `embedding_cache` as `float32`
([#8](https://github.com/DarbotLM/embuddy/issues/8)), forwarding `show_progress_bar` from
`__call__` ([#5](https://github.com/DarbotLM/embuddy/issues/5)), or adding a multi-document
nearest-neighbors test ([#17](https://github.com/DarbotLM/embuddy/issues/17)).
