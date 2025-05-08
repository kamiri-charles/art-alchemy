import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import Typed from "typed.js";
import "./styles.scss";
import NotifSlider from "./NotifSlider";
import AdsSection from "./AdsSection";
import BlogOverview from "../widgets/BlogOverview";
import throttle from "lodash/throttle";


const art_related_quotes = [
	{
		quote: "Art washes away from the soul the dust of everyday life.",
		author: "Pablo Picasso",
	},
	{
		quote:
			"Life beats down and crushes the soul and art reminds you that you have one.",
		author: "Stella Adler",
	},
	{
		quote: "Every artist was first an amateur.",
		author: "Ralph Waldo Emerson",
	},
	{
		quote: "Art is not what you see, but what you make others see.",
		author: "Edgar Degas",
	},
	{ quote: "Creativity takes courage.", author: "Henri Matisse" },
	{
		quote:
			"Art enables us to find ourselves and lose ourselves at the same time.",
		author: "Thomas Merton",
	},
	{
		quote: "Art is the only way to run away without leaving home.",
		author: "Twyla Tharp",
	},
	{
		quote: "Life is the art of drawing without an eraser.",
		author: "John W. Gardner",
	},
	{
		quote: "To live a creative life, we must lose our fear of being wrong.",
		author: "Joseph Chilton Pearce",
	},
	{
		quote: "An artist is not paid for his labor but for his vision.",
		author: "James Whistler",
	},
	{ quote: "The earth without art is just 'eh'.", author: "Unknown" },
];

const placeholder_blogs = [
	{ image_src: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b" },
	{ image_src: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b" },
	{ image_src: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b" },
	{ image_src: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b" },
	{ image_src: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b" },
];

const getRandomQuote = () => art_related_quotes[Math.floor(Math.random() * art_related_quotes.length)];

interface LandingProps {
	setHeaderLightBgActive: Dispatch<SetStateAction<boolean>>;
}

const Landing: FC<LandingProps> = ({setHeaderLightBgActive}) => {
	const landingRef = useRef<HTMLDivElement | null>(null);
	const quoteRef = useRef(null);
	const authorRef = useRef(null);

	useEffect(() => {
		const { quote, author } = getRandomQuote();

		const typedQuote = new Typed(quoteRef.current, {
			strings: [quote],
			typeSpeed: 10,
			showCursor: false,
			onComplete: () => {
				new Typed(authorRef.current, {
					strings: [`~ ${author}`],
					typeSpeed: 10,
					startDelay: 300,
					showCursor: false,
				});
			},
		});

		return () => {
			typedQuote.destroy();
		};
	}, []);

	// For handling header light state switching
	useEffect(() => {
		if (!landingRef.current) return;

		const scrollThreshold = 200;

		const handleScroll = throttle(() => {
			if (landingRef.current!.scrollTop > scrollThreshold) {
				setHeaderLightBgActive(true);
			} else {
				setHeaderLightBgActive(false);
			}
		}, 100);

		const landingEl = landingRef.current;
		landingEl.addEventListener("scroll", handleScroll);

		return () => {
			landingEl.removeEventListener("scroll", handleScroll);
			handleScroll.cancel();
		};
	}, [setHeaderLightBgActive]);



	return (
		<div className="landing" ref={landingRef}>
			<div className="content-grid">
				<div className="partition p-1">
					<div className="typed-quote" ref={quoteRef}></div>
					<br />
					<div className="typed-author" ref={authorRef}></div>
				</div>
				<div className="partition p-2">
					<NotifSlider />
				</div>
				<div className="partition p-3">
					<AdsSection />
				</div>
				<div className="partition p-4">
					<div className="shop-text">Shop</div>
					<div className="shop-link">
						See all picks <i className="bx bx-right-arrow-alt"></i>
					</div>
				</div>
			</div>

			<div className="lp-blog-section-title">
				<h1>From the Blog</h1>
				<div>Curated just for you</div>
			</div>

			<div className="lp-from-the-blog">
				{placeholder_blogs.map((blog, idx) => (
					<BlogOverview key={idx} image_src={blog.image_src} />
				))}
			</div>

			<div className="footer">
				<div className="about-section">
					<div className="about-title">Art Alchemy</div>
					<div className="about-content">
						A space to explore, share, and celebrate art in all its forms — from
						sketches to masterpieces
					</div>
				</div>
				<div className="newsletter-sub">
					<span>Get Updates</span>
					<div className="nr-sub-field">
						<input type="email" placeholder="Enter your email" required />
						<button className="nr-sub-button">Subscribe</button>
					</div>

					<div className="socials">
						<div className="social">
							<i className="bx bxl-instagram"></i>
						</div>
						<div className="social">
							<i className="bx bxl-tiktok"></i>
						</div>
						<div className="social">
							<i className="bx bxl-facebook"></i>
						</div>
						<div className="social">
							<i className="bx bxl-discord-alt"></i>
						</div>
						<div className="social">
							<i className="bx bxl-youtube"></i>
						</div>
					</div>
				</div>

				<div className="trademark">©2025 Art Alchemy. All Rights Reserved</div>
				<div className="co-links">
					<div className="co-link">Privacy Policy</div>
					<div className="co-link">Terms of Service</div>
				</div>
			</div>
		</div>
	);
};

export default Landing;
