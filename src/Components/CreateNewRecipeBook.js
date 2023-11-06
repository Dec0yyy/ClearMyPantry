import React, { useState } from "react";

import CloseIcon from "../Assets/close.png";

export default function CreateNewRecipeBook(props) {
	const [newBookName, setNewBookName] = useState("");

	return (
		<div className="full-screen-popup">
			<div className="popup-content">
				<img src={CloseIcon} onClick={props.onClose} className="close-button" />
				<p className="pop-up-heading">Create A New Recipe Book</p>
				<p className="pop-up-sub">
					Recipe books work as libraries. They allow you to save your favourite
					recipes and group them by categories.{" "}
				</p>
				<input
					placeholder="Recipe Book Name"
					id="book-name-input"
					value={newBookName}
					onChange={(e) => {
						setNewBookName(e.target.value);
					}}
				/>
				<div id="pop-up-btns">
					<button
						id="book-create-btn"
						onClick={() => {
							props.createRecipeBook(newBookName);
						}}
					>
						Create
					</button>
					<button id="book-cancel-btn" onClick={props.onClose}>
						Cancel
					</button>
				</div>
			</div>
		</div>
	);
}
