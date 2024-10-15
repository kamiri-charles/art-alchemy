import { useState } from "react";
import ToastMessage from "../widgets/ToastMessage";

const ToastMessageWrapper: React.FC = () => {
	const [toasts, setToasts] = useState<any>([]);

	const addToast = (message: string) => {
		const id = Math.random(); // Generate a unique ID for each toast
		setToasts((prev: any) => [...prev, { id, message }]);
	};

	const removeToast = (id: string) => {
		setToasts((prev: any) => prev.filter((toast: any) => toast.id !== id));
	};

	return (
		<div className="toast-container">
			{toasts.map((toast: any) => (
				<ToastMessage
                    duration={3000}
					key={toast.id}
					message={toast.message}
					onClose={() => removeToast(toast.id)}
				/>
			))}
			<button onClick={() => addToast("New message!")}>Show Toast</button>
		</div>
	);
};

export default ToastMessageWrapper;
