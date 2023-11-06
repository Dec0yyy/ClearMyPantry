import React, { useState } from "react";
import Logo from "../Assets/Logo.png";

import { Link } from "react-router-dom";

import Avatar from "../Assets/profile-placeholder.png";

export default function Header(props) {
	return (
		<div className="app-wrapper">
			<header id="app-header">
				<Link to="/" id="header-logo-holder">
					<img src={Logo} id="header-logo" />
				</Link>
				{props.loggedUserData == null ? (
					<nav>
						<Link to="/login">
							<p style={{ marginRight: 20 }}>Login</p>
						</Link>
						<Link to="/signup">
							<p>Sign up</p>
						</Link>
					</nav>
				) : (
					<Link to="/account" id="header-account">
						<p style={{ margin: 0 }} id="username">
							{props.loggedUserData.fName} {props.loggedUserData.sName}
						</p>
						<img
							src={require("../Assets/Avatars/" +
								props.loggedUserData.avatar +
								".jpg")}
							id="header-avatar"
						/>
					</Link>
				)}
			</header>
		</div>
	);
}
