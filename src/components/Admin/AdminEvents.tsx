import React from "react";
import "../../styles/admin/adminEvents.scss";

const AdminEvents: React.FC = () => {
	return (
		<div className="admin-events admin-component">
			<div className="admin-tab-title">Events</div>
			<div className="no-events">There are no events to display.</div>
		</div>
	);
};

export default AdminEvents;
