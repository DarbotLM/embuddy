---
id: caching
title: How Caching Works
sidebar_label: Caching
description: A closer look at EmBuddy's embedding cache — semantics, guarantees, and limits.
---

Caching is the feature that makes EmBuddy convenient for iterative analysis. This page explains
exactly what it does.

## Two arrays in lock-step

The cache is two attributes that always describe the same documents in the same order:

- `doc_cache: list[str]` — the documents, and
- `embedding_cache: np.ndarray` — their embeddings, one row per document.

The embedding for `doc_cache[i]` is `embedding_cache[i]`. Every cache update appends to both.

## What `embed(cache=True)` does

For each call, EmBuddy:

1. Normalizes a single string into a one-element list.
2. Determines which documents are **new** (not already in `doc_cache`), de-duplicating repeats
   within the call.
3. Encodes only the new documents with the model.
4. Appends the new documents and their embeddings to the cache.
5. Assembles the return array by reading each requested document's embedding — newly computed or
   previously cached.

The result is that:

- the same document is never encoded twice, and
- duplicate inputs collapse to a single cached entry.

```python
emb.embed(["a", "a", "b"])     # encodes "a" and "b" once each
len(emb.doc_cache)              # 2
```

## What `embed(cache=False)` does

With caching disabled, EmBuddy calls the model directly and returns the embeddings **without**
recording anything. This is the right choice for transient query vectors:

```python
q = emb.embed("one-off query", cache=False)
len(emb.doc_cache)             # unchanged
```

Internally, `nearest_neighbors` uses `cache=False` when embedding the query, so searching never
pollutes the cache.

## Guarantees and non-guarantees

**Guaranteed:**

- Deterministic alignment between `doc_cache` and `embedding_cache`.
- De-duplication of identical document strings.
- Cached embeddings are byte-for-byte the same as when first computed.

**Not guaranteed:**

- **Thread safety.** The cache is mutated in place without locks. Do not call `embed`
  concurrently on the same instance from multiple threads.
- **Constant-time lookup.** Membership and index lookups use Python list operations, so cost
  grows with cache size. For very large corpora this is a known performance limitation tracked
  on the [Roadmap](../roadmap.md).

## Persisting the cache

The cache is the core of what [`save`](../guides/persistence.md) writes to disk and what
[`load`](../guides/persistence.md) restores, so you can rebuild an EmBuddy instance without
re-encoding.

## Related

- [Embedding guide](../guides/embedding.md)
- [Architecture](./architecture.md)
- [Roadmap](../roadmap.md)
