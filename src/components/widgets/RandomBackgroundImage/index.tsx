import { FC, useEffect, useState } from "react";
import "./styles.scss";

const RandomBackgroundImage: FC = () => {
	const [windowDims, setWindowDims] = useState<{
		width: number;
		height: number;
	} | null>(null);

	useEffect(() => {
		const updateDims = () => {
			setWindowDims({ width: window.innerWidth, height: window.innerHeight });
		};

		updateDims(); // Set initial dimensions
		window.addEventListener("resize", updateDims); // Update on resize

		return () => window.removeEventListener("resize", updateDims); // Cleanup on unmount
	}, []);

	function getRandomImageUrl(): string {
		const seed = Math.floor(Math.random() * 1000);
		const width = windowDims?.width || 600;
		const height = windowDims?.height || 400;
		return `https://picsum.photos/seed/${seed}/${width}/${height}`;
	}

	return (
		<div className="random-background-image">
			{windowDims && (
				<img
					src={getRandomImageUrl()}
					alt="Random from Picsum"
					width={windowDims.width}
					height={windowDims.height}
				/>
			)}
		</div>
	);
};

export default RandomBackgroundImage;
