import { useState } from 'react';
import styles from './SearchBar.module.css';

export default function SearchBar({ onSearch, loading }) {
  const [value, setValue] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.trim()) onSearch(value.trim());
  };

  return (
    <form className={styles.form} onSubmit={handleSubmit} role="search">
      <div className={styles.inputWrapper}>
        <span className={styles.prompt} aria-hidden="true">$</span>
        <input
          className={styles.input}
          type="text"
          value={value}
          onChange={(e) => setValue(e.target.value)}
          placeholder="search-user --github"
          aria-label="Search GitHub username"
          disabled={loading}
          spellCheck="false"
          autoComplete="off"
          autoCorrect="off"
          autoCapitalize="off"
        />
      </div>
      <button
        className={styles.button}
        type="submit"
        disabled={loading || !value.trim()}
        aria-label="Search"
      >
        {loading ? (
          <span className={styles.spinner} aria-hidden="true" />
        ) : (
          <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
            <circle cx="11" cy="11" r="8"/>
            <path d="m21 21-4.35-4.35"/>
          </svg>
        )}
        <span className={styles.btnText}>{loading ? 'searching...' : 'run'}</span>
      </button>
    </form>
  );
}
