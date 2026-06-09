---
id: embuddy
title: EmBuddy
sidebar_label: EmBuddy
description: Full API reference for the EmBuddy class.
---

The `EmBuddy` class is the entire public API. Import it from the package root:

```python
from embuddy import EmBuddy
```

## Constructor

```python
EmBuddy(model_name: str)
```

Creates a buddy backed by a SentenceTransformers model.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `model_name` | `str` | Any [SentenceTransformers model](https://www.sbert.net/docs/pretrained_models.html) identifier. |

**Example**

```python
emb = EmBuddy("all-MiniLM-L6-v2")
```

### Instance attributes

| Attribute | Type | Description |
| --- | --- | --- |
| `model_name` | `str` | The model identifier (persisted on save). |
| `model` | `SentenceTransformer` | The loaded embedding model. |
| `doc_cache` | `list[str]` | Documents embedded so far. |
| `embedding_cache` | `np.ndarray` | Their embeddings, one row per document. |
| `ann` | `NNDescent \| None` | The ANN index, once built. |
| `umap_embeddings` | `np.ndarray \| None` | 2D projection, once built. |

---

## embed {#embed}

```python
embed(
    docs: str | list[str],
    cache: bool = True,
    show_progress_bar: bool = True,
) -> np.ndarray
```

Embed one or more documents, returning a NumPy array with one row per input document.

**Parameters**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `docs` | `str \| list[str]` | — | A document or list of documents. A single string is wrapped into a one-element list. |
| `cache` | `bool` | `True` | When `True`, store and reuse embeddings (de-duplicating repeats). When `False`, encode without touching the cache. |
| `show_progress_bar` | `bool` | `True` | Show the SentenceTransformers progress bar. |

**Returns** — `np.ndarray` of shape `(len(docs), embedding_dim)`.

**Example**

```python
emb.embed("a single sentence")          # shape (1, dim)
emb.embed(["first", "second"])           # shape (2, dim)
emb.embed("transient query", cache=False)
```

See the [Embedding guide](../guides/embedding.md) and [Caching concept](../concepts/caching.md).

---

## __call__ {#call}

```python
emb(docs: str | list[str], cache: bool = True) -> np.ndarray
```

Shortcut for [`embed`](#embed). `emb(x)` is equivalent to `emb.embed(x)`.

```python
import numpy as np
np.array_equal(emb("hi"), emb.embed("hi"))   # True
```

:::note
The callable shortcut does not currently forward `show_progress_bar`; use `embed` directly if
you need to control it. See the [Roadmap](../roadmap.md).
:::

---

## build_ann_index {#build_ann_index}

```python
build_ann_index(nndescent_kwargs: dict | None = None) -> None
```

Build the PyNNDescent approximate-nearest-neighbor index over all cached embeddings. Call this
before any search.

**Parameters**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `nndescent_kwargs` | `dict \| None` | `None` | Options merged over the defaults below and forwarded to `NNDescent`. |

**Defaults**

```python
{"compressed": True, "n_neighbors": 30, "random_state": 1234, "metric": "cosine"}
```

If the cache has fewer than 60 documents, `n_neighbors` is automatically reduced to `10`.

**Raises** — [`NNDescentHyperplaneError`](./errors.md) when the data is too small or degenerate
for PyNNDescent to build a graph.

**Example**

```python
emb.build_ann_index()
emb.build_ann_index({"metric": "euclidean", "n_neighbors": 50})
```

See [ANN and UMAP internals](../concepts/ann-and-umap.md).

---

## nearest_neighbors {#nearest_neighbors}

```python
nearest_neighbors(
    docs: str | list[str],
    k: int = 10,
) -> list[list[tuple[int, str, float]]]
```

Find the `k` most similar cached documents to a query string.

**Parameters**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `docs` | `str \| list[str]` | — | The query. Pass a single string (the well-tested path). |
| `k` | `int` | `10` | Number of neighbors to return. |

**Returns** — a list with one entry per query. Each entry is a list of
`(index, document, distance)` tuples sorted nearest-first, where `index` is the position in
`doc_cache`.

**Raises** — [`IndexNotBuiltError`](./errors.md) if [`build_ann_index`](#build_ann_index) has not
been called. Emits a `UserWarning` if the cache has grown since the index was built.

**Example**

```python
emb.nearest_neighbors("I made pudding.", k=5)
```

:::warning
Passing a list of multiple query strings currently has a known bug. Query one string at a time
until it is fixed — see the [Roadmap](../roadmap.md).
:::

See the [Nearest Neighbors guide](../guides/nearest-neighbors.md).

---

## nearest_neighbors_vector {#nearest_neighbors_vector}

```python
nearest_neighbors_vector(
    query_vector: np.ndarray,
    k: int = 10,
) -> list[list[tuple[int, str, float]]]
```

Find the `k` most similar cached documents to an arbitrary vector — for example a mean vector
over a group of documents.

**Parameters**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `query_vector` | `np.ndarray` | — | A single query vector (1D, or a single-row 2D array). |
| `k` | `int` | `10` | Number of neighbors to return. |

**Returns** — same shape as [`nearest_neighbors`](#nearest_neighbors): a list with one entry
holding `(index, document, distance)` tuples sorted nearest-first.

**Raises** — [`IndexNotBuiltError`](./errors.md) if the index has not been built. Emits a
`UserWarning` if the cache is stale relative to the index.

**Example**

```python
mean_vector = emb(group_of_docs, cache=False).mean(axis=0)
emb.nearest_neighbors_vector(mean_vector, k=100)
```

See [Search by vector](../guides/search-by-vector.md).

---

## build_umap {#build_umap}

```python
build_umap(
    umap_kwargs: dict | None = None,
    return_array: bool = True,
) -> np.ndarray | None
```

Project the cached embeddings to 2D with UMAP and store the result on `umap_embeddings`.

**Parameters**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `umap_kwargs` | `dict \| None` | `None` | Options merged over the defaults below and forwarded to `UMAP`. |
| `return_array` | `bool` | `True` | Return the projection array. When `False`, returns `None` and only stores it on the instance. |

**Defaults**

```python
{"n_neighbors": 15, "n_components": 2, "random_state": 1234, "metric": "cosine", "verbose": True}
```

**Returns** — `np.ndarray` of shape `(n_docs, 2)` (or `None` when `return_array=False`).

**Example**

```python
coords = emb.build_umap()
emb.build_umap({"min_dist": 0.05}, return_array=False)
```

See the [UMAP guide](../guides/umap.md).

---

## save {#save}

```python
save(path: str | Path, overwrite: bool = True) -> zarr.Group
```

Serialize the full EmBuddy state to a directory.

**Parameters**

| Name | Type | Default | Description |
| --- | --- | --- | --- |
| `path` | `str \| Path` | — | Destination directory. |
| `overwrite` | `bool` | `True` | Overwrite an existing directory. |

**Returns** — the `zarr.Group` that was written.

**What is written**

| Artifact | When |
| --- | --- |
| `embeddings`, `docs` arrays | always |
| `model_name` attribute | always |
| `umap_embeddings` array | if [`build_umap`](#build_umap) has run |
| `ann_index.zstd` | if [`build_ann_index`](#build_ann_index) has run |

**Example**

```python
emb.save("my_corpus.emb")
```

---

## load {#load}

```python
@classmethod
load(path: str | Path) -> "EmBuddy"
```

Reconstruct an `EmBuddy` instance from a directory written by [`save`](#save). The model is
recreated from the stored `model_name`.

**Parameters**

| Name | Type | Description |
| --- | --- | --- |
| `path` | `str \| Path` | A directory previously produced by `save`. |

**Returns** — a restored `EmBuddy` instance, including the ANN index and UMAP coordinates if they
were saved.

**Example**

```python
emb = EmBuddy.load("my_corpus.emb")
```

:::warning Security
`load` restores the ANN index with `joblib.load`, which deserializes a Python pickle. Only load
directories from sources you trust. See [Persistence](../guides/persistence.md#security).
:::

---

## Errors {#errors}

`EmBuddy` raises two custom exceptions, documented on the [Errors](./errors.md) page:

- [`IndexNotBuiltError`](./errors.md#indexnotbuilterror) — searching before building the index.
- [`NNDescentHyperplaneError`](./errors.md#nndescenthyperplaneerror) — the data is too small or
  degenerate to build an ANN index.
