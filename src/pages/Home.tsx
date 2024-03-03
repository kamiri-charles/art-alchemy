import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import ArtListings from '../components/ArtListings'
import PageLoader from '../components/PageLoader'
import Events from '../components/Events'
import Cart from '../components/Cart'

const Home: React.FC = () => {

  const [loading, setLoading] = useState(true);
  const [currentTab, setCurrentTab] = useState('');


  useEffect(() => {
    setTimeout(() => {
      setLoading(false);
    }, 5000);

    if (currentTab == '') setCurrentTab('home');
  }, [currentTab]);

  const tabComponents: { [key: string]: JSX.Element } = {
	home: <ArtListings />,
	events: <Events />,
	cart: <Cart />
	};

  return (
		<div>
			{!loading ? (
				<>
					<Header />
					<Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
					{tabComponents[currentTab]}
				</>
			) : (
				<PageLoader />
			)}
		</div>
	);
}

export default Home