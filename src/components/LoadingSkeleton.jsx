import styles from './LoadingSkeleton.module.css';

function SkeletonBlock({ width, height, circle }) {
  return (
    <span
      className={styles.skeleton}
      style={{
        width: width || '100%',
        height: height || '16px',
        borderRadius: circle ? '50%' : '4px',
        display: 'block',
      }}
      aria-hidden="true"
    />
  );
}

export default function LoadingSkeleton() {
  return (
    <div className={styles.wrap} aria-label="Loading profile..." role="status">
      {/* Profile card skeleton */}
      <div className={styles.card}>
        <div className={styles.header}>
          <SkeletonBlock width="96px" height="96px" circle />
          <div className={styles.metaSkeleton}>
            <SkeletonBlock width="180px" height="24px" />
            <SkeletonBlock width="120px" height="14px" />
            <SkeletonBlock width="240px" height="14px" />
            <SkeletonBlock width="90px" height="12px" />
          </div>
        </div>
        <div className={styles.statsSkeleton}>
          {[1,2,3,4].map(i => (
            <div key={i} className={styles.statSkeleton}>
              <SkeletonBlock width="50px" height="20px" />
              <SkeletonBlock width="40px" height="10px" />
            </div>
          ))}
        </div>
      </div>

      {/* Repos skeleton */}
      <div className={styles.reposWrap}>
        <SkeletonBlock width="120px" height="20px" />
        <div className={styles.reposGrid}>
          {[1,2,3,4,5,6].map(i => (
            <div key={i} className={styles.repoSkeleton}>
              <SkeletonBlock width="140px" height="14px" />
              <SkeletonBlock width="100%" height="12px" />
              <SkeletonBlock width="80%" height="12px" />
              <SkeletonBlock width="70px" height="10px" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
