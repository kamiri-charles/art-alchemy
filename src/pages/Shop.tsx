import { useState, useEffect, FC, Dispatch, SetStateAction } from "react";
import Header from "../components/Header";
import ArtListings from "../components/ArtListings";

interface ShopProps {
	notify: (x: string) => void;
	headerLightBgActive: boolean;
	currentPage: string;
	setCurrentPage: Dispatch<SetStateAction<string>>;
	setHeaderLightBgActive: Dispatch<SetStateAction<boolean>>;
}

const Shop: FC<ShopProps> = ({ notify, headerLightBgActive, currentPage, setCurrentPage, setHeaderLightBgActive }) => {
	const [currentTab, setCurrentTab] = useState(
		localStorage.getItem("artAlchemyCurrentTab") || "market"
	);

	useEffect(() => {
		if (!currentTab) setCurrentTab("market");
		setCurrentPage("shop");
	}, [currentTab]);

	return (
		<div>
			<Header lightBgActive={headerLightBgActive} currentPage={currentPage} />
			<ArtListings notify={notify} setHeaderLightBgActive={setHeaderLightBgActive} />
		</div>
	);
};

export default Shop;
