import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import './index.css'
// import { UserProvider } from './UserContext'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  // <UserProvider>
  // <App />

  // </UserProvider>
)