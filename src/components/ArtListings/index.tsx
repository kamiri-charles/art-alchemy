import React, { useEffect, useState } from "react";
import ArtPiece from "../ArtPiece";
import { MetroSpinner } from "react-spinners-kit";
import { ArtType, CartType } from "../../assets/utils/custom_types";
import "./styles.scss";


const ArtListings: React.FC = () => {
	const [art, setArt] = useState<ArtType[]>([]);
	const [error, setError] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
	const [searchTerm, setSearchTerm] = useState('');
	const [loading, setLoading] = useState(false);
	const [cart, setCart] = useState<CartType>();

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
				console.error("Error fetching users:", error);
				setLoading(false);
			}
		};
		fetchArt();

		const fetchCart = async () => {
			const rawUserData = localStorage.getItem("artAlchemyUserData");

			if (rawUserData != null) {
				const userId = JSON.parse(rawUserData).id;

				try {
					const response = await fetch(
						`https://art-alchemy-7302d99f4202.herokuapp.com/api/cart/${userId}`
					);
					const data = await response.json();
					setCart(data);
					
				} catch (error) {
					console.error(
						"There was an error getting the cart associated with this user.",
						error
					);
				}
			}
		};

		fetchCart();

		

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

	const handleSearch = async () => {
		setLoading(true);
		try {
			const response = await fetch(
				`https://art-alchemy-7302d99f4202.herokuapp.com/api/art/search?query=${searchTerm}`
			);
			const data = await response.json();
			setArt(data);
		} catch (err) {
			setError("There was an error getting your art. Try refreshing the page.");
			console.error(err);
		}
		setLoading(false);
	};

	return (
		<div className="art-listings fl-c">

			<div className="searchbar">
				<input type="text" placeholder="Search" value={searchTerm} onChange={e => setSearchTerm(e.target.value)} />
				<i className="bx bx-search" onClick={() => handleSearch}></i>
			</div>

			{loading ? (
				<div className="loader">
					<MetroSpinner />
				</div>
			) : (
				<div className="pieces">
					{error.length > 0 ? (
						<div className="error">{error}</div>
					) : (
						<>
							{art?.map((piece) => (
								<ArtPiece data={piece} cart={cart} setCart={setCart} key={piece.id} />
							))}
						</>
					)}
				</div>
			)}

			{totalPages > 1 ? (
				<div className="navigation-btns">
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
			) : (
				""
			)}
		</div>
	);
};

export default ArtListings;
