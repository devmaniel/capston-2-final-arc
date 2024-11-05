import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'

// style
// Supports weights 200-900
// Supports weights 100-900
import '@fontsource-variable/overpass';
import '@fontsource/space-mono';
import '@fontsource/poppins';
import '@fontsource/ibm-plex-mono';

// Supports weights 200-900
import '@fontsource-variable/source-code-pro';

import '@fontsource/dm-mono';
import '@fontsource/ubuntu';

// Supports weights 200-900
import '@fontsource-variable/nunito';

// Supports weights 100-900
import '@fontsource-variable/public-sans';
import './index.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
