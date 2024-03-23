import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArtType } from "../../assets/utils/custom_types";
import { MetroSpinner } from "react-spinners-kit";

export const CartItem: React.FC<{ id: string }> = ({ id }) => {
	const [data, setData] = useState<ArtType>();
	const [count, setCount] = useState(1);
	const [loading, setLoading] = useState(true);
	const [removedFromCart, setRemovedFromCart] = useState(false);
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
		if (count < 5) setCount(count + 1);
	};

	const decrease_count = () => {
		if (count > 1) setCount(count - 1);
	};

	return (
		<div className={`cart-item-wrapper ${removedFromCart ? 'removed': ''}`}>
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
								<span className="count">{count}</span>
								<i className="bx bx-plus fl-c-c" onClick={increase_count}></i>
							</div>
						</div>

						<div className="available">
							<i className="bx bx-info-circle"></i>
							<span>Available: 5</span>
						</div>

						<div className="price fl-c">
							<i className="bx bx-purchase-tag"></i>
							<span>Ksh. {data?.price ? data?.price * count : ""}</span>
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

						<div className="action fl-c-c" onClick={() => setRemovedFromCart(true)}>
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
