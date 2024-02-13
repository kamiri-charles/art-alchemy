import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import ArtListings from '../components/ArtListings'
import PageLoader from '../components/PageLoader'

const Landing: React.FC = () => {

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000)
  }, []);

  return (
    <div>
      {!loading ? (
        <>
        <Header />
        <Navbar />
        <ArtListings />
        </>
      ): <PageLoader /> }
    </div>
  )
}

export default Landing