import styles from './RepoList.module.css';

const LANGUAGE_COLORS = {
  JavaScript: '#f1e05a',
  TypeScript: '#3178c6',
  Python:     '#3572A5',
  Rust:       '#dea584',
  Go:         '#00ADD8',
  Java:       '#b07219',
  'C++':      '#f34b7d',
  C:          '#555555',
  Ruby:       '#701516',
  PHP:        '#4F5D95',
  Swift:      '#F05138',
  Kotlin:     '#A97BFF',
  Shell:      '#89e051',
  HTML:       '#e34c26',
  CSS:        '#563d7c',
  Vue:        '#41b883',
  Svelte:     '#ff3e00',
  Dart:       '#00B4AB',
};

function LanguageDot({ lang }) {
  const color = LANGUAGE_COLORS[lang] || '#8b949e';
  return (
    <span className={styles.lang}>
      <span className={styles.langDot} style={{ background: color }} aria-hidden="true" />
      {lang}
    </span>
  );
}

function RepoCard({ repo, index }) {
  const updatedDate = new Date(repo.updated_at).toLocaleDateString('en-US', {
    year: 'numeric', month: 'short', day: 'numeric',
  });

  return (
    <a
      href={repo.html_url}
      target="_blank"
      rel="noopener noreferrer"
      className={styles.repoCard}
      style={{ animationDelay: `${index * 0.04}s` }}
      aria-label={`Repository: ${repo.name}`}
    >
      <div className={styles.repoTop}>
        <svg className={styles.repoIcon} width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
        </svg>
        <h3 className={styles.repoName}>{repo.name}</h3>
        {repo.fork && <span className={styles.forkBadge}>fork</span>}
        {repo.archived && <span className={styles.archiveBadge}>archived</span>}
        {repo.private ? (
          <span className={styles.privateBadge}>private</span>
        ) : (
          <span className={styles.publicBadge}>public</span>
        )}
        <svg className={styles.externalIcon} width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
          <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6"/><polyline points="15 3 21 3 21 9"/><line x1="10" y1="14" x2="21" y2="3"/>
        </svg>
      </div>

      {repo.description && (
        <p className={styles.repoDesc}>{repo.description}</p>
      )}

      <div className={styles.repoMeta}>
        {repo.language && <LanguageDot lang={repo.language} />}
        {repo.stargazers_count > 0 && (
          <span className={styles.metaItem}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"/>
            </svg>
            {repo.stargazers_count.toLocaleString()}
          </span>
        )}
        {repo.forks_count > 0 && (
          <span className={styles.metaItem}>
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <line x1="6" y1="3" x2="6" y2="15"/><circle cx="18" cy="6" r="3"/><circle cx="6" cy="18" r="3"/><circle cx="6" cy="6" r="3"/><path d="M18 9a9 9 0 0 1-9 9"/>
            </svg>
            {repo.forks_count.toLocaleString()}
          </span>
        )}
        <span className={styles.metaItem} style={{ marginLeft: 'auto' }}>
          Updated {updatedDate}
        </span>
      </div>
    </a>
  );
}

export default function RepoList({ repos }) {
  if (!repos.length) {
    return (
      <div className={styles.empty}>
        <p>No public repositories found.</p>
      </div>
    );
  }

  return (
    <section className={styles.section}>
      <div className={styles.sectionHeader}>
        <h2 className={styles.sectionTitle}>
          <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22"/>
          </svg>
          Repositories
        </h2>
        <span className={styles.repoCount}>{repos.length}</span>
      </div>
      <div className={styles.grid}>
        {repos.map((repo, i) => (
          <RepoCard key={repo.id} repo={repo} index={i} />
        ))}
      </div>
    </section>
  );
}
