import { useState, useEffect, FC, Dispatch, SetStateAction } from "react";
import Header from "../components/Header";
import Landing from "../components/Landing";

interface HomeProps {
	headerLightBgActive: boolean;
	setHeaderLightBgActive: Dispatch<SetStateAction<boolean>>;
	currentPage: string;
	setCurrentPage: Dispatch<SetStateAction<string>>;
}


const Home: FC<HomeProps> = ({headerLightBgActive, setHeaderLightBgActive, currentPage, setCurrentPage}) => {
	const [currentTab, setCurrentTab] = useState(
		localStorage.getItem("artAlchemyCurrentTab") || "home"
	);

	useEffect(() => {
		if (!currentTab) setCurrentTab("home");
	}, [currentTab]);

	return (
		<div>
			<Header lightBgActive={headerLightBgActive} currentPage={currentPage} />
			<Landing setHeaderLightBgActive={setHeaderLightBgActive} setCurrentPage={setCurrentPage} />
		</div>
	);
};

export default Home;
