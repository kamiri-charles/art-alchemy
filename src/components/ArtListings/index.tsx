import React, { useEffect, useState } from "react";
import ArtPiece from "../ArtPiece";
import { MetroSpinner } from "react-spinners-kit";
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
	comments: string[];
};

const ArtListings: React.FC = () => {
	const [art, setArt] = useState<ArtType[]>();
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setLoading(true);
		
		fetch("http://localhost:8080/api/art/")
		.then((res) => res.json())
		.then((data) => setArt(data))
		.catch((err) => {
			setError("There was an error getting your art. Try refrshing the page. <br /> Error: " + err);
		});

		setLoading(false);
	}, []);

	return (
		<div className="art-listings fl-c">
			{loading ? (
				<div className="loader"><MetroSpinner /></div>
			): (
				<div className="pieces">
					{error.length > 0 ? (
						<div className="error">{error}</div>
					) : (
						<>
						{art?.map(piece => <ArtPiece data={piece} key={piece.id} />)}
						</>
					)}
				</div>
			)}
		</div>
	);
};

export default ArtListings;
