const BASE_URL = 'https://api.github.com';

/**
 * Fetch a GitHub user profile by username.
 * @param {string} username
 * @returns {Promise<Object>} GitHub user object
 */
export async function fetchUser(username) {
  const response = await fetch(`${BASE_URL}/users/${username}`, {
    headers: { Accept: 'application/vnd.github+json' },
  });

  if (response.status === 404) {
    throw new Error(`User "${username}" not found.`);
  }
  if (response.status === 403) {
    throw new Error('GitHub API rate limit exceeded. Please wait and try again.');
  }
  if (!response.ok) {
    throw new Error(`GitHub API error: ${response.status} ${response.statusText}`);
  }

  return response.json();
}

/**
 * Fetch public repositories for a GitHub user.
 * @param {string} username
 * @param {number} perPage - results per page (max 100)
 * @returns {Promise<Array>} array of repo objects
 */
export async function fetchRepos(username, perPage = 30) {
  const response = await fetch(
    `${BASE_URL}/users/${username}/repos?per_page=${perPage}&sort=updated&direction=desc`,
    { headers: { Accept: 'application/vnd.github+json' } }
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch repositories: ${response.statusText}`);
  }

  return response.json();
}
