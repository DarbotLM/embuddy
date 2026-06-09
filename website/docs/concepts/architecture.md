---
id: architecture
title: Architecture
sidebar_label: Architecture
description: How EmBuddy is structured internally and how the pieces fit together.
---

EmBuddy is intentionally small. The entire public surface is one class and two exception types.

## Module layout

```
src/embuddy/
  __init__.py     # exports EmBuddy and __version__
  core.py         # the EmBuddy class + helper functions
  errors.py       # IndexNotBuiltError, NNDescentHyperplaneError
```

- **`core.py`** holds the `EmBuddy` class and two private helpers,
  `_build_nndescent_kwargs_dict` and `_build_umap_kwargs_dict`, which merge user-supplied
  options over sensible defaults.
- **`errors.py`** defines the two exceptions EmBuddy can raise.
- **`__init__.py`** re-exports `EmBuddy` and the package version.

## State held on an instance

An `EmBuddy` object is a container for four pieces of state plus the model:

| Attribute | Type | Description |
| --- | --- | --- |
| `model` | `SentenceTransformer` | The embedding model |
| `model_name` | `str` | The model identifier (persisted on save) |
| `doc_cache` | `list[str]` | Documents seen so far |
| `embedding_cache` | `np.ndarray` | Their embeddings, one row per document |
| `ann` | `NNDescent \| None` | The ANN index, once built |
| `umap_embeddings` | `np.ndarray \| None` | 2D projection, once built |

A private `_last_built_len` records how many documents were in the cache when the ANN index was
last built; this drives the [staleness warning](../guides/nearest-neighbors.md#keeping-the-index-fresh).

## Data flow

```
text --embed()--> embedding_cache (+ doc_cache)
                        |
                        +-- build_ann_index() --> ann --nearest_neighbors()-------> results
                        |                              \-- nearest_neighbors_vector()
                        |
                        +-- build_umap() --------> umap_embeddings
                        |
                        \-- save() / load() -----> on-disk .emb directory
```

The cache is the hub: embedding fills it, and the ANN index and UMAP projection are both derived
from it. Search and projection are snapshots taken at build time, which is why growing the cache
afterward requires a rebuild to stay current.

## Dependencies, by responsibility

| Responsibility | Library |
| --- | --- |
| Encoding text to vectors | `sentence-transformers` |
| Approximate-nearest-neighbor search | `pynndescent` |
| Dimensionality reduction | `umap-learn` |
| JIT acceleration | `numba` |
| Array storage | `numpy` |
| Compressed persistence | `zarr`, `joblib`, `joblib-zstd` |

## Design philosophy

- **Thin layer, not a framework.** EmBuddy adds caching, search, and projection on top of
  SentenceTransformers without hiding it.
- **Local-first.** No network calls beyond the initial model download.
- **One object, full lifecycle.** Embed, search, project, and persist from a single instance.

## Related

- [Caching](./caching.md)
- [ANN and UMAP](./ann-and-umap.md)
- [API Reference](../api/embuddy.md)
