import React, { useState, useEffect } from "react";
import Header from "../components/Header";
import ArtListings from "../components/ArtListings";

interface ShopProps {
	notify: (x: string) => void;
	headerLightBgActive: boolean;
	currentPage: string;
}

const Shop: React.FC<ShopProps> = ({ notify, headerLightBgActive, currentPage }) => {
	const [currentTab, setCurrentTab] = useState(
		localStorage.getItem("artAlchemyCurrentTab") || "market"
	);

	useEffect(() => {
		if (!currentTab) setCurrentTab("market");
	}, [currentTab]);

	return (
		<div>
			<Header lightBgActive={headerLightBgActive} currentPage={currentPage} />
			<ArtListings notify={notify} />
		</div>
	);
};

export default Shop;
