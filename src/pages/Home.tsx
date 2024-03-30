import React, { useState, useEffect } from 'react'
import Header from '../components/Header'
import Navbar from '../components/Navbar'
import ArtListings from '../components/ArtListings'
import Events from '../components/Events'
import Cart from '../components/Cart'

const Home: React.FC = () => {

  const [currentTab, setCurrentTab] = useState(localStorage.getItem('artAlchemyCurrentTab') || 'home');

  useEffect(() => {
    if (!currentTab) setCurrentTab('home');
  }, [currentTab]);

  const tabComponents: { [key: string]: JSX.Element } = {
	home: <ArtListings />,
	events: <Events />,
	cart: <Cart />
	};

  return (
		<div>
			<Header />
			<Navbar currentTab={currentTab} setCurrentTab={setCurrentTab} />
			{tabComponents[currentTab]}
		</div>
	);
}

export default Home