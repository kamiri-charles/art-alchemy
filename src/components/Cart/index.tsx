import React, { useEffect, useState } from "react";
import { CartType } from "../../assets/utils/custom_types";
import "./styles.scss";
import { MetroSpinner } from "react-spinners-kit";
import { CartItem } from "./CartItem";

const Cart: React.FC = () => {

	const [cart, setCart] = useState<CartType>();
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchCart = async () => {
			setLoading(true);
			const rawUserData = localStorage.getItem("artAlchemyUserData");

			if (rawUserData != null) {
				const userId = JSON.parse(rawUserData).id;

				try {
					const response = await fetch(
						`http://localhost:8080/api/cart/${userId}`
					);
					const data = await response.json();
					setCart(data);
					setLoading(false);
				} catch (error) {
					console.error(
						"There was an error getting the cart associated with this user.",
						error
					);
					setLoading(false);
				}
			}
		};

		fetchCart();
	}, []);

	return (
		<div className="cart fl-c">
			{loading ? (
				<div className="loader"><MetroSpinner /></div>
			): (
				<>
					{cart?.artIds.length == 0 ? (
						<div className="cart-empty fl-c-c">
							<i className="bx bx-cart"></i>
							<span>The cart is currently empty.</span>
						</div>
					): (
						<>
							<div className="cart-header">
								<div className="items-count">Items ~ {cart?.artIds.length}</div>
								<div className="total">Total ~ Ksh. `TBD`</div>
								<button className="to-checkout">
									<i className="bx bx-cart"></i>
									<span>Checkout</span>
								</button>
							</div>
							{cart?.artIds.map((id, idx) => (<CartItem id={id} key={idx} />))}
						</>
					)}
				</>
			)}
		</div>
		);
};

export default Cart;
