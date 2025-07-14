// src/App.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CryptoDashboard from './components/CryptoDashboard';
import CryptoDetails from './components/CryptoDetails';
import Header from './components/Header';
import './App.css';

function App() {
  const [cryptoData, setCryptoData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedCrypto, setSelectedCrypto] = useState(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState('24h');

  useEffect(() => {
    const fetchCryptoData = async () => {
      try {
        setLoading(true);
        const response = await axios.get(
          'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=true&price_change_percentage=1h,24h,7d'
        );
        setCryptoData(response.data);
        setError(null);
      } catch (err) {
        setError('Failed to fetch cryptocurrency data. Please try again later.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchCryptoData();
    const interval = setInterval(fetchCryptoData, 60000); // Refresh every minute
    return () => clearInterval(interval);
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  const filteredCrypto = cryptoData.filter(
    (crypto) =>
      crypto.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      crypto.symbol.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleCryptoSelect = (crypto) => {
    setSelectedCrypto(crypto);
  };

  const handleBack = () => {
    setSelectedCrypto(null);
  };

  return (
    <div className="app">
      <div className="background-animation"></div>
      <div className="app-container">
        <Header />
        
        {selectedCrypto ? (
          <CryptoDetails 
            crypto={selectedCrypto} 
            onBack={handleBack}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          />
        ) : (
          <CryptoDashboard 
            cryptoData={filteredCrypto} 
            loading={loading} 
            error={error}
            searchTerm={searchTerm}
            handleSearch={handleSearch}
            onSelectCrypto={handleCryptoSelect}
            timeRange={timeRange}
            setTimeRange={setTimeRange}
          />
        )}
        
        <footer className="app-footer">
          <p>Data provided by CoinGecko API • Updated every minute</p>
          <p>Glassmorphic Crypto Tracker © {new Date().getFullYear()}</p>
        </footer>
      </div>
    </div>
  );
}

export default App;