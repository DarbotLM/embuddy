---
id: ann-and-umap
title: ANN and UMAP Internals
sidebar_label: ANN and UMAP
description: How EmBuddy builds its approximate-nearest-neighbor index and UMAP projection.
---

EmBuddy derives two structures from the embedding cache: an approximate-nearest-neighbor (ANN)
index for search, and a UMAP projection for visualization. Both are snapshots of the cache at
build time.

## The ANN index

[`build_ann_index`](../api/embuddy.md#build_ann_index) constructs a
[PyNNDescent](https://pynndescent.readthedocs.io/) `NNDescent` index over the entire
`embedding_cache` and calls `.prepare()` so it is ready for queries.

### Defaults

EmBuddy merges your options over these defaults:

```python
{
    "compressed": True,
    "n_neighbors": 30,
    "random_state": 1234,
    "metric": "cosine",
}
```

### The small-data adjustment

If the cache holds fewer than 60 documents, EmBuddy lowers `n_neighbors` to `10`. PyNNDescent
needs enough points to construct its neighbor graph; with too few — or with near-duplicate
points that cannot be separated by a random hyperplane — it fails. EmBuddy catches that specific
failure and raises [`NNDescentHyperplaneError`](../api/embuddy.md#errors) with guidance to add
more data and rebuild.

### Querying

Both query methods:

1. Verify the index exists (else [`IndexNotBuiltError`](../api/embuddy.md#errors)).
2. Compare the current cache size to `_last_built_len` and emit a `UserWarning` if the cache has
   grown since the index was built.
3. Call `ann.query(...)` and map the returned indices back to documents from `doc_cache`,
   returning `(index, document, distance)` tuples sorted nearest-first.

[`nearest_neighbors`](../api/embuddy.md#nearest_neighbors) embeds the query text first;
[`nearest_neighbors_vector`](../api/embuddy.md#nearest_neighbors_vector) takes a vector directly.

## The UMAP projection

[`build_umap`](../api/embuddy.md#build_umap) fits a [UMAP](https://umap-learn.readthedocs.io/)
model on the full `embedding_cache` and stores the 2D result on `umap_embeddings`.

### Defaults

```python
{
    "n_neighbors": 15,
    "n_components": 2,
    "random_state": 1234,
    "metric": "cosine",
    "verbose": True,
}
```

The `cosine` metric matches the geometry of most sentence embeddings, which generally live on a
hypersphere where cosine distance is the natural choice.

## Snapshots, not live indexes

Neither structure updates automatically when you embed more documents. They reflect the cache as
it was when you built them. To incorporate new documents:

```python
emb.embed(new_documents)
emb.build_ann_index()      # rebuild to include them
emb.build_umap()           # reproject to include them
```

The staleness warning on the query methods exists precisely to catch the case where you forgot
to rebuild.

## Related

- [Nearest Neighbors guide](../guides/nearest-neighbors.md)
- [UMAP guide](../guides/umap.md)
- [Architecture](./architecture.md)
