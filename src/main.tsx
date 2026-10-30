import { createRoot, hydrateRoot } from 'react-dom/client';
import App from './App.tsx';
import './index.css';
import { migrateLegacyHashAndResolveRoute } from './utils/seoAndAgentReady.ts';

const rootElement = document.getElementById('root')!;
const initialRoute = migrateLegacyHashAndResolveRoute();

if (rootElement.hasChildNodes()) {
  hydrateRoot(rootElement, <App initialRoute={initialRoute} />);
} else {
  createRoot(rootElement).render(<App initialRoute={initialRoute} />);
}
