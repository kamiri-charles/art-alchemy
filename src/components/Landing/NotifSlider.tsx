import { FC } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "./notif-slider.scss";

const slides = [
	{
		img: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b",
		title: "Art Show",
		desc: "Join us downtown for an evening of color, creativity, and community.",
		date: "Nov 12, 2025",
	},
	{
		img: "https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=1200&h=800&fit=crop",
		title: "Open Studio Sessions",
		desc: "Get behind the scenes and watch the creative process unfold.",
		date: "Jan 20, 2026",
	},
];

const NotifSlider: FC = () => {
	return (
		<Swiper
			modules={[Autoplay, Pagination, Navigation]}
			autoplay={{
				delay: 5000,
				disableOnInteraction: false,
				pauseOnMouseEnter: true,
			}}
			pagination={{ clickable: true }}
			loop
			className="event-slider"
		>
			{slides.map((slide, index) => (
				<SwiperSlide key={index}>
					<div
						className="slide-content"
						style={{
							backgroundImage: `url(${slide.img})`,
							backgroundSize: "cover",
							backgroundPosition: "center",
							height: "100%",
                            borderRadius: "10px",
						}}
					>
                        <div className="event-date">{slide.date}</div>
						<div className="overlay">
							<h2>{slide.title}</h2>
							<p>{slide.desc}</p>
						</div>
                        <div className="learn-more">
                            <i className="bx bx-right-arrow-alt"></i>
                        </div>
					</div>
				</SwiperSlide>
			))}
		</Swiper>
	);
};

export default NotifSlider;