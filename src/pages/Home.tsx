import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ArtListings from "../components/ArtListings";

interface HomeProps {
	notify: (x: string) => void;
}

const Home: React.FC<HomeProps> = ({notify}) => {
	const [currentTab, setCurrentTab] = useState(
		localStorage.getItem("artAlchemyCurrentTab") || "home"
	);

	useEffect(() => {
		if (!currentTab) setCurrentTab("home");
	}, [currentTab]);

	return (
		<div>
			<Header />
			<ArtListings notify={notify} />
		</div>
	);
};

export default Home;
