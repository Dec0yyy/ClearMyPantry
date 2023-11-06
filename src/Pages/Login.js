import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";

import Header from "../Components/Header";
import Footer from "../Components/Footer";

import { auth } from "../firebase";
import { signInWithEmailAndPassword } from "firebase/auth";

export default function Login() {
	const [email, setEmail] = useState("");
	const [pwd, setPwd] = useState("");

	const navigate = useNavigate();

	const [errMsg, setErrMsg] = useState("");

	const [isLoading, setIsLoading] = useState(false);

	const login = async () => {
		if (isLoading) return;

		if (email.length < 1 || pwd.length < 1) {
			setErrMsg("Please fill out all fields.");
			return;
		}

		setIsLoading(true);
		try {
			const user = await signInWithEmailAndPassword(auth, email, pwd);
			// add redirect to home page here
			console.log("success");
			navigate("/");
		} catch (error) {
			console.log(error.code);
			if (error.code == "auth/invalid-login-credentials") {
				setErrMsg("Invalid email/password combination.");
			} else if (error.code == "auth/wrong-password") {
				setErrMsg("Incorrect password.");
			} else if (error.code == "auth/too-many-requests") {
				setErrMsg(
					"You're doing that too often. Please wait a few minutes and try again."
				);
			} else {
				setErrMsg("An unexpected error occured. Please try again.");
			}
			setIsLoading(false);
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
				{isLoading ? (
					<div
						style={{
							width: "100%",
							display: "flex",
							justifyContent: "center",
							flexDirection: "row",
						}}
					>
						<div class="loading-spinner" style={{ width: 50, height: 50 }}>
							<div
								style={{
									width: "80%",
									height: "80%",
									background: "white",
									borderRadius: "100%",
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
								}}
							>
								<p>Loading</p>
							</div>
						</div>
					</div>
				) : (
					<button onClick={login}>Login</button>
				)}

				<p>
					Don't have an account?{" "}
					<Link to="/signup" className="log-swap-btn">
						Create account
					</Link>
				</p>
			</div>

			<Footer></Footer>
		</div>
	);
}
