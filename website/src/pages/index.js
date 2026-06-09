import clsx from 'clsx';
import Link from '@docusaurus/Link';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import Layout from '@theme/Layout';
import HomepageFeatures from '@site/src/components/HomepageFeatures';

import styles from './index.module.css';

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <header className={clsx('hero', styles.heroBanner)}>
      <div className="container">
        <h1>{siteConfig.title}</h1>
        <p className={styles.heroTagline}>{siteConfig.tagline}</p>
        <div className={styles.heroButtons}>
          <Link className="button button--secondary button--lg" to="/docs/intro">
            Get Started
          </Link>
          <Link className="button button--outline button--lg" to="/docs/quickstart">
            Quickstart
          </Link>
          <Link
            className="button button--outline button--lg"
            href="https://github.com/DarbotLM/embuddy">
            GitHub
          </Link>
        </div>
      </div>
    </header>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} · Text embeddings for local data analysis`}
      description="EmBuddy is a Python package for using text embeddings for local data analysis: cached embeddings, approximate-nearest-neighbor search, and UMAP projection.">
      <HomepageHeader />
      <main>
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
