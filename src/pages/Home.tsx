import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ArtListings from "../components/ArtListings";

const Home: React.FC = () => {
	const [currentTab, setCurrentTab] = useState(
		localStorage.getItem("artAlchemyCurrentTab") || "home"
	);

	useEffect(() => {
		if (!currentTab) setCurrentTab("home");
	}, [currentTab]);

	return (
		<div>
			<Header />
			<ArtListings />
		</div>
	);
};

export default Home;
