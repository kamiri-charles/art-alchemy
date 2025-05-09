import { useEffect, useState, useRef, FC, Dispatch, SetStateAction } from "react";
import { useLocation } from "react-router-dom";
import Header from "../components/Header";
import SwiperCore from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArtType, CartType } from "../utils/custom_types";
import { fetch_art_by_id } from "../api/art";
import { MetroSpinner } from "react-spinners-kit";
import "../styles/art.scss";
import { throttle } from "lodash";

SwiperCore.use([Navigation, Pagination, Autoplay]);

interface ArtProps {
	headerLightBgActive: boolean;
	currentPage: string;
	setHeaderLightBgActive: Dispatch<SetStateAction<boolean>>;
}

const Art: FC<ArtProps> = ({headerLightBgActive, currentPage, setHeaderLightBgActive}) => {
	const loc = useLocation();
	const [art, setArt] = useState<ArtType>();
	const [cart, setCart] = useState<CartType>();
	const [inCart, setInCart] = useState(false);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState("");
	const swiperRef = useRef<SwiperCore | null>(null);
	const artRef = useRef<HTMLDivElement | null>(null);

	useEffect(() => {
		setLoading(true);
		fetch_art_by_id(loc.state.art_id)
			.then((data) => {
				setArt(data);
				setLoading(false);
			})
			.catch((err) => {
				setError(
					"There was an error getting your art. Try refrshing the page."
				);
				console.error(err);
				setLoading(false);
			});

		const fetchCart = async () => {
			const rawUserData = localStorage.getItem("artAlchemyUserData");

			if (rawUserData != null) {
				const userId = JSON.parse(rawUserData).id;

				try {
					const response = await fetch(
						`https://art-alchemy-backend.onrender.com/api/cart/${userId}`
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
	}, [loc.state.art_id]);

	// For handling header light state switching
	useEffect(() => {
		if (!artRef.current) return;

		const scrollThreshold = 50;

		const handleScroll = throttle(() => {
			if (artRef.current!.scrollTop > scrollThreshold) {
				setHeaderLightBgActive(true);
			} else {
				setHeaderLightBgActive(false);
			}
		}, 100);

		const landingEl = artRef.current;
		landingEl.addEventListener("scroll", handleScroll);

		return () => {
			landingEl.removeEventListener("scroll", handleScroll);
			handleScroll.cancel();
		};
	}, [setHeaderLightBgActive]);

	const updateCart = async () => {
		try {
			await fetch("https://art-alchemy-backend.onrender.com/api/cart/update", {
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
		<div ref={artRef} className="art">
			<Header lightBgActive={headerLightBgActive} currentPage={currentPage} />

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
													<div
														className="slide-content"
														style={{
															backgroundImage: `url(${image})`,
															backgroundSize: "contain",
															backgroundPosition: "center",
														}}
													></div>
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
										<div
											className="action fl-c-c"
											onClick={(evt) => addToCart(evt, loc.state.art_id)}
										>
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
										<div className="title">
											{art?.title} <span>|</span>
											<div className="stats">
												<div className="stat">
													<i className="bx bx-show"></i>
													<span>{art?.views}</span>
												</div>

												<div className="stat">
													<i className="bx bx-star"></i>
													<span>{art?.views}</span>
												</div>

												<div className="stat">
													<i className="bx bx-message"></i>
													<span>{art?.comments.length}</span>
												</div>
											</div>
										</div>
										<div className="owner">{art?.owner}</div>
									</div>
								</div>

								<div className="tags">
									{art?.tags.map((tag, idx) => (
										<div className="tag" key={idx}>
											{tag}
										</div>
									))}
								</div>

								<div className="description-label">Description</div>
								<div className="description">{art?.description}</div>

								<div className="comments">
									<div className="comments-title">Comments</div>
									<div className="comments-empty">No comments</div>
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
								<div className="sub-sec-title">Recommended</div>

								<div className="products">
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
					<MetroSpinner color="black" />
				</div>
			)}
		</div>
	);
};

export default Art;
