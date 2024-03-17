import React, { useEffect, useState } from "react";
import { useLocation } from 'react-router-dom'
import Header from "../components/Header";
import { ArtType } from "../assets/utils/custom_types";
import "../styles/Art.scss";
import { MetroSpinner } from "react-spinners-kit";

const Art: React.FC = () => {

	const [art, setArt] = useState<ArtType>();
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState('');
	const loc = useLocation();


	useEffect(() => {
		setLoading(true);

		fetch(`http://localhost:8080/api/art/${loc.state.art_id}`)
			.then((res) => res.json())
			.then((data) => {
				setArt(data);
				setLoading(false);
			})
			.catch((err) => {
				setError(
					"There was an error getting your art. Try refrshing the page. <br /> Error: " +
						err
				);
				setLoading(false);
			});
	}, [loc.state.art_id]);


	return (
		<div className="art">
			<Header />

			{loading ? (
				<>
					<div className="image-section">
						<div className="image"></div>
						<div className="actions">
							<div className="action star">
								<i className="bx bx-star"></i>
								<span>Star</span>
							</div>

							<div className="action">
								<i className="bx bx-share"></i>
								<span>Share</span>
							</div>

							<div className="action fl-c-c">
								<i className="bx bx-cart"></i>
								<span>Add to Cart</span>
							</div>
						</div>
					</div>

					<div className="art-meta">
						<div className="title-section">
							<div className="owner-img"></div>
							<div className="text-sec">
								<div className="title">Art Title</div>
								<div className="owner">By Owner</div>
							</div>
						</div>

						<div className="stats">
							<div className="stat fl-c-c">
								<i className="bx bx-star"></i>
								<span> 0 Stars</span>
							</div>

							<div className="stat fl-c-c">
								<i className="bx bx-message"></i>
								<span>0 Comments</span>
							</div>

							<div className="stat fl-c-c">
								<i className="bx bx-show"></i>
								<span>0 Views</span>
							</div>
						</div>

						<div className="tags">
							<div className="tag">Tag 1</div>
							<div className="tag">Tag 2</div>
							<div className="tag">Tag 3</div>
						</div>

						<div className="description">
							Lorem ipsum dolor sit amet consectetur adipisicing elit.
							Necessitatibus facilis laboriosam doloremque, quaerat est optio
							obcaecati ipsam et tenetur libero excepturi animi, qui id nobis a non
							temporibus quis vitae?
						</div>

						<div className="comments">
							<div className="comments-title">Comments</div>
							<div className="comments-empty">No Comments.</div>
						</div>
					</div>

					<div className="more-by-artist">
						<div className="sub-sec-title">More by artist</div>

						<div className="products">
							<div className="sub-product"></div>
							<div className="sub-product"></div>
							<div className="sub-product"></div>
							<div className="sub-product"></div>
							<div className="sub-product"></div>
							<div className="sub-product"></div>
							<div className="sub-product"></div>
							<div className="sub-product"></div>
							<div className="sub-product"></div>
							<div className="sub-product"></div>
						</div>
					</div>

					<div className="recommended">
						<div className="seb-sec-title">Recommended</div>

						<div className="products">
							<div className="sub-product"></div>
							<div className="sub-product"></div>
							<div className="sub-product"></div>
							<div className="sub-product"></div>
							<div className="sub-product"></div>
							<div className="sub-product"></div>
							<div className="sub-product"></div>
							<div className="sub-product"></div>
							<div className="sub-product"></div>
							<div className="sub-product"></div>
							<div className="sub-product"></div>
							<div className="sub-product"></div>
						</div>
					</div>
				</>
			) : <div className="loader"><MetroSpinner /></div>}
		</div>
	);
};

export default Art;
