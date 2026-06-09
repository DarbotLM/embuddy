---
id: quickstart
title: Quickstart
sidebar_label: Quickstart
description: A complete EmBuddy workflow in a few minutes — embed, search, project, and persist.
---

This walkthrough mirrors a typical analysis session using data from
[HappyDB](https://github.com/megagonlabs/HappyDB). By the end you will have embedded a corpus,
searched it semantically, projected it to 2D, and saved it to disk.

## 1. Load some text

```python
import pandas as pd
from embuddy import EmBuddy

df = pd.read_csv(
    "https://github.com/megagonlabs/HappyDB/raw/master/happydb/data/cleaned_hm.csv",
    nrows=5000,
    usecols=["hmid", "cleaned_hm"],
)

emb = EmBuddy("all-MiniLM-L6-v2")
```

## 2. Embed (and cache)

```python
embeddings = emb.embed(df["cleaned_hm"].tolist())
# do something with `embeddings` — features for ML, clustering, etc.
```

Run the same call again and it returns instantly — the documents are already cached:

```python
embeddings = emb.embed(df["cleaned_hm"].tolist())  # served from cache
```

See the [Embedding guide](./guides/embedding.md) for how the cache works.

## 3. Semantic search with ANN

Build the index once, then query it by text:

```python
emb.build_ann_index()
emb.nearest_neighbors("I made pudding.")
```

```python
[[(2132, 'I made delicious rice pudding', 0.182),
  (2237, 'I made a tasty chocolate pudding, and every one enjoyed it. ', 0.218),
  (3845, 'I ate delicious rice pudding', 0.269),
  (2601, 'I made a delicious meal.', 0.326),
  (800,  'I made a delicious breakfast.', 0.376)]]
```

Each result is a list of `(index, document, distance)` tuples, sorted nearest-first. See the
[Nearest Neighbors guide](./guides/nearest-neighbors.md).

## 4. Search by vector

You can also search by an arbitrary vector — for example the **mean** vector of every document
that mentions dogs:

```python
dog_docs = [doc for doc in df["cleaned_hm"].tolist() if "dog" in doc]
mean_dog_vector = emb(dog_docs, cache=False).mean(axis=0)
similar = emb.nearest_neighbors_vector(mean_dog_vector, k=100)
```

See [Search by vector](./guides/search-by-vector.md).

## 5. Project to 2D with UMAP

```python
coords = emb.build_umap()   # numpy array of shape (n_docs, 2)
```

See the [UMAP guide](./guides/umap.md).

## 6. Persist and reload

```python
emb.save("happydb.emb")

# later, in another process — no re-encoding required
reloaded = EmBuddy.load("happydb.emb")
reloaded.nearest_neighbors("I made even better pudding!")
```

See [Persistence](./guides/persistence.md).

## Full script

```python
import pandas as pd
from embuddy import EmBuddy

df = pd.read_csv(
    "https://github.com/megagonlabs/HappyDB/raw/master/happydb/data/cleaned_hm.csv",
    nrows=5000,
    usecols=["hmid", "cleaned_hm"],
)

emb = EmBuddy("all-MiniLM-L6-v2")
emb.embed(df["cleaned_hm"].tolist())

emb.build_ann_index()
print(emb.nearest_neighbors("I made pudding."))

coords = emb.build_umap()
emb.save("happydb.emb")
```

:::note Querying with a single string
The `nearest_neighbors` examples here pass a single query string, which is the well-tested path.
Passing a list of multiple query strings currently has a known bug — see the
[Roadmap](./roadmap.md). To query many strings today, loop and call once per string.
:::
