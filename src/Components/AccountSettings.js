import React, { useState, useEffect } from "react";
import { doc, setDoc } from "firebase/firestore";
import { db } from "../firebase";

import AvatarZero from "../Assets/Avatars/0.jpg";
import AvatarOne from "../Assets/Avatars/1.jpg";
import AvatarTwo from "../Assets/Avatars/2.jpg";
import AvatarThree from "../Assets/Avatars/3.jpg";
import AvatarFour from "../Assets/Avatars/4.jpg";
import AvatarFive from "../Assets/Avatars/5.jpg";

export default function AccountSettings(props) {
	const [originalAvatar, setOriginalAvatar] = useState(
		props.loggedUserData.avatar
	);
	const [displayAvatarSave, setDisplayAvatarSave] = useState(false);

	useEffect(() => {
		if (props.loggedUserData.avatar != originalAvatar) {
			setDisplayAvatarSave(true);
		}
	}, [props.loggedUserData.avatar]);

	const saveAvatar = async () => {
		const userRef = doc(db, "user_data", props.loggedUserData.user_uid);
		try {
			setDoc(userRef, { avatar: props.loggedUserData.avatar }, { merge: true });
			setDisplayAvatarSave(false);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div id="settings-content">
			<div id="avatar-select-area">
				<p style={{ fontWeight: "700", fontSize: "1.1em" }}>Avatar</p>
				<div id="avatar-list">
					<div className="avatar-select-option">
						<img
							src={AvatarZero}
							className={props.loggedUserData.avatar == 0 ? "selected" : ""}
							onClick={() => {
								props.setLoggedUserData({ ...props.loggedUserData, avatar: 0 });
							}}
						/>
					</div>
					<div className="avatar-select-option">
						<img
							src={AvatarOne}
							className={props.loggedUserData.avatar == 1 ? "selected" : ""}
							onClick={() => {
								props.setLoggedUserData({ ...props.loggedUserData, avatar: 1 });
							}}
						/>
					</div>
					<div className="avatar-select-option">
						<img
							src={AvatarTwo}
							className={props.loggedUserData.avatar == 2 ? "selected" : ""}
							onClick={() => {
								props.setLoggedUserData({ ...props.loggedUserData, avatar: 2 });
							}}
						/>
					</div>
					<div className="avatar-select-option">
						<img
							src={AvatarThree}
							className={props.loggedUserData.avatar == 3 ? "selected" : ""}
							onClick={() => {
								props.setLoggedUserData({ ...props.loggedUserData, avatar: 3 });
							}}
						/>
					</div>
					<div className="avatar-select-option">
						<img
							src={AvatarFour}
							className={props.loggedUserData.avatar == 4 ? "selected" : ""}
							onClick={() => {
								props.setLoggedUserData({ ...props.loggedUserData, avatar: 4 });
							}}
						/>
					</div>
					<div className="avatar-select-option">
						<img
							src={AvatarFive}
							className={props.loggedUserData.avatar == 5 ? "selected" : ""}
							onClick={() => {
								props.setLoggedUserData({ ...props.loggedUserData, avatar: 5 });
							}}
						/>
					</div>
				</div>
				{displayAvatarSave && (
					<button id="avatar-save-btn" onClick={saveAvatar}>
						Save
					</button>
				)}
			</div>
			<p style={{ fontWeight: "700", fontSize: "1.1em" }}>Details</p>
			<div id="details-content">
				<p className="details-subheading">Name:</p>
				<p>
					{props.loggedUserData.fName} {props.loggedUserData.sName}
				</p>
				<p></p>
				<p className="details-subheading">E-mail</p>
				<p>{props.loggedUserData.email}</p>
				<p className="details-subheading">Sign up date</p>
				<p>{props.loggedUserData.dosu}</p>
			</div>
		</div>
	);
}
