import BreadCrumbsHeader from "../components/BreadCrumbsHeader";
import "../styles/checkout.scss";

const Checkout: React.FC = () => {

	return (
		<div className="checkout">
			<BreadCrumbsHeader location={["Checkout"]} />

			<div className="checkout-under-development">
				The checkout page is still under development!
			</div>

		</div>
	);
};

export default Checkout;