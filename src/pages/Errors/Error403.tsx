import React from 'react';
import './Errors.scss';
import { useLocation } from 'react-router-dom';

const Error403: React.FC = () => {
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
          <h1>4 0 3 (доступ запрещен)</h1>
          <p>{originalError || 'У вас нет прав для просмотра этой страницы'}</p>
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

export default Error403;