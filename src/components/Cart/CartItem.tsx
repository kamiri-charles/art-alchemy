import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArtType, CartType } from "../../assets/utils/custom_types";
import { MetroSpinner } from "react-spinners-kit";

export const CartItem: React.FC<{id: string, cart: CartType, setCart: (cart: CartType) => void}> = ({ id, cart, setCart }) => {
	
	const [data, setData] = useState<ArtType>();
	const [quantity, setQuantity] = useState(parseInt(localStorage.getItem(`artAlchemyCartItemQuantity${id}`) || '1'));
	const [loading, setLoading] = useState(true);
	const nav = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await fetch(`http://localhost:8080/api/art/${id}`);
				const data = await response.json();
				setData(data);
				setLoading(false);
			} catch (error) {
				console.error(
					"There was an error getting the cart associated with this user.",
					error
				);
				setLoading(false);
			}
		};

		fetchData();
	}, [id]);

	const increase_count = () => {
		if (quantity < 5) {
			setQuantity(quantity + 1);
			localStorage.setItem(`artAlchemyCartItemQuantity${id}`, (quantity + 1).toString());
		}
	};

	const decrease_count = () => {
		if (quantity > 1) {
			setQuantity(quantity - 1);
			localStorage.setItem(`artAlchemyCartItemQuantity${id}`, (quantity - 1).toString());
		}
	};

	const remove_from_cart = async () => {
		localStorage.removeItem(`artAlchemyCartItemQuantity${id}`);
		
		// Optimistically update the cart state
		const tempArtIds = cart.artIds.filter((item) => item !== id);
		const updatedCart = {
			id: cart.id,
			userId: cart.userId,
			artIds: tempArtIds,
		};
		setCart(updatedCart); // Optimistically update the UI

		try {
			// Attempt to remove the item from the cart on the server
			const response = await fetch("http://localhost:8080/api/cart/update", {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify(updatedCart),
			});

			if (!response.ok) {
				// If the server request fails, revert the cart state
				throw new Error("Failed to remove item from cart");
			}

			// Item successfully removed from cart on the server
			const data = await response.json();
			setCart(data);
		} catch (error) {
			// Revert the cart state back to its previous state
			setCart(cart);
			console.error("Error removing item from cart:", error);
		}
	};

	return (
		<div className="cart-item-wrapper">
			{loading ? (
				<div className="loader">
					<MetroSpinner color="black" />
				</div>
			) : (
				<div className="cart-item">
					<div className="cart-item-image">
						<img src={data?.imageData[0]} alt="" />
					</div>
					<div className="cart-item-meta">
						<div className="title">{data?.title}</div>
						<div className="owner">{data?.owner}</div>

						<div className="quantity">
							<span>Quantity </span>
							<div className="counter">
								<i className="bx bx-minus fl-c-c" onClick={decrease_count}></i>
								<span className="count">{quantity}</span>
								<i className="bx bx-plus fl-c-c" onClick={increase_count}></i>
							</div>
						</div>

						<div className="available">
							<i className="bx bx-info-circle"></i>
							<span>Available: 5</span>
						</div>

						<div className="price fl-c">
							<i className="bx bx-purchase-tag"></i>
							<span>Ksh. {data?.price ? data?.price * quantity : ""}</span>
						</div>
					</div>

					<div className="actions">
						<div
							className="action fl-c-c"
							onClick={() =>
								nav(`/art/${data?.id}`, { state: { art_id: data?.id } })
							}
						>
							<i className="bx bx-info-circle"></i>
							<span>View</span>
						</div>

						<div className="action fl-c-c" onClick={remove_from_cart}>
							<i className="bx bx-trash-alt"></i>
							<span>Remove</span>
						</div>

						<div className="action fl-c-c">
							<i className="bx bx-money-withdraw"></i>
							<span>Negotiate</span>
						</div>
					</div>
				</div>
			)}
		</div>
	);
};
