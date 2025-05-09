import { Dispatch, FC, SetStateAction, useEffect, useRef } from "react";
import Header from "../components/Header";
import "../styles/events.scss";
import { throttle } from "lodash";

interface EventsProps {
    headerLightBgActive: boolean;
    currentPage: string;
    setHeaderLightBgActive: Dispatch<SetStateAction<boolean>>;
    setCurrentPage: Dispatch<SetStateAction<string>>;
}

const event_img_placeholder =
	"https://images.unsplash.com/photo-1549880338-65ddcdfd017b";
const event_img_placeholder_2 =
	"https://images.unsplash.com/photo-1573497491208-6b1acb260507?w=1200&h=800&fit=crop";

const Events: FC<EventsProps> = ({headerLightBgActive, currentPage, setHeaderLightBgActive, setCurrentPage}) => {
    const eventsRef = useRef<HTMLDivElement | null>(null);
	useEffect(() => {
		setCurrentPage("events");
	}, []);

	// For handling header light state switching
	useEffect(() => {
		if (!eventsRef.current) return;

		const scrollThreshold = 50;

		const handleScroll = throttle(() => {
			if (eventsRef.current!.scrollTop > scrollThreshold) {
				setHeaderLightBgActive(true);
			} else {
				setHeaderLightBgActive(false);
			}
		}, 100);

		const landingEl = eventsRef.current;
		landingEl.addEventListener("scroll", handleScroll);

		return () => {
			landingEl.removeEventListener("scroll", handleScroll);
			handleScroll.cancel();
		};
	}, [setHeaderLightBgActive]);

	return (
		<div ref={eventsRef} className="events">
			<Header lightBgActive={headerLightBgActive} currentPage={currentPage} />

			<div className="events-page-header">
				<div className="intro">
					<h3>Drawn to culture?</h3>
					<p>
						Join us for a brush with creativity! From galleries to graffiti, our
						events will paint your week with inspiration.
					</p>
				</div>

				<div className="events-page-search">
					<input type="text" placeholder="Search" />
					<i className="bx bx-search"></i>
				</div>
			</div>

			<div className="events-list">
				<div
					className="event-overview featured"
					style={{
						backgroundImage: `url(${event_img_placeholder})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					<div className="event-date">29, Jan 2020</div>
					<div className="overlay">
						<h2>Test Title</h2>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
							quisquam provident consequatur rerum libero neque.
						</p>
					</div>
					<div className="learn-more">
						<i className="bx bx-right-arrow-alt"></i>
					</div>
				</div>
				<div
					className="event-overview"
					style={{
						backgroundImage: `url(${event_img_placeholder})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					<div className="event-date">29, Jan 2020</div>
					<div className="overlay">
						<h2>Test Title</h2>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
							quisquam provident consequatur rerum libero neque.
						</p>
					</div>
					<div className="learn-more">
						<i className="bx bx-right-arrow-alt"></i>
					</div>
				</div>
				<div className="event-overview"></div>
				<div
					className="event-overview featured"
					style={{
						backgroundImage: `url(${event_img_placeholder_2})`,
						backgroundSize: "cover",
						backgroundPosition: "center",
					}}
				>
					<div className="event-date">29, Jan 2020</div>
					<div className="overlay">
						<h2>Test Title</h2>
						<p>
							Lorem ipsum dolor sit, amet consectetur adipisicing elit. Maiores
							quisquam provident consequatur rerum libero neque.
						</p>
					</div>
					<div className="learn-more">
						<i className="bx bx-right-arrow-alt"></i>
					</div>
				</div>
			</div>
		</div>
	);
}

export default Events;