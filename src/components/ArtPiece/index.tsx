import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import SwiperCore from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArtType, CartType } from "../../assets/utils/custom_types";
import "swiper/swiper-bundle.css";
import "./styles.scss";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const ArtPiece: React.FC<{ data: ArtType, cart: CartType | undefined, setCart: (cart: CartType) => void }> = ({ data, cart, setCart }) => {
	
	const [inCart, setInCart] = useState(cart?.artIds.includes(data.id));
	const nav = useNavigate();
	const swiperRef = useRef<SwiperCore | null>(null);

	useEffect(() => {
		if (swiperRef.current) {
			swiperRef.current.update();
		}


	}, [data.imageData]);

	const updateCart = async () => {
		try {
			await fetch('http://localhost:8080/api/cart/update', {
				method: "POST",
				body: JSON.stringify(cart),
				headers: {
					"Content-Type": "application/json",
				},
			})
			
		} catch(error) {
			console.error(error);
		}
	}

	const addToCart = (evt: React.MouseEvent<HTMLElement, MouseEvent>, id: string) => {
		evt.stopPropagation();
		
		const tempArtIds = cart?.artIds;
		
		if (tempArtIds) {
			tempArtIds.push(id);
			setCart({...cart, artIds: tempArtIds});
			setInCart(true);

			updateCart();
		}

	};

	const removeFromCart = (evt: React.MouseEvent<HTMLElement, MouseEvent>, id: string) => {
		evt.stopPropagation();
		
		const tempArtIds = cart?.artIds;
		
		if (tempArtIds) {
			// Remove the id from the array
			const idx = tempArtIds.indexOf(id);
			const tempArtIds2 = tempArtIds.splice(idx, 1);
			
			setCart({...cart, artIds: tempArtIds2});
			setInCart(false);

			updateCart();
		}
	};


	return (
		<div
			className="art-piece"
			onClick={() => nav(`/art/${data.id}`, { state: { art_id: data.id } })}
		>
			<div className="image-overlay fl-c-c">
				{data.imageData && data.imageData.length > 0 ? (
					<Swiper
						pagination={{ clickable: true }}
						autoplay={{ delay: Math.floor(Math.random() * 6000 + 3000) }}
						loop={data.imageData.length > 3}
						onSwiper={(swiper) => (swiperRef.current = swiper)}
					>
						{data.imageData.map((image, index) => (
							<SwiperSlide key={index}>
								<img src={image} alt={`Art image ${index + 1}`} />
							</SwiperSlide>
						))}
					</Swiper>
				) : (
					<p>There was an error getting this image.</p>
				)}
			</div>

			<div className="art-meta">
				<div className="title">{data.title}</div>
				<div className="owner">{data.owner}</div>

				<div className="stats">
					<div className="stat fl-c-c">
						<i className="bx bx-star"></i>
						<span className="count">{data.stars}</span>
					</div>

					<div className="stat fl-c-c">
						<i className="bx bx-message"></i>
						<span className="count">{data.comments.length}</span>
					</div>
				</div>

				<div className="actions fl-c-c">
					<div className="price">Ksh. {data.price}</div>

					{inCart ? (
						<i className="bx bx-check fl-c-c" onClick={evt => removeFromCart(evt, data.id)}></i>
					) : (
						<i className="bx bx-cart fl-c-c" onClick={evt => addToCart(evt, data.id)}></i>
					)}
				</div>
			</div>
		</div>
	);
};

export default ArtPiece;
