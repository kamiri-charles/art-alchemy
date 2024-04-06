import React, { useEffect, useState, useRef } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import SwiperCore from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArtType, CartType } from "../assets/utils/custom_types";
import { fetch_art_by_id } from "../api/art";
import { MetroSpinner } from "react-spinners-kit";
import "../styles/art.scss";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const Art: React.FC = () => {
	const loc = useLocation();
	const [art, setArt] = useState<ArtType>();
	const [cart, setCart] = useState<CartType>();
	const [inCart, setInCart] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const swiperRef = useRef<SwiperCore | null>(null);

	useEffect(() => {
		setLoading(true);
		fetch_art_by_id(loc.state.art_id)
			.then((data) => {
				setArt(data);
				setLoading(false);
			})
			.catch((err) => {
				setError(
					"There was an error getting your art. Try refrshing the page. <br /> Error: " +
						err
				);
				setLoading(false);
			});

		
		const fetchCart = async () => {
			const rawUserData = localStorage.getItem("artAlchemyUserData");

			if (rawUserData != null) {
				const userId = JSON.parse(rawUserData).id;

				try {
					const response = await fetch(
						`http://localhost:8080/api/cart/${userId}`
					);
					const data = await response.json();
					setCart(data);

					if (cart?.artIds.includes(loc.state.art_id)) setInCart(true);

				} catch (error) {
					console.error(
						"There was an error getting the cart associated with this user.",
						error
					);
				}
			}
		};

		fetchCart();

		if (swiperRef.current) {
			swiperRef.current.update();
		}
	// eslint-disable-next-line react-hooks/exhaustive-deps
	}, [loc.state.art_id]);

	const updateCart = async () => {
		try {
			await fetch("http://localhost:8080/api/cart/update", {
				method: "POST",
				body: JSON.stringify(cart),
				headers: {
					"Content-Type": "application/json",
				},
			});
		} catch (error) {
			console.error(error);
		}
	};

	const addToCart = (
		evt: React.MouseEvent<HTMLElement, MouseEvent>,
		id: string
	) => {
		evt.stopPropagation();

		const tempArtIds = cart?.artIds;

		if (tempArtIds) {
			tempArtIds.push(id);
			setCart({ ...cart, artIds: tempArtIds });
			setInCart(true);

			updateCart();
		}
	};

	return (
		<div className="art">
			<Header />

			{!loading ? (
				<>
					{error.length > 0 ? (
						<div className="error-msg">{error}</div>
					) : (
						<>
							<div className="image-section">
								<div className="image">
									{art?.imageData && art.imageData.length > 0 ? (
										<Swiper
											pagination={{ clickable: true }}
											autoplay={{
												delay: Math.floor(Math.random() * 6000 + 3000),
											}}
											loop={art.imageData.length >= 3}
											onSwiper={(swiper) => (swiperRef.current = swiper)}
										>
											{art.imageData.map((image, index) => (
												<SwiperSlide key={index}>
													<img src={image} alt={`Art image ${index + 1}`} />
												</SwiperSlide>
											))}
										</Swiper>
									) : (
										<p>There was an error getting this image.</p>
									)}
								</div>

								<div className="actions">
									<div className="action star">
										<i className="bx bx-star"></i>
										<span>Star</span>
									</div>

									<div className="action">
										<i className="bx bx-share"></i>
										<span>Share</span>
									</div>

									{inCart ? (
										<div className="action fl-c-c">
											<i className="bx bx-check"></i>
											<span>Item already in cart</span>
										</div>
									) : (
										<div className="action fl-c-c" onClick={evt => addToCart(evt, loc.state.art_id)}>
											<i className="bx bx-cart"></i>
											<span>Add to Cart</span>
										</div>
									)}
								</div>
							</div>

							<div className="art-meta">
								<div className="title-section">
									<div className="owner-img">
										<i className="bx bx-user"></i>
									</div>
									<div className="text-sec">
										<div className="title">{art?.title}</div>
										<div className="owner">By {art?.owner}</div>
									</div>
								</div>

								<div className="stats">
									<div className="stat fl-c-c">
										<i className="bx bx-star"></i>
										<span>
											{art?.stars} <span className="stat-text">Stars</span>
										</span>
									</div>

									<div className="stat fl-c-c">
										<i className="bx bx-message"></i>
										<span>
											{art?.comments.length}{" "}
											<span className="stat-text">Comments</span>
										</span>
									</div>

									<div className="stat fl-c-c">
										<i className="bx bx-show"></i>
										<span>
											0 <span className="stat-text">Views</span>
										</span>
									</div>
								</div>

								<div className="tags">
									{art?.tags.map((tag, idx) => (
										<div className="tag" key={idx}>
											{tag}
										</div>
									))}
								</div>

								<div className="description">{art?.description}</div>

								<div className="comments">
									<div className="comments-title">Comments</div>
									<div className="comments-empty">No Comments.</div>
								</div>
							</div>

							<div className="more-by-artist">
								<div className="sub-sec-title">More by artist</div>

								<div className="products">
									<div className="sub-product"></div>
									<div className="sub-product"></div>
									<div className="sub-product"></div>
									<div className="sub-product"></div>
									<div className="sub-product"></div>
									<div className="sub-product"></div>
									<div className="sub-product"></div>
									<div className="sub-product"></div>
									<div className="sub-product"></div>
									<div className="sub-product"></div>
								</div>
							</div>

							<div className="recommended">
								<div className="seb-sec-title">Recommended</div>

								<div className="products">
									<div className="sub-product"></div>
									<div className="sub-product"></div>
									<div className="sub-product"></div>
									<div className="sub-product"></div>
									<div className="sub-product"></div>
									<div className="sub-product"></div>
									<div className="sub-product"></div>
									<div className="sub-product"></div>
									<div className="sub-product"></div>
									<div className="sub-product"></div>
									<div className="sub-product"></div>
									<div className="sub-product"></div>
								</div>
							</div>
						</>
					)}
				</>
			) : (
				<div className="loader">
					<MetroSpinner />
				</div>
			)}
		</div>
	);
};

export default Art;
