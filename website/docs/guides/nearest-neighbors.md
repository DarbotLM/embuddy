---
id: nearest-neighbors
title: Nearest Neighbors Search
sidebar_label: Nearest Neighbors
description: Build an ANN index and run semantic search over your cached documents.
---

EmBuddy uses [PyNNDescent](https://pynndescent.readthedocs.io/) to build an approximate-nearest-neighbor
(ANN) index over your cached embeddings. Once built, you can find the most similar documents to
any query.

## Build the index

You must build the index before searching. EmBuddy indexes whatever is currently in the cache:

```python
from embuddy import EmBuddy

emb = EmBuddy("all-MiniLM-L6-v2")
emb.embed(my_documents)        # populate the cache first
emb.build_ann_index()          # then build the index
```

If you have not called `build_ann_index`, searching raises
[`IndexNotBuiltError`](../api/embuddy.md#errors).

### Tuning the index

`build_ann_index` accepts a dictionary of keyword arguments forwarded to `NNDescent`. The
defaults are:

| Key | Default | Meaning |
| --- | --- | --- |
| `metric` | `"cosine"` | Distance metric |
| `n_neighbors` | `30` | Neighbors used to build the graph |
| `random_state` | `1234` | Reproducibility seed |
| `compressed` | `True` | Store a compact index |

```python
emb.build_ann_index({"metric": "euclidean", "n_neighbors": 50})
```

:::note Small corpora
For fewer than 60 cached documents, EmBuddy automatically lowers `n_neighbors` to `10`. With
very small or near-duplicate data, PyNNDescent may be unable to build a graph and EmBuddy
raises [`NNDescentHyperplaneError`](../api/embuddy.md#errors) — add more documents and rebuild.
:::

## Query by text

Pass a query string to [`nearest_neighbors`](../api/embuddy.md#nearest_neighbors):

```python
emb.nearest_neighbors("I made pudding.", k=5)
```

```python
[[(2132, 'I made delicious rice pudding', 0.182),
  (2237, 'I made a tasty chocolate pudding, and every one enjoyed it. ', 0.218),
  (3845, 'I ate delicious rice pudding', 0.269),
  (2601, 'I made a delicious meal.', 0.326),
  (800,  'I made a delicious breakfast.', 0.376)]]
```

The return value is a list with one entry per query. Each entry is a list of
`(index, document, distance)` tuples sorted nearest-first, where `index` is the position of the
document in `doc_cache`.

The query is embedded on the fly with `cache=False`, so querying does not pollute your cache.

### Custom metrics per query set

You can rebuild the index with a different metric at any time. For example, the
[`tsss`](https://pynndescent.readthedocs.io/) metric:

```python
emb.build_ann_index({"metric": "tsss", "n_neighbors": 5})
emb.nearest_neighbors("I walked my dog.")
```

## Keeping the index fresh

The index is a snapshot of the cache at build time. If you embed more documents afterward, the
new documents are **not** in the index. EmBuddy detects this and warns you:

```python
emb.build_ann_index()
emb.embed(more_documents)            # cache grew
emb.nearest_neighbors("query")       # UserWarning: index is stale
```

Rebuild to include the new documents:

```python
emb.build_ann_index()                # re-index the full cache
```

:::warning Multiple query strings
Passing a **list** of query strings to `nearest_neighbors` currently has a known bug and can
return incorrect results or raise an error. Until it is fixed (see the
[Roadmap](../roadmap.md)), query one string at a time:

```python
results = [emb.nearest_neighbors(q)[0] for q in queries]
```
:::

## Related

- [Search by vector](./search-by-vector.md)
- [ANN and UMAP internals](../concepts/ann-and-umap.md)
- [`nearest_neighbors` API reference](../api/embuddy.md#nearest_neighbors)
