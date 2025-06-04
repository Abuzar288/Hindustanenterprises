import React, { useState, FormEvent } from 'react';
import { useAuth } from './AuthContext';

interface LoginFormProps {
  onLoginSuccess: () => void;
  // onSwitchToRegister prop removed
}

const LoginForm: React.FC<LoginFormProps> = ({ onLoginSuccess }) => {
  const [emailOrUsername, setEmailOrUsername] = useState('');
  const [password, setPassword] = useState('');
  const { login, isLoading, error: authError } = useAuth();
  const [formError, setFormError] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setFormError(null);
    if (!emailOrUsername || !password) {
      setFormError('Please fill in all fields.');
      return;
    }
    try {
      await login(emailOrUsername, password);
      onLoginSuccess();
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-8 p-6 md:p-8 bg-white rounded-lg shadow-xl">
      <h2 className="text-2xl sm:text-3xl font-bold text-teal-700 mb-6 text-center">Admin Login</h2>
      <form onSubmit={handleSubmit} noValidate>
        {(authError || formError) && (
          <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-md text-sm">
            {authError || formError}
          </div>
        )}
        <div className="mb-4">
          <label htmlFor="emailOrUsername" className="block text-sm font-medium text-gray-700 mb-1">
            Email or Username
          </label>
          <input
            type="text"
            id="emailOrUsername"
            value={emailOrUsername}
            onChange={(e) => setEmailOrUsername(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            required
            aria-describedby="emailOrUsernameError"
            autoComplete="username"
          />
        </div>
        <div className="mb-6">
          <label htmlFor="passwordLogin" className="block text-sm font-medium text-gray-700 mb-1">
            Password
          </label>
          <input
            type="password"
            id="passwordLogin" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:ring-teal-500 focus:border-teal-500 sm:text-sm"
            required
            aria-describedby="passwordError"
            autoComplete="current-password"
          />
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-teal-600 hover:bg-teal-700 text-white font-semibold py-2.5 px-4 rounded-md shadow-sm transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-teal-500 focus:ring-opacity-75 disabled:opacity-50 flex items-center justify-center"
        >
          {isLoading ? (
            <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white"></div>
          ) : (
            'Login'
          )}
        </button>
      </form>
      {/* Removed "Don't have an account? Register here" paragraph */}
    </div>
  );
};

export default LoginForm;