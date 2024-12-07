import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./components/Profile";
import NewArt from "./pages/NewArt";
import Art from "./pages/Art";
import Checkout from "./pages/Checkout";
import Cart from "./components/Cart";

import Admin from "./pages/Admin";
import AdminSignIn from "./components/Admin/AdminSignIn";
import AdminNewUser from "./components/Admin/AdminNewUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "boxicons/css/boxicons.min.css";
import "./App.scss";

function App() {
	const notify = (message: string) => {
		toast(message);
	};

	return (
		<div className="App">
			<ToastContainer />
			<Router>
				<Routes>
					<Route path="" element={<Home notify={notify} />} />
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/new-art" element={<NewArt />} />
					<Route path="/art/:art-id" element={<Art />} />
					<Route path="/checkout" element={<Checkout />} />
					<Route path="/cart" element={<Cart />} />

					{/* Admin */}
					<Route path="/admin" element={<Admin />} />
					<Route path="/admin/sign-in" element={<AdminSignIn />} />
					<Route path="/admin/new-user" element={<AdminNewUser />} />
				</Routes>
			</Router>
		</div>
	);
}

export default App;
