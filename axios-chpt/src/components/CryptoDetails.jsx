// src/components/CryptoDetails.jsx
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../styles/CryptoDetails.css';

const CryptoDetails = ({ crypto, onBack, timeRange, setTimeRange }) => {
  const [detailedData, setDetailedData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [chartData, setChartData] = useState([]);

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${crypto.id}`
        );
        setDetailedData(response.data);
        setError(null);
        
        // Fetch chart data
        const chartResponse = await axios.get(
          `https://api.coingecko.com/api/v3/coins/${crypto.id}/market_chart?vs_currency=usd&days=${
            timeRange === '1h' ? 1 : timeRange === '24h' ? 7 : 30
          }&interval=${timeRange === '1h' ? 'hourly' : 'daily'}`
        );
        setChartData(chartResponse.data.prices);
      } catch (err) {
        setError('Failed to fetch detailed cryptocurrency data.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchDetails();
  }, [crypto.id, timeRange]);

  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: value < 1 ? 6 : 2,
    }).format(value);
  };

  const formatNumber = (num) => {
    if (num > 1000000000) {
      return (num / 1000000000).toFixed(2) + 'B';
    }
    if (num > 1000000) {
      return (num / 1000000).toFixed(2) + 'M';
    }
    if (num > 1000) {
      return (num / 1000).toFixed(2) + 'K';
    }
    return num.toFixed(2);
  };

  const getPriceChange = () => {
    if (!detailedData) return 0;
    
    switch(timeRange) {
      case '1h': 
        return detailedData.market_data.price_change_percentage_1h_in_currency.usd;
      case '7d': 
        return detailedData.market_data.price_change_percentage_7d_in_currency.usd;
      default: 
        return detailedData.market_data.price_change_percentage_24h_in_currency.usd;
    }
  };

  const renderChart = () => {
    if (chartData.length < 2) {
      return null; // Not enough data to draw a line
    }

    const prices = chartData.map(p => p[1]);
    const minPrice = Math.min(...prices);
    const maxPrice = Math.max(...prices);
    const priceRange = maxPrice - minPrice;

    const pathData = chartData.map((point, i) => {
      const x = i * (500 / (chartData.length - 1));
      // Handle the case where all prices are the same to avoid division by zero
      const yRatio = priceRange > 0 ? (point[1] - minPrice) / priceRange : 0.5;
      // Scale to fit within viewbox with some padding
      const y = 200 - (yRatio * 180 + 10); 
      return `${x},${y}`;
    }).join(' L ');

    return `M ${pathData}`;
  };

  const priceChange = getPriceChange();
  const changeClass = priceChange >= 0 ? 'positive' : 'negative';
  const changeIcon = priceChange >= 0 ? '▲' : '▼';

  return (
    <div className="crypto-details">
      <button className="back-button" onClick={onBack}>
        &larr; Back to Dashboard
      </button>
      
      {loading ? (
        <div className="loading-container">
          <div className="crypto-loader"></div>
          <p>Loading detailed data...</p>
        </div>
      ) : error ? (
        <div className="error-container">
          <div className="error-icon">⚠️</div>
          <p>{error}</p>
        </div>
      ) : detailedData ? (
        <div className="detail-content glass-card">
          <div className="detail-header">
            <div className="crypto-identity">
              <img 
                src={detailedData.image.large} 
                alt={detailedData.name} 
                className="detail-icon"
              />
              <div>
                <h2>{detailedData.name} ({detailedData.symbol.toUpperCase()})</h2>
                <p>Rank: #{detailedData.market_cap_rank}</p>
              </div>
            </div>
            <div className="price-display">
              <div className="current-price">
                {formatCurrency(detailedData.market_data.current_price.usd)}
              </div>
              <div className={`price-change ${changeClass}`}>
                {changeIcon} {Math.abs(priceChange).toFixed(2)}% ({timeRange})
              </div>
            </div>
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
          
          <div className="price-chart">
            <svg viewBox="0 0 500 200" className="chart-svg">
              {chartData.length > 1 && (
                <path 
                  d={renderChart()}
                  fill="none"
                  stroke={priceChange >= 0 ? 'rgba(0, 200, 83, 0.7)' : 'rgba(255, 61, 0, 0.7)'}
                  strokeWidth="3"
                />
              )}
            </svg>
          </div>
          
          <div className="stats-grid">
            <div className="stat-card">
              <h4>Market Cap</h4>
              <p>{formatCurrency(detailedData.market_data.market_cap.usd)}</p>
            </div>
            <div className="stat-card">
              <h4>Volume (24h)</h4>
              <p>{formatCurrency(detailedData.market_data.total_volume.usd)}</p>
            </div>
            <div className="stat-card">
              <h4>Circulating Supply</h4>
              <p>{formatNumber(detailedData.market_data.circulating_supply)} {detailedData.symbol.toUpperCase()}</p>
            </div>
            <div className="stat-card">
              <h4>All-Time High</h4>
              <p>{formatCurrency(detailedData.market_data.ath.usd)}</p>
            </div>
          </div>
          
          <div className="description">
            <h3>About {detailedData.name}</h3>
            <p>{detailedData.description.en.split('. ')[0]}.</p>
          </div>
          
          <div className="links">
            <h3>Links</h3>
            <div className="link-buttons">
              {detailedData.links.homepage[0] && (
                <a href={detailedData.links.homepage[0]} target="_blank" rel="noopener noreferrer" className="link-button">
                  Website
                </a>
              )}
              {detailedData.links.blockchain_site[0] && (
                <a href={detailedData.links.blockchain_site[0]} target="_blank" rel="noopener noreferrer" className="link-button">
                  Explorer
                </a>
              )}
              {detailedData.links.official_forum_url[0] && (
                <a href={detailedData.links.official_forum_url[0]} target="_blank" rel="noopener noreferrer" className="link-button">
                  Forum
                </a>
              )}
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default CryptoDetails;