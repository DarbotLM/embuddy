---
id: umap
title: UMAP Projection
sidebar_label: UMAP Projection
description: Project high-dimensional embeddings to 2D with UMAP for visualization.
---

[`build_umap`](../api/embuddy.md#build_umap) projects your cached embeddings to two dimensions
using [UMAP](https://umap-learn.readthedocs.io/), which is handy for scatter plots, clustering,
or feeding a 3D visualization such as [3DKG](../integrations/3dkg.md).

## Basic usage

```python
from embuddy import EmBuddy

emb = EmBuddy("all-MiniLM-L6-v2")
emb.embed(my_documents)

coords = emb.build_umap()      # numpy array, shape (n_docs, 2)
```

The result is also stored on the object as `emb.umap_embeddings`, and is included when you
[save](./persistence.md) the EmBuddy instance.

## Defaults

`build_umap` uses UMAP defaults except that the metric is set to `cosine`, which matches the
geometry of most sentence embeddings:

| Key | Default | Meaning |
| --- | --- | --- |
| `n_neighbors` | `15` | Local neighborhood size |
| `n_components` | `2` | Output dimensionality |
| `metric` | `"cosine"` | Distance metric |
| `random_state` | `1234` | Reproducibility seed |
| `verbose` | `True` | Print progress |

## Customizing

Pass a dictionary of UMAP keyword arguments to override any default:

```python
coords = emb.build_umap({"n_neighbors": 30, "min_dist": 0.05})
```

To compute and store the projection without returning it:

```python
emb.build_umap(return_array=False)
projection = emb.umap_embeddings
```

## Plotting

`build_umap` returns a plain NumPy array, so it drops straight into any plotting library:

```python
import matplotlib.pyplot as plt

coords = emb.build_umap()
plt.scatter(coords[:, 0], coords[:, 1], s=5, alpha=0.5)
plt.title("EmBuddy UMAP projection")
plt.show()
```

## Persisting the projection

The UMAP coordinates are saved and reloaded with the rest of the EmBuddy state:

```python
emb.build_umap()
emb.save("corpus.emb")

reloaded = EmBuddy.load("corpus.emb")
reloaded.umap_embeddings        # the projection, restored
```

## Related

- [Persistence](./persistence.md)
- [3DKG integration](../integrations/3dkg.md)
- [`build_umap` API reference](../api/embuddy.md#build_umap)
