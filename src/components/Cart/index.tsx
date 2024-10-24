import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartType } from "../../utils/custom_types";
import { MetroSpinner } from "react-spinners-kit";
import { CartItem } from "./CartItem";
import BreadCrumbsHeader from "../BreadCrumbsHeader";
import { fetch_user_cart } from "../../api/cart";
import "./styles.scss";

const Cart: React.FC = () => {

	const [cart, setCart] = useState<CartType>();
	const [loading, setLoading] = useState(true);
	const nav = useNavigate();

	useEffect(() => {
		const fetchCart = async () => {
			setLoading(true);
			const rawUserData = localStorage.getItem("artAlchemyUserData");

			if (rawUserData != null) {
				const userId = JSON.parse(rawUserData).id;

				fetch_user_cart(userId)
					.then(data => {
						setCart(data);
						setLoading(false);
					})
					.catch(err => {
						console.error(
							"There was an error getting the cart associated with this user.",
							err
						);
						setLoading(false);
					})
			}
		};

		fetchCart();
	}, []);

	return (
		<div className="cart fl-c">
			<BreadCrumbsHeader location={["Cart"]} />
			{
				localStorage.getItem("artAlchemyUserData") == null && (
					<div className="cart-empty fl-c-c">
						<i className="bx bx-cart"></i>
						<span>Please log in to view your cart.</span>
					</div>
				)
			}

			{loading ? (
				<div className="cart-loader">
					<MetroSpinner color="black" />
				</div>
			) : (
				<>
					{cart?.artIds.length == 0 ? (
						<div className="cart-empty fl-c-c">
							<i className="bx bx-cart"></i>
							<span>The cart is currently empty.</span>
						</div>
					) : (
						<>
							<div className="cart-header">
								<div className="cart-header-text">
									My Cart - {cart?.artIds.length} items
								</div>
								<div className="cart-header-right">
									<div className="total"></div>
									<button className="to-checkout" onClick={() => nav("/checkout")}>Checkout</button>
								</div>
							</div>

							<div className="cart-items">
								{cart?.artIds.map((id, idx) => (
									<CartItem
										id={id}
										cart={cart}
										setCart={setCart}
										key={idx}
									/>
								))}
							</div>
						</>
					)}
				</>
			)}
		</div>
	);
};

export default Cart;