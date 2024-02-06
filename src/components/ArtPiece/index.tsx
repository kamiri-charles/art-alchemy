import React, { useState, useEffect} from 'react'
import './styles.scss'

interface ArtPieceProps {
  imageData: ArrayBuffer | null
}

const ArtPiece: React.FC<ArtPieceProps> = ({ imageData }) => {
  const [imageSrc, setImageSrc] = useState<string | null>(null);

	useEffect(() => {
		if (imageData) {
			// Convert binary data to a URL
			const imageUrl = URL.createObjectURL(new Blob([imageData]));
			setImageSrc(imageUrl);

			// Cleanup function to revoke the URL when component is unmounted
			return () => URL.revokeObjectURL(imageUrl);
		} else {
			setImageSrc(null);
		}
	}, [imageData]);
  return (
		<div className="art-piece">
			<div className="image-overlay">
				{imageSrc ? (
					<img src={imageSrc} alt="Database Image" />
				) : (
					<p>No image data available</p>
				)}
			</div>
		</div>
	);
}

export default ArtPiece