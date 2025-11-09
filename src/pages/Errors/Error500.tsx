import React from 'react';
import './Errors.scss';
import { useLocation } from 'react-router-dom';

const Error500: React.FC = () => {
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
                    <h1>5 0 0 (кажется, проблема на стороне сервера)</h1>
 <p>{originalError || ''}</p>
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

export default Error500;
