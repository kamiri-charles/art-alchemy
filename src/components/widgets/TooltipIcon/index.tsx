import "./styles.scss";
import { useState } from "react";

interface TooltipIconProps {
	name: string;
	tooltip?: string;
	size?: number;
	onClick?: (event: React.MouseEvent<HTMLDivElement>) => void;
}

const TooltipIcon: React.FC<TooltipIconProps> = ({ name, tooltip, size, onClick }) => {
	const [isHovered, setIsHovered] = useState(false);
	const iconTooltip = tooltip || "Icon";
	const iconSize = size || 30;

	return (
		<div
			className="tooltip-icon"
			onMouseEnter={() => setIsHovered(true)}
			onMouseLeave={() => setIsHovered(false)}
			onClick={onClick}
			style={{
				width: `${iconSize}px`,
				height: `${iconSize}px`,
			}}
		>
			<i
				className={`bx bx-${name}`}
				style={{
					fontSize: `${iconSize - 10}px`,
				}}
			></i>

			{isHovered && <span className="tooltip-text">{iconTooltip}</span>}
		</div>
	);
};

export default TooltipIcon;
