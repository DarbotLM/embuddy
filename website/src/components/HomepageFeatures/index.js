import clsx from 'clsx';
import Heading from '@theme/Heading';
import styles from './styles.module.css';

/* Inline stroke icons (currentColor, no emoji) */
const Icons = {
  layers: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <polygon points="12 3 21 8 12 13 3 8 12 3" />
      <polyline points="3 13 12 18 21 13" />
      <polyline points="3 18 12 23 21 18" opacity="0.55" />
    </svg>
  ),
  search: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="11" cy="11" r="7" />
      <line x1="16.5" y1="16.5" x2="21" y2="21" />
      <circle cx="11" cy="11" r="2.4" opacity="0.55" />
    </svg>
  ),
  projection: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" />
      <circle cx="8" cy="9" r="1.4" />
      <circle cx="15" cy="8" r="1.4" />
      <circle cx="13" cy="15" r="1.4" />
      <circle cx="9" cy="16" r="1.4" opacity="0.6" />
    </svg>
  ),
  graph: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="6" cy="6" r="2.4" />
      <circle cx="18" cy="7" r="2.4" />
      <circle cx="12" cy="17" r="2.4" />
      <line x1="7.8" y1="7.5" x2="10.4" y2="15.3" />
      <line x1="16.4" y1="8.7" x2="13.4" y2="15.4" />
      <line x1="8.2" y1="6.4" x2="15.6" y2="6.8" />
    </svg>
  ),
  persist: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M5 3h11l3 3v15H5z" />
      <path d="M8 3v5h7" />
      <rect x="8.5" y="13" width="7" height="5" rx="0.5" opacity="0.6" />
    </svg>
  ),
  shield: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.7" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M12 3l7 3v5c0 4.5-3 8-7 10-4-2-7-5.5-7-10V6z" />
      <path d="M9.2 12l2 2 3.6-3.8" opacity="0.7" />
    </svg>
  ),
};

const FeatureList = [
  {
    title: 'Embeddings as a System Lens',
    icon: Icons.layers,
    description: (
      <>
        Encode the artifacts of a system — source, docs, ADRs, tickets — into
        vectors. EmBuddy caches and deduplicates them, so reanalyzing a codebase
        never pays the encoder cost twice.
      </>
    ),
  },
  {
    title: 'Semantic Search Across the System',
    icon: Icons.search,
    description: (
      <>
        A PyNNDescent approximate-nearest-neighbor index finds related
        components, concepts, and decisions by meaning rather than keywords —
        the retrieval primitive behind architecture intelligence.
      </>
    ),
  },
  {
    title: 'Spatial Maps of Meaning',
    icon: Icons.projection,
    description: (
      <>
        Project high-dimensional embeddings to 2D with UMAP to surface clusters
        and structure — the shape of a knowledge base or codebase at a glance.
      </>
    ),
  },
  {
    title: 'Knowledge-Graph Ready',
    icon: Icons.graph,
    description: (
      <>
        Feed EmBuddy embeddings into{' '}
        <a href="/embuddy/docs/integrations/3dkg">3DKG</a> to build navigable
        architecture knowledge graphs, where similarity becomes spatial
        proximity in 3D.
      </>
    ),
  },
  {
    title: 'Portable Intelligence',
    icon: Icons.persist,
    description: (
      <>
        Persist the full state — vectors, ANN index, and UMAP projection — to a
        compressed directory and reload it later. Computed understanding travels
        with the project.
      </>
    ),
  },
  {
    title: 'Local-First and Model-Agnostic',
    icon: Icons.shield,
    description: (
      <>
        Any{' '}
        <a href="https://www.sbert.net/docs/pretrained_models.html">
          SentenceTransformers model
        </a>{' '}
        works out of the box, and everything runs on your hardware. No API keys,
        no data leaving the machine.
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
