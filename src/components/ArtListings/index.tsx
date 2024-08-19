import React, { useEffect, useRef, useState } from "react";
import ArtPiece from "../ArtPiece";
import { MetroSpinner } from "react-spinners-kit";
import { ArtType, CartType } from "../../assets/utils/custom_types";
import "./styles.scss";


const ArtListings: React.FC = () => {
	const [art, setArt] = useState<ArtType[]>([]);
	const [error, setError] = useState("");
	const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
	const [loading, setLoading] = useState(false);
	const [cart, setCart] = useState<CartType>();
	const artListingsRef = useRef<HTMLDivElement>(null);

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
				setError("There was an error fething the data. Please try refreshing the page.");
				console.error("Error fetching art:", error);
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

		const handleScroll = () => {
			if (
				artListingsRef.current?.scrollTop !== undefined &&
				artListingsRef.current?.scrollTop > 10
			) document.documentElement.style.setProperty('--header-height', '80px');
				else document.documentElement.style.setProperty('--header-height', '100px');
		}

		artListingsRef.current?.addEventListener("scroll", handleScroll);

		

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
		<div className="art-listings fl-c" ref={artListingsRef}>

			{loading ? (
				<div className="loader">
					<MetroSpinner color='black' />
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
