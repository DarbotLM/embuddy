---
id: search-by-vector
title: Search by Vector
sidebar_label: Search by Vector
description: Find similar documents to an arbitrary vector, including mean vectors over a set of documents.
---

Sometimes you want to search by a vector rather than a string — for example, to find documents
similar to a concept that does not exist as a single document, or to the **average** of a group
of documents. [`nearest_neighbors_vector`](../api/embuddy.md#nearest_neighbors_vector) does
exactly this.

## Mean-vector search

A common pattern: compute the mean embedding of every document matching some criterion, then
find what else is close to that centroid.

```python
from embuddy import EmBuddy

emb = EmBuddy("all-MiniLM-L6-v2")
emb.embed(df["cleaned_hm"].tolist())
emb.build_ann_index()

# Mean vector of all documents mentioning dogs
dog_docs = [doc for doc in df["cleaned_hm"].tolist() if "dog" in doc]
mean_dog_vector = emb(dog_docs, cache=False).mean(axis=0)

similar = emb.nearest_neighbors_vector(mean_dog_vector, k=100)

# Of those, which mention cats?
most_dog_like_cat_docs = [
    (ix, doc, sim) for (ix, doc, sim) in similar[0] if " cat " in doc
]
```

```python
[(2300, 'I played with my cat throughout the day.', 0.391),
 (3884, 'Went downstairs and cuddled with my cat on the couch watching TV.', 0.396)]
```

Note the use of `emb(dog_docs, cache=False)` — the callable shortcut with caching disabled, so
these query documents are not added to the cache.

## Return shape

Like `nearest_neighbors`, the result is a list with one entry per query, and each entry is a
list of `(index, document, distance)` tuples sorted nearest-first:

```python
results = emb.nearest_neighbors_vector(some_vector, k=10)
results[0][0]        # (index, document, distance) of the closest match
```

## Requirements and staleness

The same rules as text search apply:

- The ANN index must be built first, or [`IndexNotBuiltError`](../api/embuddy.md#errors) is raised.
- If the cache has grown since the index was built, EmBuddy emits a staleness `UserWarning`.
  Rebuild with `build_ann_index()` to include new documents.

:::note Single vector per call
`nearest_neighbors_vector` is designed and tested for a single query vector. Pass a 1D array
(or a single-row 2D array); the method reshapes it to one row internally. See the
[Roadmap](../roadmap.md) for planned multi-vector support.
:::

## Related

- [Nearest Neighbors](./nearest-neighbors.md)
- [`nearest_neighbors_vector` API reference](../api/embuddy.md#nearest_neighbors_vector)
