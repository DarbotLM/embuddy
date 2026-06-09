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

function HomepageIntro() {
  return (
    <section className={styles.intro}>
      <div className="container">
        <p className={styles.introLead}>
          EmBuddy turns the unstructured text of a system — source code,
          documentation, design notes, and decision records — into cached
          embeddings you can search by meaning, project into spatial maps, and
          feed into knowledge graphs. It is the embedding layer beneath
          architecture intelligence: a small, local-first foundation that makes
          a codebase legible to both people and agents.
        </p>
      </div>
    </section>
  );
}

export default function Home() {
  const {siteConfig} = useDocusaurusContext();
  return (
    <Layout
      title={`${siteConfig.title} · The embedding framework for architecture intelligence`}
      description="EmBuddy is the embedding engine for architecture intelligence: turn a system's code, docs, and design artifacts into cached embeddings with approximate-nearest-neighbor search, UMAP projection, and knowledge-graph-ready output.">
      <HomepageHeader />
      <main>
        <HomepageIntro />
        <HomepageFeatures />
      </main>
    </Layout>
  );
}
