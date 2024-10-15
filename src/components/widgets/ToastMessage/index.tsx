import { useEffect } from "react";
import "./styles.scss";

interface ToastMessageProps {
	message: string;
	duration: number;
	onClose: () => void;
}

const ToastMessage: React.FC<ToastMessageProps> = ({
	message,
	duration,
	onClose,
}) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			onClose();
		}, duration);

		// Cleanup timer on unmount
		return () => clearTimeout(timer);
	}, [duration, onClose]);

	return <div className="toast-message">{message}</div>;
};

export default ToastMessage;
