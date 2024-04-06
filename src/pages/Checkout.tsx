import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Header from "../components/Header";
import { ArtType, OrderType } from "../assets/utils/custom_types";
import { fetch_art_by_ids } from "../api/art";
import { ImpulseSpinner, MetroSpinner } from "react-spinners-kit";
import "swiper/swiper-bundle.css";
import "../styles/checkout.scss";

const Checkout: React.FC = () => {
	const [artIds, setArtIds] = useState<string[]>();
	const [artData, setArtData] = useState<ArtType[]>();
	const [loading, setLoading] = useState(true);
	const nav = useNavigate();
	const loc = useLocation();

	const [orderSubmitting, setOrderSubmitting] = useState(false);

	// Form variables
	const [order, setOrder] = useState<OrderType>({
		id: "",
		userId: "",
		location: "Dagoretti, Nairobi", // Start with the first select option
		cardNumber: "",
		csv: "",
		email: "",
		phone: "",
		items: [],
	});

	useEffect(() => {
		setArtIds(loc.state.artIds);

		if (artIds) {
			setLoading(true);
			fetch_art_by_ids(artIds)
				.then((data) => {
					setArtData(data);
					setLoading(false);
				})
				.catch((err) => {
					console.error(
						"There was an error getting the cart associated with this user.",
						err
					);
					setLoading(false);
				});
		}
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

	const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		setOrder({
			...order,
			[e.target.name]: e.target.value,
		});
	};

	const handleCardNumberChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;
		// Remove any non-digit characters from input
		const sanitizedInput = input.replace(/\D/g, "");
		// Restrict input to 16 characters
		const truncatedInput = sanitizedInput.slice(0, 16);
		// Insert hyphens after every 4 characters, except for the last group
		const formattedInput = truncatedInput.replace(/(\d{4})(?=\d{4})/g, "$1-");

		setOrder({ ...order, cardNumber: formattedInput });
	};

	const handleCSVChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const input = e.target.value;
		// Remove any non-digit characters from input
		const sanitizedInput = input.replace(/\D/g, "");
		// Restrict input to 3 characters
		const truncatedInput = sanitizedInput.slice(0, 3);

		setOrder({ ...order, csv: truncatedInput });
	};

	const handleOrderSubmission = () => {
		// Set user id
		const x = localStorage.getItem("artAlchemyUserData");

		if (x != null) {
			const y = JSON.parse(x);

			// Set items
			const items: string[] = [];

			artIds?.forEach((id) => {
				const qty =
					localStorage.getItem(`artAlchemyCartItemQuantity${id}`) || "1";

				const item = { id: id, qty: qty };
				items.push(JSON.stringify(item));
			});

			// Update order with userId and items
			setOrder({
				...order,
				userId: y.id,
				items: items,
			});

			// Custom order variable due to some bugs with state update
			const customOrder = {
				id: "",
				userId: y.id,
				location: order.location,
				cardNumber: order.cardNumber,
				csv: order.csv,
				email: order.email,
				phone: order.phone,
				items: items,
			};

			setOrderSubmitting(true);
			// Send order to db
			try {
				fetch("http://localhost:8080/api/orders", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify(customOrder),
				}).then((res) => {
					if (res.ok) {
						// Clear cart
						fetch(`http://localhost:8080/api/cart/clear/${y.id}`);
						// Reset home navTab
						localStorage.setItem("artAlchemyCurrentNavTab", "home");
						alert("Order created successfully!");
						// Navigate to homepage
						nav("/");
					} else {
						alert("There was an error creating your order.");
						setOrderSubmitting(false);
					}
				});
			} catch (err) {
				console.error(err);
			}
		}
	};

	return (
		<div className="checkout">
			<div className={`blanket-loader ${orderSubmitting ? "visible" : ""}`}>
				<ImpulseSpinner frontColor="white" size={80} />
			</div>
			<Header />
			<div className="checkout-header">
				<div className="checkout-title">Checkout</div>

				<div className="total">Total: Ksh. {calculateTotal()}</div>
				<button className="order-btn" onClick={() => handleOrderSubmission()}>
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
											<select
												name="constituency"
												onChange={(e) =>
													setOrder({
														...order,
														location: e.target.value + ", Nairobi",
													})
												}
											>
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
											<input
												name="email"
												type="email"
												value={order.email}
												onChange={handleChange}
											/>
										</div>

										<div className="field">
											<label>Phone Number</label>
											<input
												name="phone"
												type="text"
												value={order.phone}
												onChange={handleChange}
											/>
										</div>
									</div>
								</div>

								<div className="form-section">
									<div className="section-title">Payment Information</div>
									<div className="fields">
										<div className="field">
											<label>Card Number</label>
											<input
												name="cardNumber"
												type="text"
												value={order.cardNumber}
												onChange={handleCardNumberChange}
											/>
										</div>

										<div className="field">
											<label>CSV</label>
											<input
												name="csv"
												type="text"
												value={order.csv}
												onChange={handleCSVChange}
											/>
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
												{localStorage.getItem(
													`artAlchemyCartItemQuantity${item.id}`
												) || "1"}
											</div>
										</div>
										<div className="price">
											Ksh.{" "}
											{parseInt(
												localStorage.getItem(
													`artAlchemyCartItemQuantity${item.id}`
												) || "1"
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
