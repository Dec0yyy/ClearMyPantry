import React, { useState, useEffect, useRef } from "react";
import { signOut } from "@firebase/auth";

import {
	Book,
	BookOpen,
	MoreVertical,
	LogOut,
	PlusCircle,
	Plus,
} from "lucide-react";

export default function MobileAccountMenu(props) {
	const [menuOpen, setMenuOpen] = useState(false);

	useEffect(() => {
		console.log(menuOpen);
	}, [menuOpen]);

	const menuRef = useRef();
	const menuBtnRef = useRef();

	const toggleMenu = () => {
		if (menuOpen) {
			menuRef.current.style.bottom = "-428px";
			menuRef.current.style.background = "transparent";
		} else {
			menuRef.current.style.background = "white";
			menuRef.current.style.bottom = "0px";
		}
		setMenuOpen((c) => !c);
	};
	return (
		<div id="mobile-menu" ref={menuRef}>
			<div id="mobile-menu-btn" onClick={toggleMenu} ref={menuBtnRef}>
				<Book style={{ marginRight: 5 }} strokeWidth={2} />
				<p>{props.selectedBookName}</p>
				<MoreVertical
					strokeWidth={2}
					style={{ position: "absolute", right: 20 }}
				/>
			</div>

			<div id="mobile-rb-list-holder">
				<ul>
					{props.recipeBooks.map((book, idx) => {
						return (
							<li
								key={idx}
								onClick={() => {
									props.setSelectedBook(idx);
									toggleMenu();
								}}
							>
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "center",
									}}
								>
									<Book
										size={20}
										strokeWidth={1.8}
										style={{ marginRight: 5 }}
									/>

									{book.title}
								</div>
								<div style={{ fontSize: 13 }}>
									{book.recipes.length} recipes
								</div>
							</li>
						);
					})}
					<li
						onClick={() => {
							props.openPopup();
						}}
					>
						<div
							style={{
								display: "flex",
								flexDirection: "row",
								justifyContent: "center",
								alignItems: "center",
							}}
						>
							<PlusCircle
								size={20}
								strokeWidth={1.8}
								style={{ marginRight: 5 }}
							/>
							Create New
						</div>
					</li>
				</ul>
				<div
					id="mobile-logout-btn"
					onClick={() => {
						props.logout();
					}}
				>
					Sign out
					<LogOut size={18} strokeWidth={1.5} style={{ marginLeft: 5 }} />
				</div>
			</div>
		</div>
	);
}
