import { useState, useEffect, FC, Dispatch, SetStateAction } from "react";
import Header from "../components/Header";
import Landing from "../components/Landing";

interface HomeProps {
	headerLightBgActive: boolean;
	setHeaderLightBgActive: Dispatch<SetStateAction<boolean>>;
}


const Home: FC<HomeProps> = ({headerLightBgActive, setHeaderLightBgActive}) => {
	const [currentTab, setCurrentTab] = useState(
		localStorage.getItem("artAlchemyCurrentTab") || "home"
	);

	useEffect(() => {
		if (!currentTab) setCurrentTab("home");
	}, [currentTab]);

	return (
		<div>
			<Header lightBgActive={headerLightBgActive} />
			<Landing setHeaderLightBgActive={setHeaderLightBgActive} />
		</div>
	);
};

export default Home;
