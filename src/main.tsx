import {StrictMode} from 'react';
import {createRoot} from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { LanguageProvider } from './contexts/LanguageContext.tsx';
import { LoadingProvider } from './contexts/LoadingContext.tsx';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <LoadingProvider>
      <LanguageProvider>
        <App />
      </LanguageProvider>
    </LoadingProvider>
  </StrictMode>,
);
