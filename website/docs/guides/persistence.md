---
id: persistence
title: Persistence
sidebar_label: Persistence
description: Save and reload EmBuddy state — embeddings, documents, ANN index, and UMAP coordinates.
---

EmBuddy can serialize its full state to a directory and reload it later, so you never have to
re-encode a corpus you have already processed.

## Saving

[`save`](../api/embuddy.md#save) writes a directory (not a single file) containing the
compressed embeddings and documents, plus the ANN index and UMAP coordinates if they exist:

```python
from embuddy import EmBuddy

emb = EmBuddy("all-MiniLM-L6-v2")
emb.embed(my_documents)
emb.build_ann_index()
emb.build_umap()

emb.save("my_corpus.emb")
```

What gets written:

| Artifact | Format | Written when |
| --- | --- | --- |
| `embeddings` | `zarr` array | always |
| `docs` | `zarr` array | always |
| `umap_embeddings` | `zarr` array | if `build_umap` has been run |
| `ann_index.zstd` | `joblib` + `zstd` | if `build_ann_index` has been run |
| `model_name` | `zarr` attribute | always |

The path can be a string or a `pathlib.Path`. By default `save` overwrites an existing
directory; pass `overwrite=False` to change that behavior.

## Loading

[`load`](../api/embuddy.md#load) is a classmethod that reconstructs an `EmBuddy` instance from a
saved directory:

```python
reloaded = EmBuddy.load("my_corpus.emb")

reloaded.nearest_neighbors("a query")     # ANN index restored
reloaded.umap_embeddings                   # UMAP coordinates restored
```

The original model name is stored in the saved directory, so `load` recreates the same
SentenceTransformer model automatically.

## Round-trip example

```python
import numpy as np

emb = EmBuddy("paraphrase-MiniLM-L3-v2")
emb.embed(["this is a sentence"])
emb.save("demo.emb")

reloaded = EmBuddy.load("demo.emb")
assert np.array_equal(emb.embedding_cache, reloaded.embedding_cache)
```

## Security {#security}

:::warning Only load trusted artifacts
The ANN index is restored with `joblib.load`, which deserializes a Python pickle. Loading a
`.emb` directory from an **untrusted** source can execute arbitrary code. Only call
`EmBuddy.load` on data you produced or otherwise trust. Loading also re-instantiates the saved
`model_name`, which may trigger a model download. See the [Roadmap](../roadmap.md) for hardening
plans.
:::

## Related

- [UMAP Projection](./umap.md)
- [`save` / `load` API reference](../api/embuddy.md#save)
