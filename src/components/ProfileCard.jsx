import styles from './ProfileCard.module.css';

const StatItem = ({ label, value }) => (
  <div className={styles.stat}>
    <span className={styles.statValue}>{value?.toLocaleString() ?? '—'}</span>
    <span className={styles.statLabel}>{label}</span>
  </div>
);

export default function ProfileCard({ user }) {
  const joinDate = new Date(user.created_at).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  });

  return (
    <article className={styles.card}>
      <div className={styles.header}>
        <div className={styles.avatarWrap}>
          <img
            className={styles.avatar}
            src={user.avatar_url}
            alt={`${user.login}'s avatar`}
            width={100}
            height={100}
          />
          <div className={styles.avatarBorder} aria-hidden="true" />
        </div>
        <div className={styles.meta}>
          <div className={styles.nameRow}>
            <h2 className={styles.name}>{user.name || user.login}</h2>
            {user.name && (
              <span className={styles.login}>
                <a
                  href={user.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{user.login}
                </a>
              </span>
            )}
          </div>
          {user.bio && <p className={styles.bio}>{user.bio}</p>}
          <p className={styles.joined}>Joined {joinDate}</p>
        </div>
      </div>

      <div className={styles.stats}>
        <StatItem label="repos" value={user.public_repos} />
        <StatItem label="followers" value={user.followers} />
        <StatItem label="following" value={user.following} />
        <StatItem label="gists" value={user.public_gists} />
      </div>

      <div className={styles.details}>
        {user.location && (
          <span className={styles.detail}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"/><circle cx="12" cy="10" r="3"/>
            </svg>
            {user.location}
          </span>
        )}
        {user.blog && (
          <span className={styles.detail}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M10 13a5 5 0 0 0 7.54.54l3-3a5 5 0 0 0-7.07-7.07l-1.72 1.71"/><path d="M14 11a5 5 0 0 0-7.54-.54l-3 3a5 5 0 0 0 7.07 7.07l1.71-1.71"/>
            </svg>
            <a href={user.blog.startsWith('http') ? user.blog : `https://${user.blog}`} target="_blank" rel="noopener noreferrer">
              {user.blog.replace(/^https?:\/\//, '')}
            </a>
          </span>
        )}
        {user.company && (
          <span className={styles.detail}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <rect x="2" y="7" width="20" height="14" rx="2" ry="2"/><path d="M16 21V5a2 2 0 0 0-2-2h-4a2 2 0 0 0-2 2v16"/>
            </svg>
            {user.company}
          </span>
        )}
        {user.twitter_username && (
          <span className={styles.detail}>
            <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
              <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/>
            </svg>
            <a href={`https://twitter.com/${user.twitter_username}`} target="_blank" rel="noopener noreferrer">
              @{user.twitter_username}
            </a>
          </span>
        )}
      </div>
    </article>
  );
}
