import React, { useState, useEffect } from "react";
import { MetroSpinner } from "react-spinners-kit";
import { ArtType } from "../../../utils/custom_types";
import "./styles.scss";

const AdminArt: React.FC = () => {
	const [art, setArt] = useState<ArtType[]>([]);
	const [currentPage, setCurrentPage] = useState(1);
	const [totalPages, setTotalPages] = useState(1);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchArt = async () => {
			setLoading(true);
			try {
				const response = await fetch(
					`https://art-alchemy-7302d99f4202.herokuapp.com/api/art?page=${currentPage - 1}&size=8`
				);
				const data = await response.json();
				setArt(data.content);
				setTotalPages(data.totalPages);
				setLoading(false);
			} catch (error) {
				console.error("Error fetching art:", error);
				setLoading(false);
			}
		};
		fetchArt();
	}, [currentPage]);

	// Implement next and previous page handlers
	const nextPage = () => {
		if (currentPage < totalPages) {
			setCurrentPage(currentPage + 1);
		}
	};

	const prevPage = () => {
		if (currentPage > 1) {
			setCurrentPage(currentPage - 1);
		}
	};

	return (
		<div className="admin-art admin-component">

			<div className="admin-tab-title">Art</div>

			{loading ? (
				<div className="art-loader">
					<MetroSpinner color="black" />
				</div>
			) : (
				<>
					{art.map((art: ArtType) => (
						<div className="admin-art-wrapper" key={art.id}>
							<div className="admin-art-img">
								<img src={art.imageData[0]} alt="Art image" />
							</div>

							<div className="admin-art-meta">
								<div className="id">{art.id}</div>
								<div className="title">{art.title}</div>
								<div className="owner">{art.owner}</div>
								<div className="price">Ksh. {art.price}</div>
							</div>

							<div className="admin-art-btns">
								<button className="remove-btn">Remove Piece</button>
							</div>
						</div>
					))}

					{art.length == 0 ? (
						<div className="art-fetch-error">
							There was an error fetching the art!
						</div>
					) : (
						<div className="pagination-btns">
							<button onClick={prevPage} disabled={currentPage === 1}>
								<i className="bx bx-chevron-left"></i>
							</button>
							<span>
								{currentPage} of {totalPages}
							</span>
							<button onClick={nextPage} disabled={currentPage === totalPages}>
								<i className="bx bx-chevron-right"></i>
							</button>
						</div>
					)}
				</>
			)}
		</div>
	);
};

export default AdminArt;
