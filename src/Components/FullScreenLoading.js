import React from "react";

import Logo from "../Assets/Logo.png";

export default function FullScreenLoading() {
	return (
		<div
			style={{
				position: "fixed",
				top: 0,
				left: 0,
				height: "100vh",
				width: "100vw",
				background: "white",
				zIndex: 6000,
				display: "flex",
				justifyContent: "center",
				alignItems: "center",
				flexDirection: "column",
			}}
		>
			<img src={Logo} style={{ height: 120, marginBottom: 30 }} />
			<div class="loading-spinner">
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
	);
}
