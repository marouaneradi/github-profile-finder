import { useState, useCallback } from 'react';
import { fetchUser, fetchRepos } from '../utils/githubApi';

/**
 * Custom hook that manages GitHub user search state and async data fetching.
 */
export function useGithub() {
  const [user, setUser] = useState(null);
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const searchUser = useCallback(async (username) => {
    if (!username.trim()) return;

    setLoading(true);
    setError(null);
    setUser(null);
    setRepos([]);

    try {
      const [userData, reposData] = await Promise.all([
        fetchUser(username.trim()),
        fetchRepos(username.trim()),
      ]);

      setUser(userData);
      setRepos(reposData);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  }, []);

  const reset = useCallback(() => {
    setUser(null);
    setRepos([]);
    setError(null);
    setLoading(false);
  }, []);

  return { user, repos, loading, error, searchUser, reset };
}
