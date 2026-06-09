---
id: architecture-intelligence
title: Architecture Intelligence
sidebar_label: Architecture Intelligence
description: How EmBuddy's embedding primitives form the foundation for understanding a system's architecture.
---

**Architecture intelligence** is the practice of making a system understandable: relating its
code, documentation, and decisions so that both engineers and agents can reason about how the
whole thing fits together. EmBuddy is the embedding foundation for that practice.

## The problem with keyword tools

Most tooling reads a system literally. Grep finds a string; a file tree shows folders; a call
graph shows direct references. None of these capture *meaning* — that two modules address the
same domain, that an ADR explains a design choice realized three packages away, or that a ticket
describes the behavior a test enforces. Those relationships are semantic, and semantics is
exactly what embeddings encode.

## Embeddings as a relational substrate

When you embed an artifact, its meaning becomes a point in vector space. Related artifacts land
near each other, regardless of shared vocabulary. That single property unlocks the core
operations of architecture intelligence:

| Operation | EmBuddy primitive | Question it answers |
| --- | --- | --- |
| Semantic retrieval | [`nearest_neighbors`](../api/embuddy.md#nearest_neighbors) | "What else concerns this?" |
| Concept search by example | [`nearest_neighbors_vector`](../api/embuddy.md#nearest_neighbors_vector) | "What is near this idea or cluster?" |
| Structure discovery | [`build_umap`](../api/embuddy.md#build_umap) | "What is the shape of this system?" |
| Reuse of computed meaning | [`save`](../api/embuddy.md#save) / [`load`](../api/embuddy.md#load) | "Can I carry understanding forward?" |

## The pipeline

EmBuddy occupies the embedding stage. Graph construction and rendering belong to
[3DKG](../integrations/3dkg.md), which consumes EmBuddy's output:

```
system artifacts            EmBuddy                       3DKG
(code, docs, ADRs,    ->    embed + cache       ->    knowledge graph
 tickets, designs)          ANN search                3D spatial layout
                            UMAP projection           navigation (human + agent)
```

EmBuddy is deliberately scoped to the middle column. It does one thing — turn text into
searchable, projectable, persistable vectors — and does it in a way that composes cleanly with
the graph layer above it.

## Why a small framework

Architecture intelligence does not need a heavyweight platform at the embedding layer. It needs
a dependable substrate:

- **Deterministic** — the cache guarantees stable alignment between artifacts and vectors, so an
  index built today matches one rebuilt tomorrow.
- **Portable** — [persistence](../guides/persistence.md) lets computed understanding travel with
  a repository instead of being recomputed on every analysis.
- **Local-first** — no artifact leaves the machine, which matters when the corpus is a private
  codebase.
- **Composable** — a single object exposes embed, search, project, and persist, so higher layers
  (graphs, agents, dashboards) can build on it without ceremony.

## Where to go next

- See the [3DKG integration](../integrations/3dkg.md) for the graph and visualization layer.
- Read [Caching](./caching.md) and [ANN and UMAP](./ann-and-umap.md) for how the primitives work.
- Start hands-on with the [Quickstart](../quickstart.md).
