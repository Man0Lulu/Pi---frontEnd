import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import { UserContextProvider } from './contexts/UserContext'
import { LivroContextProvider } from './contexts/LivroContext'
import { faCheckCircle, faSearch, faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons'
import './styles/index.css' //arquivo do tailwind
import { library } from '@fortawesome/fontawesome-svg-core'

library.add(faCheckCircle, faSearch, faMagnifyingGlass)

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <UserContextProvider>
      <LivroContextProvider>
        <App />
      </LivroContextProvider>
    </UserContextProvider>
  </React.StrictMode>,
)