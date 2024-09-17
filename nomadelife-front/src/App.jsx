import { useState } from 'react'
import './App.css'
import NavBar from './components/NavBar'
import { Footer } from './components/Footer'
import CreatePost from './pages/CreatePost/CreatePost'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <NavBar />
     <Footer />
    </>
  )
}

export default App
