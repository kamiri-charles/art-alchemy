import { FC } from "react";
import "./styles.scss";

const Landing: FC = () => {
  return (
    <div className="landing">
        <div className="content-grid">
            <div className="partition p-1"></div>
            <div className="partition p-2"></div>
            <div className="partition p-3"></div>
        </div>
    </div>
  )
}

export default Landing