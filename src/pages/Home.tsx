import React, { useState, useEffect } from "react";
import Header from "../components/Header";

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
		</div>
	);
};

export default Home;
