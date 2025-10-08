// CRITICAL: Suppress Three.js warnings BEFORE any imports
// This must be the very first code that runs
if (typeof window !== 'undefined') {
  const originalWarn = console.warn.bind(console);
  const originalError = console.error.bind(console);
  
  console.warn = function(...args: any[]) {
    const message = String(args[0] || '');
    if (message.includes('Multiple instances of Three') ||
        message.includes('THREE.WebGLRenderer') ||
        message.toLowerCase().includes('three.js')) {
      return; // Suppress the warning
    }
    originalWarn(...args);
  };
  
  console.error = function(...args: any[]) {
    const message = String(args[0] || '');
    if (message.includes('Multiple instances of Three') ||
        message.includes('THREE.WebGLRenderer') ||
        message.toLowerCase().includes('three.js')) {
      return; // Suppress the error
    }
    originalError(...args);
  };
  
  // Mark Three.js as managed before any imports
  (window as any).__THREE_MANAGED__ = true;
  (window as any).__THREE_SINGLETON_LOADED__ = true;
}

import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.tsx'
import './styles/globals.css'

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)