---
id: errors
title: Errors
sidebar_label: Errors
description: The exception types EmBuddy can raise.
---

EmBuddy defines two custom exceptions in `embuddy.errors`. Import them when you want to handle
specific failure modes:

```python
from embuddy.errors import IndexNotBuiltError, NNDescentHyperplaneError
```

## IndexNotBuiltError {#indexnotbuilterror}

```python
class IndexNotBuiltError(ValueError, AttributeError)
```

Raised when you call [`nearest_neighbors`](./embuddy.md#nearest_neighbors) or
[`nearest_neighbors_vector`](./embuddy.md#nearest_neighbors_vector) before building the ANN
index.

It subclasses both `ValueError` and `AttributeError`, so existing `except` blocks for either
type will catch it.

**Fix** — call [`build_ann_index`](./embuddy.md#build_ann_index) first:

```python
from embuddy import EmBuddy
from embuddy.errors import IndexNotBuiltError

emb = EmBuddy("all-MiniLM-L6-v2")
emb.embed(my_documents)

try:
    emb.nearest_neighbors("query")
except IndexNotBuiltError:
    emb.build_ann_index()
    emb.nearest_neighbors("query")
```

## NNDescentHyperplaneError {#nndescenthyperplaneerror}

```python
class NNDescentHyperplaneError(Exception)
```

Raised by [`build_ann_index`](./embuddy.md#build_ann_index) when PyNNDescent cannot build its
neighbor graph. This usually means the dataset is too small or too uniform — PyNNDescent could
not find a separating hyperplane.

**Fix** — add more documents to the cache and rebuild:

```python
from embuddy.errors import NNDescentHyperplaneError

try:
    emb.build_ann_index()
except NNDescentHyperplaneError:
    emb.embed(more_documents)
    emb.build_ann_index()
```

See [ANN and UMAP internals](../concepts/ann-and-umap.md) for why this happens.
