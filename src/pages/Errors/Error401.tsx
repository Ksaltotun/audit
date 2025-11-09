import React from 'react';
import './Errors.scss';
import { useLocation } from 'react-router-dom';


interface IError {
    error: string | null | undefined
}

const Error401: React.FC<IError> = ({ error }: IError) => {
    const handleGoBack = () => {
        window.history.back();
    };

    const handleGoHome = () => {
        window.location.href = '/';
    };
    const location = useLocation();
    const errorState = location.state
    console.dir(location)
    const originalError = errorState?.error?.error;

    return (
        <div className="error-container">
            <div className="error-content">
                <div className="error-text">
                    <h1>4 0 1 (сервер отклонил запрос)</h1>
                    <p>{originalError || error || 'Какая-то проблема с доступом'}</p>
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

export default Error401;