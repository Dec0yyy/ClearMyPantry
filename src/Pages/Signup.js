import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import { auth, db } from "../firebase";
import {
	createUserWithEmailAndPassword,
	sendSignInLinkToEmail,
} from "firebase/auth";
import {
	collection,
	addDoc,
	getFirestore,
	doc,
	setDoc,
} from "firebase/firestore";

export default function Signup() {
	const [fName, setFName] = useState("");
	const [sName, setSName] = useState("");
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");
	const [cpwd, setCPwd] = useState("");

	const navigate = useNavigate();

	function getRandomInt(min, max) {
		return Math.floor(Math.random() * (max - min + 1)) + min;
	}

	const [errMsg, setErrMsg] = useState("");

	function validateEmail(email) {
		const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

		return emailPattern.test(email);
	}

	const register = async () => {
		if (
			fName.length < 1 ||
			sName.length < 1 ||
			email.length < 1 ||
			pwd.length < 1 ||
			cpwd.length < 1
		) {
			setErrMsg("Please fill out all fields.");
			return;
		}
		if (!validateEmail(email)) {
			setErrMsg("Invalid email address");
			return;
		}

		if (pwd != cpwd) {
			setErrMsg("Passwords do not match.");
			return;
		}

		try {
			const newUser = await createUserWithEmailAndPassword(auth, email, pwd);

			var today = new Date();
			var dd = String(today.getDate()).padStart(2, "0");
			var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
			var yyyy = today.getFullYear();

			today = mm + "/" + dd + "/" + yyyy;
			try {
				await setDoc(doc(db, "user_data", newUser.user.uid), {
					user_uid: newUser.user.uid,
					fName: fName,
					sName: sName,
					email: email,
					recipeBooks: [
						{ title: "Breakfast", recipes: [] },
						{ title: "Lunch", recipes: [] },
						{ title: "Dinner", recipes: [] },
						{ title: "Snacks", recipes: [] },
					],
					dosu: today,
					avatar: getRandomInt(0, 5),
				});
				navigate("/");
			} catch (e) {
				console.error("Error adding document: ", e);
			}
		} catch (error) {
			// error.message provides error from firebase.
			// this should be displayed eventually
			console.log(error.code);
			switch (error.code) {
				case "auth/weak-password":
					setErrMsg("Password must contain at least 6 characters.");
					break;
				case "auth/invalid-email":
					setErrMsg("Invalid email address.");
					break;
				case "auth/internal-error":
					setErrMsg("Invalid password.");
					break;
				case "auth/email-already-in-use":
					setErrMsg("Email address already in use.");
					break;
				default:
					setErrMsg("An unexpected error occured. Please try again.");
			}
		}
	};

	return (
		<div className="app-log-wrapper">
			<Header></Header>
			<div className="log-area">
				<p className="log-title">Welcome back!</p>
				<p
					style={{
						marginTop: 0,
						marginBottom: 20,
						width: "100%",
						textAlign: "center",
						fontSize: 15,
					}}
				>
					{errMsg}
				</p>
				<input
					placeholder="First name"
					value={fName}
					onChange={(t) => {
						setFName(t.target.value);
					}}
				/>
				<input
					placeholder="Last name"
					value={sName}
					onChange={(t) => {
						setSName(t.target.value);
					}}
				/>
				<input
					placeholder="Email"
					value={email}
					onChange={(t) => {
						setEmail(t.target.value);
					}}
				/>
				<input
					placeholder="Password"
					value={pwd}
					onChange={(t) => {
						setPwd(t.target.value);
					}}
					type="password"
				/>
				<input
					placeholder="Confirm password"
					value={cpwd}
					onChange={(t) => {
						setCPwd(t.target.value);
					}}
					type="password"
				/>
				<button onClick={register}>Sign Up</button>
				<p>
					Already have an account?{" "}
					<Link to="/login" className="log-swap-btn">
						Login now
					</Link>
				</p>
			</div>

			<Footer></Footer>
		</div>
	);
}
