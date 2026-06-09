---
id: intro
title: Introduction
sidebar_label: Introduction
slug: /intro
description: EmBuddy is a Python package for using text embeddings for local data analysis — cached embeddings, approximate-nearest-neighbor search, and UMAP projection.
---

**EmBuddy** is a small, focused Python package that helps you use text embeddings for local
data analysis. It wraps [SentenceTransformers](https://www.sbert.net/) with three things you
almost always end up wanting:

- a **cache** so you never re-embed the same document twice,
- **approximate-nearest-neighbor (ANN) search** for fast semantic lookup, and
- a **UMAP** projection for 2D visualization.

Everything runs locally. There are no API keys and no external services.

## Why EmBuddy?

If you have used SentenceTransformers directly, you have probably written the same glue code
more than once: keep the embeddings around, build an index for similarity search, project them
to 2D for a plot, and save it all to disk so you do not have to recompute. EmBuddy packages
that glue into a single object.

```python
from embuddy import EmBuddy

emb = EmBuddy("all-MiniLM-L6-v2")

# Embed (and cache) some documents
embeddings = emb.embed(["I made pudding.", "I walked my dog."])

# Search semantically
emb.build_ann_index()
emb.nearest_neighbors("I baked a dessert.")

# Project to 2D
coords = emb.build_umap()

# Persist everything for later
emb.save("my_corpus.emb")
```

## What EmBuddy is (and is not)

EmBuddy **is**:

- a thin convenience layer over SentenceTransformers, PyNNDescent, and UMAP,
- local-first and dependency-light at the API surface (one class, two error types),
- a good fit for exploratory analysis, semantic search over a fixed corpus, and feeding
  visualizations such as [3DKG](./integrations/3dkg.md).

EmBuddy **is not**:

- a distributed vector database,
- an online/streaming index optimized for high-write workloads, or
- a managed service.

## The `EmBuddy` object at a glance

| Method | Purpose |
| --- | --- |
| [`embed`](./api/embuddy.md#embed) | Encode documents to vectors, with optional caching |
| [`build_ann_index`](./api/embuddy.md#build_ann_index) | Build the PyNNDescent ANN index over cached documents |
| [`nearest_neighbors`](./api/embuddy.md#nearest_neighbors) | Find the most similar cached documents to a query string |
| [`nearest_neighbors_vector`](./api/embuddy.md#nearest_neighbors_vector) | Find the most similar cached documents to a query vector |
| [`build_umap`](./api/embuddy.md#build_umap) | Project cached embeddings to 2D with UMAP |
| [`save`](./api/embuddy.md#save) / [`load`](./api/embuddy.md#load) | Persist and restore the full state to/from disk |

## Next steps

- [Install EmBuddy](./installation.md)
- [Follow the Quickstart](./quickstart.md)
- Browse the [API Reference](./api/embuddy.md)

:::note Project status
EmBuddy is an early-stage library (version `0.1.x`). A few known issues and planned
improvements are tracked on the [Roadmap](./roadmap.md) — worth a quick read before you rely on
the multi-document or persistence paths in production.
:::
