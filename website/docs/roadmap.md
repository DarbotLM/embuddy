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
Use **Python 3.14** and only [`load`](./api/embuddy.md#load) **trusted** artifacts.
Version 0.2 supports both single and batched text/vector nearest-neighbor queries.
Everything else in the [Quickstart](./quickstart.md) works as documented.
:::

## High priority

| Issue | Area | Summary | Workaround |
| --- | --- | --- | --- |
| [#23](https://github.com/DarbotLM/embuddy/issues/23) | Security | [`load`](./api/embuddy.md#load) deserializes a pickle via `joblib` (code-execution risk). | Only load artifacts you produced or trust. |

## Medium priority

| Issue | Area | Summary |
| --- | --- | --- |
| [#7](https://github.com/DarbotLM/embuddy/issues/7) | Performance | `embed` cache uses list lookups and `np.append`, giving quadratic-time growth. |
| [#9](https://github.com/DarbotLM/embuddy/issues/9) | Architecture | Tests and docs import via `src.embuddy` rather than the installed package path. |
| [#17](https://github.com/DarbotLM/embuddy/issues/17) | Testing | No test covers multi-document nearest-neighbor queries. |
| [#18](https://github.com/DarbotLM/embuddy/issues/18) | Testing | `pytest.ini` globally ignores `UserWarning` and `DeprecationWarning`. |
| [#21](https://github.com/DarbotLM/embuddy/issues/21) | Docs | The original usage docs import `from src.embuddy import ...`. |

## Low priority

| Issue | Area | Summary |
| --- | --- | --- |
| [#5](https://github.com/DarbotLM/embuddy/issues/5) | Correctness | `__call__` does not forward `show_progress_bar`. |
| [#6](https://github.com/DarbotLM/embuddy/issues/6) | Correctness | Inner loop variable shadows the `enumerate` target in the search methods. |
| [#10](https://github.com/DarbotLM/embuddy/issues/10) | Architecture | The caches are not thread-safe. |
| [#14](https://github.com/DarbotLM/embuddy/issues/14) | Packaging | No CI workflow for tests, lint, or type-checking. |
| [#15](https://github.com/DarbotLM/embuddy/issues/15) | Packaging | Not yet published to PyPI. |
| [#19](https://github.com/DarbotLM/embuddy/issues/19) | Testing | `pytest-cov` is present but no coverage threshold is enforced. |
| [#20](https://github.com/DarbotLM/embuddy/issues/20) | Testing | Missing tests for `save(overwrite=False)` and the UMAP load type. |
| [#22](https://github.com/DarbotLM/embuddy/issues/22) | Docs | A smart-quote typo in the original usage docs. |
| [#24](https://github.com/DarbotLM/embuddy/issues/24) | Security | `load` can trigger a network model download from an untrusted artifact. |

## Recently resolved

- Version 0.2 resolves the Python/runtime, dependency-group, and version consistency
  items (#2, #11, #12, #13), migrates persistence to Zarr 3, materializes loaded
  UMAP arrays (#4), preserves batched query dimensions (#1, #3), and initializes
  embedding caches as float32 (#8).

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
