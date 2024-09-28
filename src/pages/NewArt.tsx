import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import SwiperCore from "swiper";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import { MetroSpinner } from "react-spinners-kit";
import BreadCrumbsHeader from "../components/BreadCrumbsHeader";
import "swiper/swiper-bundle.css";
import "../styles/newArt.scss";

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

const NewArt: React.FC = () => {
	const [swiper, setSwiper] = useState<SwiperCore | null>(null);
	const image_upload_ref = useRef<HTMLInputElement>(null);
	const [imageFiles, setImageFiles] = useState<FileList | null>(null);
	const [formValues, setFormValues] = useState({
		title: "",
		description: "",
		tags: "",
		price: "",
	});
	const [username, setUsername] = useState("");
	const [loading, setLoading] = useState(false);

	const nav = useNavigate();

	useEffect(() => {
		const item = localStorage.getItem("artAlchemyUserData");
		if (item !== null) {
			const userData = JSON.parse(item);
			setUsername(userData.username);
		} else {
			nav("/sign-in");
		}
	}, [nav]);

	// Function to handle image upload
	const handleImageUpload = () => {
		image_upload_ref.current?.click();
	};

	// Function to handle navigation buttons
	const handleNavBtns = (direction: string) => {
		if (swiper) {
			if (direction === "prev") {
				swiper.slidePrev();
			} else {
				swiper.slideNext();
			}
		}
	};

	const readImageFile = (file: File) => {
		return new Promise<string>((resolve) => {
			const reader = new FileReader();
			reader.onload = () => {
				resolve(reader.result as string);
			};
			reader.readAsDataURL(file);
		});
	};

	// Function to submit the form
	const handleSubmit = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		setLoading(true);

		// Convert images to binary
		const imagesPromises: Promise<string>[] = [];
		if (imageFiles) {
			Array.from(imageFiles).forEach((file) => {
				imagesPromises.push(readImageFile(file));
			});

			Promise.all(imagesPromises)
				.then((images) => {
					const formData = {
						title: formValues.title,
						description: formValues.description,
						tags: formValues.tags.split(" "),
						price: formValues.price,
						imageData: images,
						stars: 0,
						comments: [],
						owner: username,
					};


					fetch("https://art-alchemy-7302d99f4202.herokuapp.com/api/art", {
						method: "POST",
						headers: {
							"Content-Type": "application/json",
						},
						body: JSON.stringify(formData)
					})
						.then(res => res.json())
						.then(() => {
							setLoading(false);
							nav('/');
						})
						
						.catch(err => {
							console.error(err);
							setLoading(false);
							alert("There was an error processing your request.")
						})
				})
				.catch((error) => {
					console.error("Error reading image files:", error);
					setLoading(false);
					alert("There was an error processing your request.");
				});
		}
	};

	return (
		<div className="new-art">
			<BreadCrumbsHeader location={["New Art"]} />
			<div className="form-wrapper">
				<Swiper
					spaceBetween={10}
					pagination={{ clickable: true }}
					allowTouchMove={false}
					onSwiper={(swiper) => setSwiper(swiper)}
				>
					{/* Slide 1 */}
					<SwiperSlide className="form-slide">
						<div className="slide-title">
							<div className="slide-catchphrase">Name That Masterpiece</div>

							<div className="slide-catch-desc">
								Where creativity begins - give your art a title and show off
								those stunning visuals!
							</div>
						</div>

						<div className="slide-content">
							<div className="field">
								<label>Title</label>
								<input
									type="text"
									placeholder="Art piece title"
									value={formValues.title}
									onChange={(e) =>
										setFormValues({ ...formValues, title: e.target.value })
									}
								/>
							</div>

							<div
								className="field image-input"
								onClick={() => handleImageUpload()}
							>
								<label>
									{/* If there are no images, display the add images text else display the names of the images in a list */}
									{imageFiles ? (
										<ul>
											{Array.from(imageFiles).map((file, index) => (
												<li key={index}>{file.name}</li>
											))}
										</ul>
									) : (
										"Add Images"
									)}
								</label>

								{imageFiles ? "" : <i className="bx bx-image"></i>}

								<input
									type="file"
									accept="image/*"
									multiple
									ref={image_upload_ref}
									onChange={(e) => setImageFiles(e.target.files)}
								/>
							</div>
						</div>
					</SwiperSlide>

					{/* Slide 2 */}
					<SwiperSlide className="form-slide">
						<div className="slide-title">
							<div className="slide-catchphrase">What's The Story?</div>

							<div className="slide-catch-desc">
								Every piece has a tale - describe yours and tag it right!
							</div>
						</div>

						<div className="slide-content">
							<div className="field">
								<label>Description</label>
								<textarea
									placeholder="Art piece description"
									value={formValues.description}
									onChange={(e) =>
										setFormValues({
											...formValues,
											description: e.target.value,
										})
									}
								></textarea>
							</div>
						</div>
					</SwiperSlide>

					{/* Slide 3 */}
					<SwiperSlide className="form-slide">
						<div className="slide-title">
							<div className="slide-catchphrase">Show Me The Money</div>

							<div className="slide-catch-desc">
								Time to seal the deal - set your price and finalize the details!
							</div>
						</div>

						<div className="slide-content">
							<div className="field">
								<label>Price</label>
								<input
									type="text"
									placeholder="Set a price"
									value={formValues.price}
									onChange={(e) =>
										setFormValues({ ...formValues, price: e.target.value })
									}
								/>
							</div>

							<div className="field">
								<label>Tags</label>
								<input
									type="text"
									placeholder="Separate with a space. (Max 8 tags)"
									value={formValues.tags}
									onChange={(e) =>
										setFormValues({ ...formValues, tags: e.target.value })
									}
								/>
							</div>

							{loading ? (
								<div className="loader">
									<MetroSpinner size={30} />
								</div>
							) : (
								<button
									className={`submit-btn ${
										formValues.title && formValues.price && imageFiles
											? ""
											: "disabled"
									}`}
									onClick={(e) => handleSubmit(e)}
								>
									Submit
								</button>
							)}
						</div>
					</SwiperSlide>

					{/* Navigation buttons */}
					<div className="slides-nav-btns">
						<div
							className="prev-slide-btn"
							onClick={() => handleNavBtns("prev")}
						>
							<i className="bx bx-chevron-left"></i>
						</div>

						<div
							className="next-slide-btn"
							onClick={() => handleNavBtns("next")}
						>
							<i className="bx bx-chevron-right"></i>
						</div>
					</div>
				</Swiper>
			</div>
		</div>
	);
};

export default NewArt;
