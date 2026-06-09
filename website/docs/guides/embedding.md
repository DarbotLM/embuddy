---
id: embedding
title: Embedding Documents
sidebar_label: Embedding
description: How EmBuddy embeds and caches documents.
---

The [`embed`](../api/embuddy.md#embed) method turns text into vectors. It accepts a single
string or a list of strings and returns a NumPy array with one row per input document.

```python
from embuddy import EmBuddy

emb = EmBuddy("all-MiniLM-L6-v2")

vec = emb.embed("a single sentence")        # shape (1, dim)
mat = emb.embed(["first", "second"])         # shape (2, dim)
```

A single string is automatically wrapped into a one-element list, so the result always has a
leading document axis.

## Caching

By default (`cache=True`), EmBuddy remembers every document it has embedded. The cache has two
parts that stay in lock-step:

- `doc_cache` — the list of documents seen so far, and
- `embedding_cache` — the matrix of their embeddings.

When you call `embed`, EmBuddy only encodes documents it has not seen before; the rest are
served from the cache. Re-embedding the same corpus is therefore effectively free:

```python
emb.embed(["I made pudding."])              # encodes once
emb.embed(["I made pudding."])              # served from cache
len(emb.doc_cache)                            # 1
```

Duplicate inputs are de-duplicated, so embedding the same sentence a hundred times stores it
once:

```python
emb.embed(["I made pudding."] * 100)
emb.embedding_cache.shape[0]                  # 1
```

### Disabling the cache

Pass `cache=False` to encode without touching the cache. This is useful for one-off query
vectors you do not want to keep:

```python
query_vec = emb.embed("ephemeral query", cache=False)
len(emb.doc_cache)                            # unchanged
```

The callable shortcut `emb(...)` is equivalent to `emb.embed(...)`:

```python
import numpy as np
np.array_equal(emb("hi"), emb.embed("hi"))    # True
```

## Progress bar

`embed` shows a SentenceTransformers progress bar by default. Disable it for quiet runs or
notebooks:

```python
emb.embed(big_list, show_progress_bar=False)
```

:::tip Caching and large corpora
The cache makes repeated analysis cheap, but it grows in memory with your corpus. For very
large corpora, see the performance notes on the [Roadmap](../roadmap.md) regarding cache
lookup complexity.
:::

## Related

- [Caching internals](../concepts/caching.md)
- [`embed` API reference](../api/embuddy.md#embed)
