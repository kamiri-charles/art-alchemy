import React from "react";
import "./styles.scss";

type ArtType = {
	id: string;
	title: string;
	imageData: string[];
	description: string;
	tags: string;
	category: string;
	price: number;
	owner: string;
	stars: number;
	comments: string[]
};

const ArtPiece: React.FC<{ data: ArtType }> = ({ data }) => {

	return (
		<div className="art-piece">
			<div className="image-overlay fl-c-c">
				{data.imageData ? (
					<img src={data.imageData[0]} alt="Art image" />
				) : (
					<p>No image data available</p>
				)}
			</div>

			<div className="art-meta">
				<div className="title">{data.title}</div>
				<div className="owner">{data.owner}</div>

				<div className="stats">
					<div className="stat fl-c-c">
						<i className="bx bx-star"></i>
						<span className="count">{data.stars}</span>
					</div>

					<div className="stat fl-c-c">
						<i className="bx bx-message"></i>
						<span className="count">{data.comments.length}</span>
					</div>
				</div>

				<div className="actions fl-c-c">
					<div className="price">Ksh. {data.price}</div>
					<i className="bx bx-cart fl-c-c"></i>
				</div>
				
			</div>
		</div>
	);
};

export default ArtPiece;
