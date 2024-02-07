import React, { useEffect, useState } from "react";

const RandomBackground: React.FC = () => {
	const [backgroundImage, setBackgroundImage] = useState("");

	useEffect(() => {
		const imageWidth = window.innerWidth;
		const imageHeight = window.innerHeight;
		const imageUrl = `https://picsum.photos/${imageWidth}/${imageHeight}`;

		setBackgroundImage(imageUrl);
	}, []);

	return (
		<div
			style={{
				backgroundImage: `url(${backgroundImage})`,
				backgroundSize: "cover",
				minHeight: "100vh",
                minWidth: "100vw",
                position: "fixed",
                top: 0,
                left: 0,
                zIndex: -1
			}}
		/>
	);
};

export default RandomBackground
