import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { ArtType } from "../assets/utils/custom_types";
import { MetroSpinner } from "react-spinners-kit";
import "swiper/swiper-bundle.css";
import "../styles/checkout.scss";

const Checkout: React.FC = () => {
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

		artData?.forEach((piece) => {
			const qty = parseInt(
				localStorage.getItem(`artAlchemyCartItemQuantity${piece.id}`) || "1"
			);
			t += qty * piece.price;
		});

		return t;
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
					<>
						<div className="left">
							<div className="left-title">Getting your order</div>

							<form>
								<div className="form-section">
									<div className="section-title">Shipping Information</div>

									<div className="fields">
										<div className="field">
											<label>City</label>
											<input
												type="text"
												value="Nairobi"
												contentEditable={false}
											/>
										</div>

										<div className="field">
											<label>Constituency</label>
											<select name="constituency">
												<option value="Dagoretti">Dagoretti</option>
												<option value="Embakasi">Embakasi</option>
												<option value="Kamukunji">Kamukunji</option>
												<option value="Kasarani">Kasarani</option>
												<option value="Kibra">Kibra</option>
												<option value="Langata">Langata</option>
												<option value="Makadara">Makadara</option>
												<option value="Mathare">Mathare</option>
												<option value="Nairobi West">Nairobi West</option>
												<option value="Roysambu">Roysambu</option>
												<option value="Ruaraka">Ruaraka</option>
												<option value="Starehe">Starehe</option>
												<option value="Westlands">Westlands</option>
											</select>
										</div>
									</div>
								</div>

								<div className="form-section">
									<div className="section-title">Contact Information</div>

									<div className="fields">
										<div className="field">
											<label>Email</label>
											<input type="email" />
										</div>

										<div className="field">
											<label>Phone Number</label>
											<input type="text" />
										</div>
									</div>
								</div>

								<div className="form-section">
									<div className="section-title">Payment Information</div>
									<div className="fields">
										<div className="field">
											<label>Card Number</label>
											<input type="text" />
										</div>

										<div className="field">
											<label>CSV</label>
											<input type="text" />
										</div>
									</div>
								</div>
							</form>
						</div>

						<div className="right">
							<div className="right-title">Order Summary</div>

							<div className="summary">
								{artData?.map((item, idx) => (
									<div className="item" key={idx}>
										<div className="item-image">
											<img src={item.imageData[0]} alt="" />
										</div>
										<div className="item-meta">
											<div className="title">{item.title.slice(0, 40)}...</div>
											<div className="quantity">
												Qty:{" "}
												{localStorage.getItem(`artAlchemyCartItem${item.id}`) || '1'}
											</div>
										</div>
										<div className="price">
											Ksh.{" "}
											{parseInt(
												localStorage.getItem(`artAlchemyCartItem${item.id}`) ||
													"1"
											) * item.price}
										</div>
									</div>
								))}
							</div>

							<div className="total">
								<span>Total</span>
								<span>Ksh. {calculateTotal()}</span>
							</div>
						</div>
					</>
				)}
			</div>
		</div>
	);
};

export default Checkout;
