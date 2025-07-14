// src/components/CryptoDashboard.js
import React from 'react';
import CryptoCard from './CryptoCard';
import '../styles/CryptoDashboard.css';

const CryptoDashboard = ({ 
  cryptoData, 
  loading, 
  error, 
  searchTerm, 
  handleSearch, 
  onSelectCrypto,
  timeRange,
  setTimeRange
}) => {
  const getChangePercentage = (crypto) => {
    switch(timeRange) {
      case '1h': return crypto.price_change_percentage_1h_in_currency;
      case '7d': return crypto.price_change_percentage_7d_in_currency;
      default: return crypto.price_change_percentage_24h;
    }
  };

  return (
    <div className="dashboard">
      <div className="dashboard-header">
        <h2>Cryptocurrency Tracker</h2>
        <div className="controls">
          <div className="search-container">
            <input
              type="text"
              placeholder="Search cryptocurrencies..."
              value={searchTerm}
              onChange={handleSearch}
              className="glass-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          
          <div className="time-selector">
            <button 
              className={`time-btn ${timeRange === '1h' ? 'active' : ''}`}
              onClick={() => setTimeRange('1h')}
            >
              1h
            </button>
            <button 
              className={`time-btn ${timeRange === '24h' ? 'active' : ''}`}
              onClick={() => setTimeRange('24h')}
            >
              24h
            </button>
            <button 
              className={`time-btn ${timeRange === '7d' ? 'active' : ''}`}
              onClick={() => setTimeRange('7d')}
            >
              7d
            </button>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="loading-container">
          <div className="crypto-loader"></div>
          <p>Loading cryptocurrency data...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p>{error}</p>
          <button onClick={() => window.location.reload()}>Try Again</button>
        </div>
      ) : (
        <div className="crypto-grid">
          <div className="grid-header">
            <span>Coin</span>
            <span>Price</span>
            <span>Change ({timeRange})</span>
            <span>Market Cap</span>
          </div>
          
          {cryptoData.length > 0 ? (
            cryptoData.map((crypto) => (
              <CryptoCard 
                key={crypto.id} 
                crypto={crypto} 
                onClick={() => onSelectCrypto(crypto)}
                changePercentage={getChangePercentage(crypto)}
                timeRange={timeRange}
              />
            ))
          ) : (
            <div className="no-results">
              <p>No cryptocurrencies found matching your search.</p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default CryptoDashboard;