import "./App.css";
import React, { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { onAuthStateChanged } from "@firebase/auth";
import { auth, db } from "./firebase";
import { collection, query, where, getDocs } from "firebase/firestore";

import Home from "./Pages/Home";
import LoginPage from "./Pages/Login";
import SignupPage from "./Pages/Signup";
import AccountPage from "./Pages/Account";

function App() {
	const [loggedInUser, setLoggedInUser] = useState(null);
	const [loggedUserData, setLoggedUserData] = useState(null);

	const [pageLoading, setPageLoading] = useState(true);

	useEffect(() => {
		const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
			if (currentUser) {
				console.log("update logged in user to " + currentUser.email);
				setLoggedInUser(currentUser);
				const userData = collection(db, "user_data");
				if (currentUser.uid) {
					const q = query(userData, where("user_uid", "==", currentUser.uid));

					const querySnapshot = await getDocs(q);
					var result = {};
					querySnapshot.forEach((doc) => {
						result = doc.data();
					});
					setLoggedUserData(result);
					console.log(result);
				}
			}
			setPageLoading(false);
		});

		return () => {
			unsubscribe();
		};
	}, []);

	return (
		<Router>
			<Routes>
				<Route
					path="/"
					element={
						<Home
							loggedUserData={loggedUserData}
							setLoggedUserData={setLoggedUserData}
							pageLoading={pageLoading}
							setPageLoading={setPageLoading}
						></Home>
					}
				></Route>
				<Route
					path="/login"
					element={<LoginPage loggedUserData={loggedUserData}></LoginPage>}
				></Route>
				<Route
					path="/signup"
					element={<SignupPage loggedUserData={loggedUserData}></SignupPage>}
				></Route>
				<Route
					path="/account"
					element={
						<AccountPage
							loggedUserData={loggedUserData}
							setLoggedUserData={setLoggedUserData}
						></AccountPage>
					}
				></Route>
			</Routes>
		</Router>
	);
}

export default App;
