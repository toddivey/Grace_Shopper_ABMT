import React from 'react'
import {Navbar} from './components'
import Routes from './routes'
import {LandingPage} from './components/landing-page'

const App = () => {
  return (
    <div>
      <Navbar />    
      <Routes />
    </div>
  )
}

export default App
