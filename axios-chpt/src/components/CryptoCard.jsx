// src/components/CryptoCard.js
import React from 'react';
import '../styles/CryptoCard.css';

const CryptoCard = ({ crypto, onClick, changePercentage  }) => {
  const changeClass = changePercentage >= 0 ? 'positive' : 'negative';
  const changeIcon = changePercentage >= 0 ? '▲' : '▼';
  
  // Format numbers
  const formatCurrency = (value) => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: value < 1 ? 4 : 2,
      maximumFractionDigits: value < 1 ? 6 : 2,
    }).format(value);
  };

  const formatMarketCap = (value) => {
    if (value > 1000000000) {
      return `$${(value / 1000000000).toFixed(2)}B`;
    }
    if (value > 1000000) {
      return `$${(value / 1000000).toFixed(2)}M`;
    }
    return `$${value}`;
  };

  return (
    <div className="crypto-card glass-card" onClick={onClick}>
      <div className="crypto-info">
        <img 
          src={crypto.image} 
          alt={crypto.name} 
          className="crypto-icon"
        />
        <div>
          <h3>{crypto.name}</h3>
          <span className="crypto-symbol">{crypto.symbol.toUpperCase()}</span>
        </div>
      </div>
      
      <div className="crypto-price">{formatCurrency(crypto.current_price)}</div>
      
      <div className={`crypto-change ${changeClass}`}>
        {changeIcon} {Math.abs(changePercentage).toFixed(2)}%
      </div>
      
      <div className="crypto-marketcap">{formatMarketCap(crypto.market_cap)}</div>
      
      <div className="sparkline">
        <svg viewBox="0 0 100 40" className="sparkline-svg">
          <path 
            d={crypto.sparkline_in_7d?.price 
              ? `M ${crypto.sparkline_in_7d.price.map((p, i) => 
                  `${i * (100 / crypto.sparkline_in_7d.price.length)},${40 - (p / Math.max(...crypto.sparkline_in_7d.price) * 40)}`
                ).join(' L ')}` 
              : ''}
            fill="none"
            stroke={changePercentage >= 0 ? '#00c853' : '#ff3d00'}
            strokeWidth="2"
          />
        </svg>
      </div>
    </div>
  );
};

export default CryptoCard;