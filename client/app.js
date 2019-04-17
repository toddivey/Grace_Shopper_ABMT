import React from 'react'

import {Navbar} from './components'
import AllProducts from './components/products'
import AllUsers from './components/users'
import Routes from './routes'

const App = () => {
  return (
    <div>
      <Navbar />
      <Routes />
    </div>
  )
}

export default App
