import { useState } from 'react'
import logo from './logo.svg'
import './App.css'

import BenchUI from './BenchUI/BenchUI';

function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <BenchUI />
      </header>
    </div>
  )
}

export default App
