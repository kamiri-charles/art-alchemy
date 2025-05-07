import { FC } from "react";
import "./styles.scss"

interface BlogOverviewProps {
	image_src: string;
}

const BlogOverview: FC<BlogOverviewProps> = ({image_src}) => {
  return (
		<div className="blog-overview">
			<div
				className="blog-image"
				style={{
					backgroundImage: `url(${image_src})`,
					backgroundSize: "cover",
					backgroundPosition: "center",
					height: "100%",
				}}
			></div>
			<div className="blog-meta">
				<div className="publish-date">20 Jan, 2024</div>
				<div className="point-separator"></div>
				<div className="read-duration">10 mins read</div>
			</div>
			<div className="blog-title">Lorem ipsum dolor sit amet consectetur.</div>
			<div className="blog-desc">
				Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptatem,
				laboriosam illum. Id adipisci dolores molestiae sequi, iste nam!
			</div>
			<div className="blog-author">
				<div className="author-image">
					<i className="bx bx-user"></i>
				</div>
				<div className="author-name">John Doe</div>
			</div>
		</div>
	);
}

export default BlogOverview