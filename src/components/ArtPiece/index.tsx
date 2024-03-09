import React from "react";
import "./styles.scss";

type ArtType = {
	title: string;
	imageData: string[];
	description: string;
	tags: string;
	category: string;
	price: string;
};

const ArtPiece: React.FC<{ data: ArtType }> = ({ data }) => {

	return (
		<div className="art-piece">
			<div className="image-overlay">
				{data.imageData ? (
					<img src={data.imageData[0]} alt="Art image" />
				) : (
					<p>No image data available</p>
				)}
			</div>
		</div>
	);
};

export default ArtPiece;
