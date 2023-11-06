import React, { useState } from "react";
import { addDoc, collection, doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

import Logo from "../Assets/Logo.png";

export default function Footer() {
	const [email, setEmail] = useState("");

	const [errMsg, setErrMsg] = useState("");

	const subscribe = async () => {
		if (email.length == 0) {
			setErrMsg("Please enter your email.");
			return;
		}
		if (!validateEmail(email)) {
			setErrMsg("Invalid email address.");
			return;
		}
		try {
			addDoc(collection(db, "email_list"), { email: email });
			setEmail("");
			setErrMsg("Sucess! You will now recieve news from us.");
		} catch (err) {
			console.log(err);
		}
	};

	function validateEmail(email) {
		const emailPattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;

		return emailPattern.test(email);
	}

	return (
		<footer>
			<div style={{ width: "100%", display: "flex", flexWrap: "wrap" }}>
				<div
					style={{
						display: "flex",
						flexDirection: "row",
						color: "white",
						width: "50%",
						justifyContent: "space-around",
					}}
					id="footer-links"
				>
					<ul style={{ padding: 0 }}>
						<p style={{ fontWeight: "700" }}>Links</p>
						<p>Home</p>
						<p>Login</p>
						<p>Signup</p>
					</ul>
					<ul style={{ padding: 0 }}>
						<p style={{ fontWeight: "700" }}>Contact</p>
						<p>support@clearmypantry.com</p>
						<p>contact@clearmypantry.com</p>
						<p>business@clearmypantry.com</p>
					</ul>
				</div>
				<div style={{ width: "50%", color: "white" }} id="footer-sub">
					<p style={{ fontWeight: "700" }}>Get the latest news</p>
					<p>{errMsg}</p>
					<div style={{ position: "relative", width: "85%" }}>
						<input
							style={{
								width: "100%",
								height: 35,
								padding: "0px 130px 0px 10px",
								boxSizing: "border-box",
							}}
							placeholder="Email address"
							value={email}
							onChange={(e) => setEmail(e.target.value)}
						/>
						<div
							style={{
								color: "black",
								position: "absolute",
								top: 0,
								right: 0,
								height: "100%",
								display: "flex",
								justifyContent: "center",
								alignItems: "center",
								fontSize: 15,
								background: "#39b44a",
								paddingLeft: 10,
								paddingRight: 10,
								color: "white",
								cursor: "pointer",
							}}
							onClick={subscribe}
						>
							Subscribe
						</div>
					</div>
				</div>
			</div>
			<div id="footer-logo-holder">
				<img src={Logo} id="footer-logo" />
				<div
					style={{
						height: 50,
						display: "flex",
						justifyContent: "center",
						alignItems: "center",
						flexDirection: "column",
					}}
				>
					<p style={{ margin: 0, color: "white", fontSize: 13 }}>
						Created by Dominic Black
					</p>
					<a
						href="https://dominicblack.com.au"
						target="_blank"
						style={{ margin: 0, textDecoration: "none", fontSize: 13 }}
					>
						dominicblack.com.au
					</a>
				</div>
				<p style={{ color: "white" }} id="legal-text">
					© Clear My Pantry 2023
				</p>
			</div>
		</footer>
	);
}
