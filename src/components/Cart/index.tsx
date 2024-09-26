import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartType } from "../../assets/utils/custom_types";
import { MetroSpinner } from "react-spinners-kit";
import { CartItem } from "./CartItem";
import "./styles.scss";
import BreadCrumbsHeader from "../BreadCrumbsHeader";

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

				try {
					const response = await fetch(
						`https://art-alchemy-7302d99f4202.herokuapp.com/api/cart/${userId}`
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
			{
				localStorage.getItem("artAlchemyUserData") == null && (
					<div className="cart-empty fl-c-c">
						<i className="bx bx-cart"></i>
						<span>Please log in to view your cart.</span>
					</div>
				)
			}
			{loading ? (
				<div className="loader">
					<MetroSpinner />
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
							<BreadCrumbsHeader location={["Cart"]} />

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