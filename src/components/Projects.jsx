import React, { useState, useEffect } from 'react';

const Projects = () => {
  // 1. Setup State Variables
  const [repos, setRepos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');

  // GitHub username to fetch public repos for
  const githubUsername = 'JanviPrajapati0210';

  // 2. Fetch Data & Top 3 Languages Function
  const fetchRepositories = async () => {
    setLoading(true);
    setError(null);

    try {
      const response = await fetch(`https://api.github.com/users/${githubUsername}/repos`);

      if (!response.ok) {
        throw new Error(`Failed to fetch data (Status: ${response.status})`);
      }

      const reposData = await response.json();

      // Fetch top 3 languages for each repository in parallel
      const reposWithLanguages = await Promise.all(
        reposData.map(async (repo) => {
          try {
            const langRes = await fetch(repo.languages_url);
            if (langRes.ok) {
              const langData = await langRes.json();
              // Sort languages by byte count descending and pick top 3
              const topLanguages = Object.keys(langData)
                .sort((a, b) => langData[b] - langData[a])
                .slice(0, 3);
              return { ...repo, topLanguages };
            }
          } catch (err) {
            console.error(`Error fetching languages for ${repo.name}:`, err);
          }
          // Fallback to primary language if languages_url fetch fails
          return { ...repo, topLanguages: repo.language ? [repo.language] : [] };
        })
      );

      setRepos(reposWithLanguages);
    } catch (err) {
      setError(err.message || 'An unexpected error occurred.');
    } finally {
      setLoading(false);
    }
  };

  // 3. Trigger Fetch on Mount
  useEffect(() => {
    fetchRepositories();
  }, []);

  // Filter Repositories based on search input & Sort by most recently updated
  const filteredAndSortedRepos = repos
    .filter((repo) =>
      repo.name.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at));

  // 4. Conditional Rendering based on state

  // Loading State
  if (loading) {
    return (
      <section className="section" style={{ textAlign: 'center', padding: '60px 0' }}>
        <span className="section__title section__title--projects">Projects</span>
        <h3 style={{ color: 'var(--text)', marginTop: '16px', fontFamily: 'var(--font-display)' }}>
          Loading repositories...
        </h3>
        <div style={spinnerStyle}></div>
      </section>
    );
  }

  // Error State with Retry Button
  if (error) {
    return (
      <section className="section" style={{ textAlign: 'center', padding: '60px 0' }}>
        <span className="section__title section__title--projects">Projects</span>
        <h3 style={{ color: '#ff6b6b', marginTop: '16px', fontFamily: 'var(--font-display)' }}>
          Error Loading Projects
        </h3>
        <p style={{ color: 'var(--muted)', marginBottom: '20px' }}>{error}</p>
        <button 
          onClick={fetchRepositories} 
          className="btn btn--outline"
          style={{ cursor: 'pointer' }}
        >
          🔄 Retry Fetching
        </button>
      </section>
    );
  }

  // Success State: Render List
  return (
    <section className="section">
      {/* Header Bar: Title, Count, & Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '16px', marginBottom: '32px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <span className="section__title section__title--projects" style={{ marginBottom: 0 }}>
            GitHub Repositories
          </span>
          {/* Total Repos Count Badge */}
          <span style={countBadgeStyle}>
            {filteredAndSortedRepos.length} {filteredAndSortedRepos.length === 1 ? 'Repo' : 'Repos'}
          </span>
        </div>

        {/* Search Input Filter */}
        <input
          type="text"
          placeholder="Search repositories by name..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          style={inputStyle}
        />
      </div>

      {/* Repository Grid Layout */}
      {filteredAndSortedRepos.length === 0 ? (
        <p style={{ color: 'var(--muted)', textAlign: 'center', padding: '40px 0' }}>
          No repositories found matching "{searchTerm}".
        </p>
      ) : (
        <div className="projects">
          {filteredAndSortedRepos.map((repo) => (
            <div key={repo.id} className="projects__card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <h3 style={{ color: 'var(--text)', marginBottom: '8px' }}>
                  {repo.name}
                </h3>
                <p style={{ color: 'var(--muted)', fontSize: '0.95rem', marginBottom: '16px' }}>
                  {repo.description || 'No description provided.'}
                </p>
              </div>

              {/* Card Footer: Metadata (Stars, Forks, Top 3 Languages) & External Link */}
              <div style={{ marginTop: 'auto', paddingTop: '16px', borderTop: '1px solid var(--line)' }}>
                <ul className="projects__stack" style={{ marginBottom: '16px' }}>
                  <li>⭐ {repo.stargazers_count} stars</li>
                  <li>🍴 {repo.forks_count} forks</li>
                  {/* Map Top 3 Languages */}
                  {repo.topLanguages && repo.topLanguages.length > 0 && (
                    repo.topLanguages.map((lang, idx) => (
                      <li key={idx}>💻 {lang}</li>
                    ))
                  )}
                </ul>

                <a
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="btn btn--outline"
                  style={{ width: '100%', textAlign: 'center', fontSize: '0.85rem', padding: '8px 16px' }}
                >
                  View on GitHub ↗
                </a>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  );
};

// Styles leveraging your app's CSS variables
const spinnerStyle = {
  width: '40px',
  height: '40px',
  border: '4px solid var(--line)',
  borderTop: '4px solid var(--accent)',
  borderRadius: '50%',
  margin: '24px auto',
  animation: 'spin 1s linear infinite',
};

const inputStyle = {
  maxWidth: '300px',
  width: '100%',
  padding: '10px 16px',
  borderRadius: '999px',
  border: '1px solid var(--line)',
  backgroundColor: 'var(--bg-elevated)',
  color: 'var(--text)',
  fontFamily: 'var(--font-mono)',
  fontSize: '0.85rem',
  outline: 'none',
};

const countBadgeStyle = {
  fontFamily: 'var(--font-mono)',
  fontSize: '0.8rem',
  fontWeight: '600',
  color: 'var(--text)',
  background: 'var(--bg-elevated)',
  border: '1px solid var(--line)',
  padding: '4px 12px',
  borderRadius: '999px',
};

export default Projects;