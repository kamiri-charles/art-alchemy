import React from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import ArtListings from '../components/ArtListings'

const LandingPage: React.FC = () => {
  return (
    <div>
        <Header />
        <Navbar />
        <ArtListings />
    </div>
  )
}

export default LandingPage