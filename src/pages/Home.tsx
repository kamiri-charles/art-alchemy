import { useState, useEffect, FC } from "react";
import Header from "../components/Header";
import Landing from "../components/Landing";


const Home: FC = () => {
	const [currentTab, setCurrentTab] = useState(
		localStorage.getItem("artAlchemyCurrentTab") || "home"
	);

	useEffect(() => {
		if (!currentTab) setCurrentTab("home");
	}, [currentTab]);

	return (
		<div>
			<Header />
			<Landing />
		</div>
	);
};

export default Home;
