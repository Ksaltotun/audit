import React from 'react';
import './Errors.scss';

const Error: React.FC = () => {
  const handleGoBack = () => {
    window.history.back();
  };

  const handleGoHome = () => {
    window.location.href = '/';
  };

  return (
    <div className="error-container">
      <div className="error-content">
        <div className="error-text">
          <h1>Непонятная ошибка</h1>
          <p>Что-то пошло не так, обратитесь к администратору КИС</p>
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

export default Error;