import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { BrowserRouter } from 'react-router-dom'
import AuthProvider from './pages/context/AuthProvider.jsx'
import SearchProvider from './pages/context/SearchContext.jsx'

createRoot(document.getElementById("root")).render(
  <BrowserRouter>
    <AuthProvider>
      <SearchProvider>
      <App />
      </SearchProvider>
    </AuthProvider>
  </BrowserRouter>
);
