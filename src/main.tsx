import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';

// Suppress React DevTools warning in production
if (import.meta.env.PROD) {
  const originalConsoleWarn = console.warn;
  console.warn = (...args) => {
    if (args[0] && typeof args[0] === 'string' && args[0].includes('React DevTools')) {
      return;
    }
    originalConsoleWarn.apply(console, args);
  };
}

// Remove loading spinner once app loads
const removeLoadingSpinner = () => {
  const spinner = document.querySelector('.loading-spinner');
  if (spinner) {
    spinner.remove();
  }
};

// Optimize initial render
const rootElement = document.getElementById('root');
if (!rootElement) {
  throw new Error('Root element not found');
}

const root = createRoot(rootElement);

// Use requestIdleCallback for better performance
const renderApp = () => {
  root.render(
    <StrictMode>
      <App />
    </StrictMode>
  );
  
  // Remove loading spinner immediately after render
  requestAnimationFrame(removeLoadingSpinner);
};

if ('requestIdleCallback' in window) {
  requestIdleCallback(renderApp);
} else {
  setTimeout(renderApp, 0);
}

// Register service worker for caching (only in production)
if ('serviceWorker' in navigator && import.meta.env.PROD) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .catch(() => {
        // Silent error handling - no console logs
      });
  });
}
