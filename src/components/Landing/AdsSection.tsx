import { FC } from "react";
import "./ads-section.scss";

const AdsSection: FC = () => {
  return (
		<div className="ads-section">
			<div className="ad-header">
				<div className="ad-title">
					<div className="point"></div>
					<div>Ads</div>
				</div>
				<div className="ad-btn">
					<i className="bx bx-plus"></i>
				</div>
			</div>
			<div className="ad-content">
				<div className="ad-text-1">
					Promote your products where creativity and culture converge.
				</div>
        <br />
				<div className="ad-text-2">
					It's time to draw some attention—advertise here!
				</div>
			</div>
			<div className="ad-footer">
				<span>Learn More</span>
			</div>
		</div>
	);
}

export default AdsSection;