# 🔍 GitHub Profile Finder

A sleek, terminal-inspired GitHub profile search app built with **React + Vite**. Search any GitHub user to instantly view their profile details, stats, and public repositories.

![GitHub Profile Finder](https://img.shields.io/badge/React-18-61dafb?logo=react&logoColor=white) ![Vite](https://img.shields.io/badge/Vite-5-646cff?logo=vite&logoColor=white) ![GitHub API](https://img.shields.io/badge/GitHub-REST%20API-181717?logo=github&logoColor=white)

---

## ✨ Features

- 🔎 **Search any GitHub username** with a terminal-style input
- 👤 **Profile display** — avatar, name, bio, location, blog, company, Twitter
- 📊 **Stats dashboard** — repositories, followers, following, gists
- 📁 **Repository list** — language, stars, forks, description, last updated
- ⚡ **Loading skeletons** — shimmer animation while data loads
- ❌ **Error handling** — clear feedback for 404s and rate limits
- 📱 **Fully responsive** — works on mobile, tablet, and desktop
- 🎨 **Dark terminal aesthetic** — GitHub-inspired dark theme with green accents

---

## 🚀 Getting Started

### Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v8 or higher

### Installation

```bash
# 1. Clone or download this project
git clone https://github.com/marouaneradi/github-profile-finder
cd GITHUB-FINDER

# 2. Install dependencies
npm install
```

### Running the App

```bash
# Start development server (hot-reloading)
npm run dev
```

Then open [http://localhost:5173](http://localhost:5173) in your browser.

### Building for Production

```bash
# Create optimized production build
npm run build

# Preview the production build locally
npm run preview
```

---

## 🌐 How the GitHub API Works

This app uses the **[GitHub REST API v3](https://docs.github.com/en/rest)** — no authentication or API key required for basic usage.

### Endpoints Used

| Purpose | Endpoint |
|---|---|
| Fetch user profile | `GET https://api.github.com/users/{username}` |
| Fetch repositories | `GET https://api.github.com/users/{username}/repos` |

### Query Parameters (Repos)

```
/repos?per_page=30&sort=updated&direction=desc
```

- `per_page=30` — fetch up to 30 repos per request
- `sort=updated` — ordered by most recently updated
- `direction=desc` — newest first

### Rate Limiting

Unauthenticated requests are limited to **60 requests/hour per IP**. If you hit this limit, the app displays a clear error message.

To increase limits (5,000 req/hr), you can add a GitHub personal access token via the `Authorization` header:

```js
headers: {
  Authorization: `Bearer ${YOUR_GITHUB_TOKEN}`,
  Accept: 'application/vnd.github+json',
}
```

### Data Flow

```
User types username
    ↓
useGithub hook calls searchUser()
    ↓
Promise.all([fetchUser(), fetchRepos()])  ← parallel requests
    ↓
State updates: user, repos, loading, error
    ↓
Components re-render with data
```

---

## 🗂 Project Structure

```
github-profile-finder/
├── index.html                  # HTML entry point
├── vite.config.js              # Vite configuration
├── package.json                # Dependencies & scripts
├── README.md                   # This file
└── src/
    ├── main.jsx                # React root mount
    ├── App.jsx                 # Root component, layout & state
    ├── App.module.css          # App-level styles
    │
    ├── components/
    │   ├── SearchBar.jsx       # Search input form
    │   ├── SearchBar.module.css
    │   ├── ProfileCard.jsx     # User profile display
    │   ├── ProfileCard.module.css
    │   ├── RepoList.jsx        # Repositories grid
    │   ├── RepoList.module.css
    │   ├── ErrorMessage.jsx    # Error state UI
    │   ├── ErrorMessage.module.css
    │   ├── LoadingSkeleton.jsx # Shimmer loading state
    │   └── LoadingSkeleton.module.css
    │
    ├── hooks/
    │   └── useGithub.js        # Custom hook: search state & async logic
    │
    ├── utils/
    │   └── githubApi.js        # API fetch functions (fetchUser, fetchRepos)
    │
    └── styles/
        └── global.css          # CSS variables, reset, keyframes
```

---

## 🛠 Technologies Used

| Technology | Purpose |
|---|---|
| **React 18** | UI component library |
| **Vite 5** | Build tool & dev server |
| **CSS Modules** | Scoped, component-level styling |
| **GitHub REST API** | Data source (no auth required) |
| **Google Fonts** | Space Mono + Syne typefaces |

No external UI libraries or CSS frameworks were used — all styles are hand-written.

---

## 📐 Architecture Decisions

- **CSS Modules** — zero class name collisions, no runtime CSS-in-JS overhead
- **Custom hook (`useGithub`)** — separates data-fetching logic from UI components
- **`Promise.all`** — fetches profile and repos in parallel, not sequentially
- **`useCallback`** — memoizes `searchUser` and `reset` to prevent unnecessary re-renders
- **`async/await`** — readable async code with proper `try/catch` error handling

---

## 🔮 Possible Future Upgrades

### Features
- [ ] **GitHub OAuth login** — increase API rate limit from 60 to 5,000 req/hr
- [ ] **Starred repositories tab** — browse what a user has starred
- [ ] **Organization support** — search GitHub organizations and their repos
- [ ] **Repository filtering & sorting** — filter by language, sort by stars/forks/date
- [ ] **Search history** — remember recent searches with localStorage
- [ ] **Repository details modal** — show README preview, contributors, open issues
- [ ] **User comparison** — compare two GitHub profiles side-by-side
- [ ] **Contribution graph** — visualize a user's commit activity

### Technical
- [ ] **React Query / SWR** — smart caching and background refetching
- [ ] **GitHub GraphQL API** — fetch exactly the data needed in fewer requests
- [ ] **Infinite scroll** — paginate through all repositories (not just 30)
- [ ] **PWA support** — offline caching and install prompt
- [ ] **Unit & integration tests** — Vitest + React Testing Library
- [ ] **TypeScript migration** — full type safety for API responses

---

## 📄 License

MIT — free to use and modify for any purpose.

---

> Built with the [GitHub REST API](https://docs.github.com/en/rest) · React + Vite
