# EmBuddy

EmBuddy is the embedding framework for **architecture intelligence**. It turns the unstructured
text of a system — code, docs, design notes, decision records — into cached embeddings you can
search by meaning, project into spatial maps, and feed into knowledge graphs. Cached embeddings,
approximate-nearest-neighbor search, and UMAP projection, all from a single object.

**Documentation:** https://darbotlm.github.io/embuddy/

## Installation

EmBuddy is not yet on PyPI. Install it directly from GitHub:

```bash
pip install git+https://github.com/DarbotLM/embuddy
```

EmBuddy targets Python `>=3.14,<3.15`, with current SentenceTransformers,
NumPy, Numba, and Zarr 3. Existing Zarr 2 stores remain readable; new stores
use Zarr 3. Load only trusted ANN index files because joblib uses pickle.

For development, use Poetry 2 with a Python 3.14 interpreter:

```bash
poetry env use python3.14
poetry install
poetry run pytest
```

## Quick example

```python
from embuddy import EmBuddy

emb = EmBuddy("all-MiniLM-L6-v2")

# Embed (and cache) documents
emb.embed(["I made pudding.", "I walked my dog."])

# Semantic search
emb.build_ann_index()
emb.nearest_neighbors("I baked a dessert.")

# Project to 2D
emb.build_umap()

# Persist everything for later
emb.save("my_corpus.emb")
```

See the [Quickstart](https://darbotlm.github.io/embuddy/docs/quickstart) for a complete
walkthrough, or the [API Reference](https://darbotlm.github.io/embuddy/docs/api/embuddy) for
full details.

## Documentation site

The docs are a [Docusaurus](https://docusaurus.io/) site under [`website/`](./website) and are
published to GitHub Pages automatically on push to `main`. To work on them locally:

```bash
cd website
npm install
npm run start      # dev server at http://localhost:3000/embuddy/
```

## Project status

EmBuddy is an early-stage library (`0.1.x`). Known issues and planned improvements are tracked
on the [Roadmap](https://darbotlm.github.io/embuddy/docs/roadmap) and in
[GitHub issues](https://github.com/DarbotLM/embuddy/issues).