import React from "react";
import "./styles.scss";
import { useNavigate } from "react-router-dom";

const BreadCrumbsHeader: React.FC<{location: string[]}> = ({location = []}) => {

    const nav = useNavigate();

	return (
    <div className="breadcrumbs-header">
        <div className="home-link" onClick={() => nav('/')}>Art Alchemy</div>

        {location.map((loc, index) => (
            <div className="breadcrumbs" key={index}>
                <i className="bx bx-chevron-right"></i>
                <div className="location">{loc}</div>
            </div>
        ))}

    </div>
    );
};

export default BreadCrumbsHeader;
