---
id: changelog
title: Changelog
sidebar_label: Changelog
description: Notable changes to EmBuddy.
---

This page summarizes notable changes. For the authoritative history, see the
[commit log](https://github.com/DarbotLM/embuddy/commits/main) and
[issues](https://github.com/DarbotLM/embuddy/issues) on GitHub.

## Unreleased

- Added this Docusaurus documentation site, published to GitHub Pages.
- Catalogued known issues and planned improvements on the [Roadmap](./roadmap.md).
- Corrected the repository description to describe EmBuddy as an embeddings library.

## 0.1.x

The initial public surface of EmBuddy:

- `EmBuddy` class with:
  - [`embed`](./api/embuddy.md#embed) — cached embedding of documents.
  - [`build_ann_index`](./api/embuddy.md#build_ann_index) — PyNNDescent ANN index.
  - [`nearest_neighbors`](./api/embuddy.md#nearest_neighbors) and
    [`nearest_neighbors_vector`](./api/embuddy.md#nearest_neighbors_vector) — semantic search by
    text or vector.
  - [`build_umap`](./api/embuddy.md#build_umap) — 2D UMAP projection.
  - [`save`](./api/embuddy.md#save) / [`load`](./api/embuddy.md#load) — persistence via `zarr`
    and `joblib` + `zstd`.
- Custom exceptions: [`IndexNotBuiltError`](./api/errors.md#indexnotbuilterror) and
  [`NNDescentHyperplaneError`](./api/errors.md#nndescenthyperplaneerror).

:::note Versioning
EmBuddy is pre-1.0 and the API may change. See the [Roadmap](./roadmap.md) for the direction of
upcoming work, including a known version-string inconsistency
([#2](https://github.com/DarbotLM/embuddy/issues/2)).
:::
