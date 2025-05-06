import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ArtListings from "../components/ArtListings";

interface MarketProps {
	notify: (x: string) => void;
}

const Market: React.FC<MarketProps> = ({ notify }) => {
	const [currentTab, setCurrentTab] = useState(
		localStorage.getItem("artAlchemyCurrentTab") || "market"
	);

	useEffect(() => {
		if (!currentTab) setCurrentTab("market");
	}, [currentTab]);

	return (
		<div>
			<Header />
			<ArtListings notify={notify} />
		</div>
	);
};

export default Market;
