import './App.css'
import React from 'react'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import Card from './components/Card'
function App() {
  return (
    <>
      <Navbar />
      <div className='cards'>
        <Card title="card1" desc="This is card 1" />
        <Card title="card2" desc="This is card 2" />
        <Card title="card3" desc="This is card 3" />
        <Card title="card4" desc="This is card 4" />
        <Card title="card5" desc="This is card 5" />
        <Card title="card6" desc="This is card 6" />
      </div>
      <Footer />
    </>
  )
}

export default App
