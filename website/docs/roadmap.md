---
id: roadmap
title: Roadmap & Known Issues
sidebar_label: Roadmap
description: Known issues and planned improvements for EmBuddy, tracked as GitHub issues.
---

EmBuddy is an early-stage library. A code review catalogued a set of issues, each tracked on
GitHub at [DarbotLM/embuddy/issues](https://github.com/DarbotLM/embuddy/issues). This page
summarizes them so you know what to rely on today and what is coming.

:::tip TL;DR for users
For now: query [`nearest_neighbors`](./api/embuddy.md#nearest_neighbors) with **one string at a
time**, only [`load`](./api/embuddy.md#load) **trusted** artifacts, and use **Python 3.8–3.9**.
Everything else in the [Quickstart](./quickstart.md) works as documented.
:::

## High priority

| Issue | Area | Summary | Workaround |
| --- | --- | --- | --- |
| [#1](https://github.com/DarbotLM/embuddy/issues/1) | Correctness | `nearest_neighbors` returns wrong results / errors for **multiple** query strings (single string is fine). | Loop and query one string at a time. |
| [#11](https://github.com/DarbotLM/embuddy/issues/11) | Packaging | Python pinned to `>=3.8,<3.10`, excluding modern runtimes. | Use Python 3.8 or 3.9. |
| [#23](https://github.com/DarbotLM/embuddy/issues/23) | Security | [`load`](./api/embuddy.md#load) deserializes a pickle via `joblib` (code-execution risk). | Only load artifacts you produced or trust. |

## Medium priority

| Issue | Area | Summary |
| --- | --- | --- |
| [#2](https://github.com/DarbotLM/embuddy/issues/2) | Correctness | Version string is inconsistent across `pyproject.toml`, `__init__.py`, and tests. |
| [#3](https://github.com/DarbotLM/embuddy/issues/3) | Correctness | `nearest_neighbors_vector` documents "array of vectors" but supports one vector. |
| [#7](https://github.com/DarbotLM/embuddy/issues/7) | Performance | `embed` cache uses list lookups and `np.append`, giving quadratic-time growth. |
| [#9](https://github.com/DarbotLM/embuddy/issues/9) | Architecture | Tests and docs import via `src.embuddy` rather than the installed package path. |
| [#12](https://github.com/DarbotLM/embuddy/issues/12) | Packaging | Core dependencies are aged / over-pinned. |
| [#17](https://github.com/DarbotLM/embuddy/issues/17) | Testing | No test covers multi-document nearest-neighbor queries. |
| [#18](https://github.com/DarbotLM/embuddy/issues/18) | Testing | `pytest.ini` globally ignores `UserWarning` and `DeprecationWarning`. |
| [#21](https://github.com/DarbotLM/embuddy/issues/21) | Docs | The original usage docs import `from src.embuddy import ...`. |

## Low priority

| Issue | Area | Summary |
| --- | --- | --- |
| [#4](https://github.com/DarbotLM/embuddy/issues/4) | Correctness | `load` assigns a lazy `zarr` array to `umap_embeddings` instead of a materialized array. |
| [#5](https://github.com/DarbotLM/embuddy/issues/5) | Correctness | `__call__` does not forward `show_progress_bar`. |
| [#6](https://github.com/DarbotLM/embuddy/issues/6) | Correctness | Inner loop variable shadows the `enumerate` target in the search methods. |
| [#8](https://github.com/DarbotLM/embuddy/issues/8) | Performance | `embedding_cache` is stored as `float64` while the model emits `float32` (2x storage). |
| [#10](https://github.com/DarbotLM/embuddy/issues/10) | Architecture | The caches are not thread-safe. |
| [#13](https://github.com/DarbotLM/embuddy/issues/13) | Packaging | Uses the deprecated `[tool.poetry.dev-dependencies]` section. |
| [#14](https://github.com/DarbotLM/embuddy/issues/14) | Packaging | No CI workflow for tests, lint, or type-checking. |
| [#15](https://github.com/DarbotLM/embuddy/issues/15) | Packaging | Not yet published to PyPI. |
| [#19](https://github.com/DarbotLM/embuddy/issues/19) | Testing | `pytest-cov` is present but no coverage threshold is enforced. |
| [#20](https://github.com/DarbotLM/embuddy/issues/20) | Testing | Missing tests for `save(overwrite=False)` and the UMAP load type. |
| [#22](https://github.com/DarbotLM/embuddy/issues/22) | Docs | A smart-quote typo in the original usage docs. |
| [#24](https://github.com/DarbotLM/embuddy/issues/24) | Security | `load` can trigger a network model download from an untrusted artifact. |

## Recently resolved

- [#16](https://github.com/DarbotLM/embuddy/issues/16) — the repository description was corrected
  to describe EmBuddy as an embeddings library (it briefly read otherwise).

## Themes

The issues cluster into a few directions for the project:

- **Multi-query support** — make `nearest_neighbors` and `nearest_neighbors_vector` first-class
  for batches.
- **Performance** — replace list-based cache lookups with a dictionary index and store
  embeddings as `float32`.
- **Modernization** — widen the Python range, refresh dependencies, add CI, and publish to PyPI.
- **Safe persistence** — add integrity checks and trust controls around `load`.

Want to help? See [Contributing](./contributing.md).
