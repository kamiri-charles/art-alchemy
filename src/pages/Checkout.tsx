import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import SwiperCore from "swiper";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArtType } from "../assets/utils/custom_types";
import { MetroSpinner } from "react-spinners-kit";
import "swiper/swiper-bundle.css";
import "../styles/checkout.scss";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const Checkout: React.FC = () => {
	const [swiper, setSwiper] = useState<SwiperCore | null>(null);
	const [artIds, setArtIds] = useState([]);
	const [artData, setArtData] = useState<ArtType[]>();
	const [loading, setLoading] = useState(true);
	const nav = useNavigate();
	const loc = useLocation();

	useEffect(() => {
		setArtIds(loc.state.artIds);

		const fetchArtData = async () => {
			setLoading(true);

			try {
				const response = await fetch("http://localhost:8080/api/art/ids", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(artIds),
				});

				const data = await response.json();
				setArtData(data);
				setLoading(false);
			} catch (error) {
				console.error(
					"There was an error getting the cart associated with this user.",
					error
				);
				setLoading(false);
			}
		};

		fetchArtData();
	}, [artIds, loc]);

	const calculateTotal = () => {
		let t = 0;

		artData?.forEach(piece => {
			const qty = parseInt(localStorage.getItem(`artAlchemyCartItemQuantity${piece.id}`) || '1');
			t += qty * piece.price;
		})

		return t;
	}


	// Function to handle navigation buttons
	const handleNavBtns = (direction: string) => {
		if (swiper) {
			if (direction === "prev") {
				swiper.slidePrev();
			} else {
				swiper.slideNext();
			}
		}
	};

	return (
		<div className="checkout">
			<Header />
			<div className="checkout-header">
				<div className="checkout-title">Checkout</div>

				<div className="total">Total: Ksh. {calculateTotal()}</div>
				<button className="order-btn" onClick={() => nav("/order-successful")}>
					Order
				</button>
				<button className="cart-btn" onClick={() => nav("/")}>
					Cart
				</button>
			</div>

			<div className="checkout-wrapper">
				{loading ? (
					<div className="loader">
						<MetroSpinner />
					</div>
				) : (
					<Swiper
						pagination={{ clickable: true }}
						onSwiper={(swiper) => setSwiper(swiper)}
					>
						<SwiperSlide className="checkout-slide">
							<div className="checkout-slide-content">
								<div className="checkout-slide-title">Items</div>

								<div className="items">
									{artData?.map((item, idx) => (
										<div className="item" key={idx}>
											<div className="item-image">
												<img src={item.imageData[0]} alt="" />
											</div>

											<div className="item-title">{item.title}</div>

											<div className="item-quantity">
												Qty:{" "}
												{localStorage.getItem(
													`artAlchemyCartItemQuantity${item.id}`
												)}
											</div>

											<div className="item-price">
												Price: Ksh.{" "}
												{parseInt(
													localStorage.getItem(
														`artAlchemyCartItemQuantity${item.id}`
													) || "1"
												) * item.price}
											</div>
										</div>
									))}
								</div>
							</div>
						</SwiperSlide>

						<SwiperSlide className="checkout-slide">
							<div className="checkout-slide-content">
								<div className="checkout-slide-title">Location</div>
							</div>
						</SwiperSlide>

						<SwiperSlide className="checkout-slide">
							<div className="checkout-slide-content">
								<div className="checkout-slide-title">Payment</div>
							</div>
						</SwiperSlide>

						{/* Navigation buttons */}
						<div className="slides-nav-btns">
							<div
								className="prev-slide-btn"
								onClick={() => handleNavBtns("prev")}
							>
								<i className="bx bx-chevron-left"></i>
							</div>

							<div
								className="next-slide-btn"
								onClick={() => handleNavBtns("next")}
							>
								<i className="bx bx-chevron-right"></i>
							</div>
						</div>
					</Swiper>
				)}
			</div>
		</div>
	);
};

export default Checkout;
