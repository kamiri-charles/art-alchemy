import React, { useEffect, useState } from "react";
import { CartType } from "../../assets/utils/custom_types";
import { MetroSpinner } from "react-spinners-kit";
import { CartItem } from "./CartItem";
import "./styles.scss";

const Cart: React.FC = () => {

	const [cart, setCart] = useState<CartType>();
	const [cartItems, setCartItems] = useState<Map<string, number>>(new Map());
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

	useEffect(() => {
    // Update the cart items state whenever the cart state changes
    if (cart) {
        const itemsMap = new Map<string, number>();
        cart.artIds.forEach((id) => {
            itemsMap.set(id, cartItems.get(id) || 1); // Default quantity to 1 if not set
        });
        setCartItems(itemsMap);
    }
}, [cart, cartItems]);

	const updateCartItemQuantity = (itemId: string, quantity: number) => {
		// Update quantity for a specific item in the cart
		const updatedItems = new Map(cartItems);
		updatedItems.set(itemId, quantity);
		setCartItems(updatedItems);
	};

	const calculateTotal = () => {
		let total = 0;
		cart?.artIds.forEach((id) => {
			const quantity = cartItems.get(id) || 1;
			// Fetch the actual price of the item from the server
			fetch(`http://localhost:8080/api/art/${id}`)
				.then((response) => response.json())
				.then((data) => {
					total += data.price * quantity;
				})
				.catch((error) => {
					console.error("There was an error getting the price of the item.", error);
				});
		});
		return total;
	}

	return (
		<div className="cart fl-c">
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
							<div className="cart-header">
								<div className="cart-title">My Cart</div>
								<div className="items-count">Items ~ {cart?.artIds.length}</div>
								<div className="total">Total ~ Ksh. {calculateTotal()}</div>
								<button className="to-checkout">
									<i className="bx bx-cart"></i>
									<span>Checkout</span>
								</button>
							</div>

							<div className="cart-items fl-c">
								{cart?.artIds.map((id, idx) => (
									<CartItem
										id={id}
										cart={cart}
										setCart={setCart}
										key={idx}
										updateCartItemQuantity={updateCartItemQuantity}
										quantity={cartItems.get(id) || 1}
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
