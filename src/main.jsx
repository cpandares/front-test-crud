import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
import 'rsuite/dist/rsuite.min.css';
import AppRouter from './routes/AppRouter';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
     <AppRouter>
      <App /> 
     </AppRouter>
  </React.StrictMode>
)
