import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { DBConfig } from './utils/database.js';
import { initDB } from 'react-indexed-db-hook';
import { AuthProvider } from './context/authContext.jsx';

initDB(DBConfig);
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
    <App />
    </AuthProvider>
  </StrictMode>,
)
