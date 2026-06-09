---
id: 3dkg
title: 3DKG Integration
sidebar_label: 3DKG
description: Using EmBuddy as an embedding, ANN, and UMAP provider for the 3DKG knowledge-graph framework.
---

[3DKG](https://github.com/DarbotLM) (3D Knowledge Graph) is a framework that turns unstructured
text into interactive 3D knowledge graphs. EmBuddy is available there as an optional
**embedding / similarity provider**, contributing exactly the three things it does best:
cached embeddings, approximate-nearest-neighbor search, and UMAP projection.

## How it fits

3DKG already supports several embedding backends (Ollama, a SentenceTransformers service, and
NVIDIA's API). EmBuddy slots in alongside them as a provider that adds a server-side cache, an
ANN index, and a UMAP projection on top of SentenceTransformers.

```
3DKG pipeline --> EmBuddy service (HTTP) --> embeddings / ANN / UMAP
                       |
                       \-- wraps the EmBuddy Python package
```

## The EmBuddy service

3DKG ships a small Flask service that wraps the EmBuddy package and exposes it over HTTP. It is
launched with the optional vector-search profile and listens on port `8200`.

| Method | Path | Body | Returns |
| --- | --- | --- | --- |
| GET | `/health` | — | `{status, model, count}` |
| POST | `/embed` | `{texts, cache?}` | `{embeddings, model, dim}` |
| POST | `/embeddings` | `{input}` | `{data: [{embedding}], model}` (OpenAI-compatible) |
| POST | `/build_index` | `{n_neighbors?, metric?}` | `{status, count}` |
| POST | `/nearest_neighbors` | `{docs, k?}` | `{results: [[{index, doc, distance}]]}` |
| POST | `/umap` | `{n_neighbors?, min_dist?}` | `{embeddings}` |

The `/nearest_neighbors` endpoint queries one document at a time, which sidesteps the
multi-document limitation discussed on the [Roadmap](../roadmap.md).

## Selecting EmBuddy in 3DKG

EmBuddy can be chosen as the embeddings provider in three ways:

- **UI** — Settings &gt; Embeddings Provider &gt; *EmBuddy*.
- **Environment** — set `EMBEDDINGS_PROVIDER=embuddy` and `EMBUDDY_BASE_URL`.
- **Core JS pipeline** — pass an `embuddy` config:

```javascript
const pipeline = KG3D.pipeline({
  ollama:  { baseUrl: 'http://localhost:11434' },
  embuddy: { baseUrl: 'http://localhost:8200', model: 'microsoft/harrier-oss-v1-27b' },
});
await pipeline.process(text); // entity embeddings now come from EmBuddy
```

On the JavaScript side, an `EmBuddyClient` mirrors the Python API with `embed`, `embedBatch`,
`buildAnnIndex`, `nearestNeighbors`, and `buildUmap` methods.

## Why use EmBuddy with 3DKG?

- **Dedup + cache** — entity descriptions repeat across documents; EmBuddy embeds each unique
  string once.
- **ANN search** — find semantically related entities without a separate vector database.
- **UMAP** — a 2D projection that complements 3DKG's force-directed 3D layout.

:::note
This integration lives in the 3DKG repository. EmBuddy itself has no dependency on 3DKG — the
relationship is one-way, with 3DKG consuming EmBuddy.
:::
