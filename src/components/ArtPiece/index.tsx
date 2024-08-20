import React, { useRef, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArtType, CartType } from "../../assets/utils/custom_types";
import { fetch_art_image_data } from "../../api/art";
import { ImpulseSpinner } from "react-spinners-kit";
import SwiperCore from "swiper";
import "swiper/swiper-bundle.css";
import "./styles.scss";

SwiperCore.use([Navigation, Pagination, Autoplay]);

const ArtPiece: React.FC<{ data: ArtType, cart: CartType | undefined, setCart: (cart: CartType) => void }> = ({ data, cart, setCart }) => {
	
	const [inCart, setInCart] = useState(cart?.artIds.includes(data.id));
	const [imageData, setImageData] = useState<string[]>([]);
	const [imagesLoaded, setImagesLoaded] = useState(false);
	const [imageError, setImageError] = useState(false);
	const nav = useNavigate();
	const swiperRef = useRef<SwiperCore | null>(null);

	useEffect(() => {
		if (swiperRef.current) {
			swiperRef.current.update();
		}

		fetch_art_image_data(data.id)
		.then(imgData => {
			setImageData(imgData);
			setImagesLoaded(true);
		})
		.catch(err => {
			setImageError(true);
			console.error(err);
		})

	}, [data.id]);

	const updateCart = async () => {
		try {
			await fetch('https://art-alchemy-7302d99f4202.herokuapp.com/api/cart/update', {
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


	return (
		<div
			className="art-piece"
			onClick={() => nav(`/art/${data.id}`, { state: { art_id: data.id } })}
		>
			<div className="image-overlay fl-c-c">
				{imagesLoaded ? (
					<Swiper
						autoplay={{ delay: Math.floor(Math.random() * 6000 + 3000) }}
						loop={imageData.length > 3}
						onSwiper={(swiper) => (swiperRef.current = swiper)}
					>
						{imageData.map((image, index) => (
							<SwiperSlide key={index}>
								<img src={image} alt={`Art image ${index + 1}`} />
							</SwiperSlide>
						))}
					</Swiper>
				) : (
					<div className="art-image-loader">
						{imageError ? (
							<div className="image-load-error">
								<i className="bx bx-error"></i>
								<span>There was an error getting image data for this piece. <br /> Try refreshing.</span>
							</div>
						) : (
							<ImpulseSpinner backColor="#3772FF" frontColor="#DF2935" />
						)}
					</div>
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
						<i className="bx bx-check fl-c-c"></i>
					) : (
						<i
							className="bx bx-cart fl-c-c"
							onClick={(evt) => addToCart(evt, data.id)}
						></i>
					)}
				</div>
			</div>
		</div>
	);
};

export default ArtPiece;
