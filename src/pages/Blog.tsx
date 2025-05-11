import { Dispatch, FC, SetStateAction, useEffect } from "react";
import BlogOverview from "../components/widgets/BlogOverview";
import Header from "../components/Header";
import "../styles/blog.scss";

interface BlogProps {
    currentPage: string;
    headerLightBgActive: boolean;
	setHeaderLightBgActive: Dispatch<SetStateAction<boolean>>;
	setCurrentPage: Dispatch<SetStateAction<string>>;
}

const placeholder_blogs = [
	{ image_src: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b" },
	{ image_src: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b" },
	{ image_src: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b" },
	{ image_src: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b" },
	{ image_src: "https://images.unsplash.com/photo-1549880338-65ddcdfd017b" },
];

const Blog: FC<BlogProps> = ({ currentPage, headerLightBgActive, setCurrentPage, setHeaderLightBgActive }) => {
	useEffect(() => {
		setHeaderLightBgActive(true);
		setCurrentPage("blog");
	}, []);

	return (
		<div className="blog">
			<Header lightBgActive={headerLightBgActive} currentPage={currentPage} />
			<div className="blog-header">
				<div className="blog-header-text">
                    <h2>From the community</h2>
					<p>Where we draw conclusions (and sometimes doodles)</p>
				</div>
				<div className="blog-search">
					<input type="text" placeholder="Search" />
					<i className="bx bx-search"></i>
				</div>
			</div>

			<div className="blog-list">
                {placeholder_blogs.map((b, idx) => (<BlogOverview key={idx} image_src={b.image_src} />))}
            </div>
		</div>
	);
};

export default Blog;
