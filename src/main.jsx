import React from 'react';
import { createRoot } from 'react-dom/client';
import XPOQualiwattProV3 from './XPOQualiwattPro-v3-Final.jsx';

const rootElement = document.getElementById('root');

if (rootElement) {
  const root = createRoot(rootElement);
  root.render(<XPOQualiwattProV3 />);
}
