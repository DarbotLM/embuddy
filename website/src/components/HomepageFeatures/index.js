import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Cached Embeddings',
    icon: '⚡',
    description: (
      <>
        Embeddings are deduplicated and cached in memory. Re-embedding the same
        documents is instant, so you can iterate on analysis without paying the
        encoder cost twice.
      </>
    ),
  },
  {
    title: 'Approximate Nearest Neighbors',
    icon: '🔍',
    description: (
      <>
        Build a PyNNDescent ANN index over your corpus and run fast semantic
        search by text or by arbitrary vector — including mean vectors over a
        set of documents.
      </>
    ),
  },
  {
    title: 'UMAP Projection',
    icon: '🗺️',
    description: (
      <>
        Project high-dimensional embeddings to 2D with a single call, ready for
        plotting, clustering, or feeding a visualization such as 3DKG.
      </>
    ),
  },
  {
    title: 'Persistence Built In',
    icon: '💾',
    description: (
      <>
        Save embeddings, documents, the ANN index, and UMAP coordinates to a
        compressed directory with <code>zarr</code> and reload them later — no
        re-encoding required.
      </>
    ),
  },
  {
    title: 'SentenceTransformers Native',
    icon: '🤝',
    description: (
      <>
        Any{' '}
        <a href="https://www.sbert.net/docs/pretrained_models.html">
          SentenceTransformers model
        </a>{' '}
        works out of the box. EmBuddy stays out of the way and adds caching,
        search, and projection on top.
      </>
    ),
  },
  {
    title: 'Local-First',
    icon: '🔒',
    description: (
      <>
        Everything runs on your machine. No API keys, no external services — a
        small, focused library for local data analysis.
      </>
    ),
  },
];

function Feature({title, icon, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className={styles.featureCard}>
        <div className={styles.featureIcon}>{icon}</div>
        <Heading as="h3">{title}</Heading>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
