import React from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

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

	const nav = useNavigate();

	const addToCart = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		evt.stopPropagation();
		console.log("Product added to cart!");
	};

	return (
		<div className="art-piece" onClick={() => nav(`/art/${data.id}`)}>
			<div className="image-overlay fl-c-c">
				{data.imageData ? (
					<img src={data.imageData[0]} alt="Art image" />
				) : (
					<p>There was an error getting this image.</p>
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
					<i className="bx bx-cart fl-c-c" onClick={addToCart}></i>
				</div>
			</div>
		</div>
	);
};

export default ArtPiece;
