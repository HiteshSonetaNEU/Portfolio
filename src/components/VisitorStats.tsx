import React, { useState, useEffect } from 'react';
import VisitorTracker from '../utils/VisitorTracker';
import './VisitorStats.scss';

function VisitorStats() {
  const [stats, setStats] = useState<any>(null);
  const [isVisible, setIsVisible] = useState(false);
  const [tracker] = useState(() => new VisitorTracker());

  useEffect(() => {
    // Show stats panel when pressing Ctrl+Shift+V
    const handleKeyPress = (e: KeyboardEvent) => {
      if (e.ctrlKey && e.shiftKey && e.key === 'V') {
        setIsVisible(!isVisible);
        if (!isVisible) {
          loadStats();
        }
      }
    };

    window.addEventListener('keydown', handleKeyPress);
    return () => window.removeEventListener('keydown', handleKeyPress);
  }, [isVisible]);

  const loadStats = () => {
    const visitorStats = tracker.getVisitorStats();
    setStats(visitorStats);
  };

  const clearData = () => {
    if (window.confirm('Are you sure you want to clear all visitor data?')) {
      localStorage.removeItem('portfolio_visitors');
      setStats(null);
      alert('Visitor data cleared!');
    }
  };

  if (!isVisible) return null;

  return (
    <div className="visitor-stats-overlay">
      <div className="visitor-stats-panel">
        <div className="stats-header">
          <h3>📊 Visitor Analytics</h3>
          <div className="stats-actions">
            <button onClick={loadStats} className="refresh-btn">
              🔄 Refresh
            </button>
            <button onClick={clearData} className="clear-btn">
              🗑️ Clear Data
            </button>
            <button onClick={() => setIsVisible(false)} className="close-btn">
              ✕
            </button>
          </div>
        </div>

        {stats ? (
          <div className="stats-content">
            <div className="stats-grid">
              <div className="stat-card">
                <h4>Total Visits</h4>
                <div className="stat-number">{stats.totalVisits}</div>
              </div>
              <div className="stat-card">
                <h4>Unique Countries</h4>
                <div className="stat-number">{stats.uniqueCountries}</div>
              </div>
              <div className="stat-card">
                <h4>Unique Cities</h4>
                <div className="stat-number">{stats.uniqueCities}</div>
              </div>
            </div>

            <div className="stats-sections">
              <div className="stats-section">
                <h4>🌍 Top Countries</h4>
                <div className="stats-list">
                  {Object.entries(stats.countries).slice(0, 5).map(([country, count]) => (
                    <div key={country} className="stats-item">
                      <span>{country}</span>
                      <span className="count">{count as number}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="stats-section">
                <h4>🏙️ Top Cities</h4>
                <div className="stats-list">
                  {Object.entries(stats.cities).slice(0, 5).map(([city, count]) => (
                    <div key={city} className="stats-item">
                      <span>{city}</span>
                      <span className="count">{count as number}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="stats-section">
                <h4>🌐 Browsers</h4>
                <div className="stats-list">
                  {Object.entries(stats.browsers).map(([browser, count]) => (
                    <div key={browser} className="stats-item">
                      <span>{browser}</span>
                      <span className="count">{count as number}</span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="stats-section">
                <h4>🔗 Referrers</h4>
                <div className="stats-list">
                  {Object.entries(stats.referrers).slice(0, 5).map(([referrer, count]) => (
                    <div key={referrer} className="stats-item">
                      <span>{referrer === 'Direct' ? '🔗 Direct' : referrer}</span>
                      <span className="count">{count as number}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            <div className="recent-visits">
              <h4>🕒 Recent Visits</h4>
              <div className="visits-list">
                {stats.recentVisits.map((visit: any, index: number) => (
                  <div key={index} className="visit-item">
                    <div className="visit-info">
                      <span className="visit-location">
                        {visit.location.city}, {visit.location.country}
                      </span>
                      <span className="visit-time">{visit.time}</span>
                    </div>
                    <div className="visit-details">
                      <span className="visit-browser">
                        {visit.browser.browser} on {visit.browser.os}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="no-stats">
            <p>No visitor data available. Click refresh to load stats.</p>
          </div>
        )}

        <div className="stats-footer">
          <small>💡 Press Ctrl+Shift+V to toggle this panel</small>
        </div>
      </div>
    </div>
  );
}

export default VisitorStats;
