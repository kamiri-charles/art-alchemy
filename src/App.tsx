import { useState } from "react";
import { HashRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Shop from "./pages/Shop";
import SignIn from "./pages/SignIn";
import SignUp from "./pages/SignUp";
import Profile from "./components/Profile";
import Events from "./pages/Events";
import NewArt from "./pages/NewArt";
import Art from "./pages/Art";
import Checkout from "./pages/Checkout";
import Cart from "./components/Cart";

import Admin from "./pages/Admin";
import AdminSignIn from "./admin-lib/AdminSignIn";
import AdminNewUser from "./admin-lib/AdminNewUser";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "boxicons/css/boxicons.min.css";
import "./App.scss";
import Blog from "./pages/Blog";

function App() {
	const notify = (message: string) => {
		toast(message);
	};

	const [headerLightBgActive, setHeaderLightBgActive] = useState(false);
	const [currentPage, setCurrentPage] = useState("");

	return (
		<div className="App">
			<ToastContainer />
			<Router>
				<Routes>
					<Route
						path=""
						element={
							<Home
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
								headerLightBgActive={headerLightBgActive}
								setHeaderLightBgActive={setHeaderLightBgActive}
							/>
						}
					/>
					<Route
						path="/shop"
						element={
							<Shop
								notify={notify}
								headerLightBgActive={headerLightBgActive}
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
								setHeaderLightBgActive={setHeaderLightBgActive}
							/>
						}
					/>

					<Route
						path="/events"
						element={
							<Events
								headerLightBgActive={headerLightBgActive}
								currentPage={currentPage}
								setCurrentPage={setCurrentPage}
								setHeaderLightBgActive={setHeaderLightBgActive}
							/>
						}
					/>

					<Route
						path="/blog"
						element={
							<Blog
								currentPage={currentPage}
								headerLightBgActive={headerLightBgActive}
								setCurrentPage={setCurrentPage}
								setHeaderLightBgActive={setHeaderLightBgActive}
							/>
						}
					/>
					<Route path="/sign-in" element={<SignIn />} />
					<Route path="/sign-up" element={<SignUp />} />
					<Route path="/profile" element={<Profile />} />
					<Route path="/new-art" element={<NewArt />} />
					<Route
						path="/art/:art-id"
						element={
							<Art
								headerLightBgActive={headerLightBgActive}
								currentPage={currentPage}
								setHeaderLightBgActive={setHeaderLightBgActive}
							/>
						}
					/>
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
