import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArtType, CartType } from "../../assets/utils/custom_types";

export const CartItem: React.FC<{id: string, cart: CartType, setCart: (cart: CartType) => void}> = ({ id, cart, setCart }) => {
	
	const [data, setData] = useState<ArtType>();
	const [quantity, setQuantity] = useState(parseInt(localStorage.getItem(`artAlchemyCartItemQuantity${id}`) || '1'));
	const [loading, setLoading] = useState(true);
	const nav = useNavigate();

	useEffect(() => {
		const fetchData = async () => {
			setLoading(true);
			try {
				const response = await fetch(`https://art-alchemy-7302d99f4202.herokuapp.com/api/art/${id}`);
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
			const response = await fetch("https://art-alchemy-7302d99f4202.herokuapp.com/api/cart/update", {
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
		<div className="cart-item">
			<div className="item-meta">
				<div className="item-img">
					<img src={data?.imageData[0]} alt="" />
				</div>

				<div className="item-sub-meta">
					<div className="item-title">{data?.title}</div>
					<div className="item-price">Ksh. {data?.price}</div>
				</div>
			</div>
		</div>
	);
};
