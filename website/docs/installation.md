---
id: installation
title: Installation
sidebar_label: Installation
description: How to install EmBuddy and its dependencies.
---

## Requirements

EmBuddy targets **Python `>=3.8,<3.10`**. This constraint comes from the underlying numerical
stack (Numba/UMAP pins) and is tracked for relaxation on the [Roadmap](./roadmap.md).

Core runtime dependencies (installed automatically):

| Package | Role |
| --- | --- |
| `sentence-transformers` | Text embedding models |
| `pynndescent` | Approximate-nearest-neighbor index |
| `umap-learn` | 2D projection |
| `numba` | JIT acceleration for PyNNDescent/UMAP |
| `numpy` | Array storage |
| `zarr` | Compressed on-disk arrays |
| `joblib`, `joblib-zstd` | ANN index serialization with `zstd` compression |

## Install from GitHub

EmBuddy is not yet published to PyPI, so install it directly from the repository:

```bash
pip install git+https://github.com/DarbotLM/embuddy
```

To pin to a specific commit or tag:

```bash
pip install "git+https://github.com/DarbotLM/embuddy@main"
```

## Install for development

EmBuddy uses [Poetry](https://python-poetry.org/). Clone the repo and install all
dependencies, including the development tools:

```bash
git clone https://github.com/DarbotLM/embuddy
cd embuddy
poetry install
```

Then activate the environment:

```bash
poetry shell
```

## Verify the installation

```python
from embuddy import EmBuddy

emb = EmBuddy("paraphrase-MiniLM-L3-v2")  # small, fast model — good for a smoke test
print(emb.embed("hello world").shape)      # (1, 384)
```

The first run downloads the model from the SentenceTransformers hub; subsequent runs load it
from the local cache.

:::tip Choosing a model
EmBuddy supports any [SentenceTransformers pretrained model](https://www.sbert.net/docs/pretrained_models.html).
`all-MiniLM-L6-v2` is a strong general-purpose default; `paraphrase-MiniLM-L3-v2` is smaller and
faster for tests and CI.
:::
