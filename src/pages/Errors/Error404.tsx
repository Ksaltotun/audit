import React from 'react';
import './Errors.scss';
import { useLocation } from 'react-router-dom';

const Error404: React.FC = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

     const location = useLocation();
        const errorState = location.state
        const originalError = errorState?.error?.error;

  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-text">
          <h1>4 0 4 (не найден запрашиваемый ресурс)</h1>
          <p>{originalError || 'Ресурс никогда не существовал, либо удален'}</p>
          <div className="error-actions">
            <button 
              className="btn-back" 
              onClick={handleGoBack}
            >
              ← Назад
            </button>
            <button 
              className="btn-home" 
              onClick={handleGoHome}
            >
              На главную
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Error404;