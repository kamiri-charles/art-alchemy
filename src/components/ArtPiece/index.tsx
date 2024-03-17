import React, { useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SwiperCore from "swiper";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { ArtType } from "../../assets/utils/custom_types";
import "swiper/swiper-bundle.css";
import "./styles.scss";

SwiperCore.use([Navigation, Pagination, Autoplay]);


const ArtPiece: React.FC<{ data: ArtType }> = ({ data }) => {
	const nav = useNavigate();
	const swiperRef = useRef<SwiperCore | null>(null);

	useEffect(() => {
		if (swiperRef.current) {
			swiperRef.current.update();
		}
	}, [data.imageData]);

	const addToCart = (evt: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
		evt.stopPropagation();
		console.log("Product added to cart!");
	};

	return (
		<div className="art-piece" onClick={() => nav(`/art/${data.id}`, {state: {art_id: data.id}})}>
			<div className="image-overlay fl-c-c">
				{data.imageData && data.imageData.length > 0 ? (
					<Swiper
						pagination={{ clickable: true }}
						autoplay={{ delay: Math.floor(Math.random() * 3000 + 1000) }}
						loop={data.imageData.length >= 3}
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
					<i className="bx bx-cart fl-c-c" onClick={addToCart}></i>
				</div>
			</div>
		</div>
	);
};

export default ArtPiece;
