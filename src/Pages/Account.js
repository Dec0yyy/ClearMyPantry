import React, { useState, useEffect, useRef } from "react";
import { db, auth } from "../firebase";
import { doc, setDoc } from "firebase/firestore";
import { Link } from "react-router-dom";
import { signOut } from "@firebase/auth";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import Header from "../Components/Header";
import Footer from "../Components/Footer";
import Popup from "../Components/CreateNewRecipeBook";
import MobileMenu from "../Components/MobileAccountMenu";
import AccountSettings from "../Components/AccountSettings";

import {
	Save,
	Pencil,
	XCircle,
	MoreVertical,
	Book,
	BookOpen,
	PlusCircle,
	Settings,
	LogOut,
	Trash2,
} from "lucide-react";

export default function Account(props) {
	const navigate = useNavigate();

	const logout = async () => {
		await signOut(auth);
		window.location.reload(false);
	};

	const [recipeBooks, setRecipeBooks] = useState([]);
	const [viewState, setViewState] = useState("book");

	const [selectedBook, setSelectedBook] = useState(0);
	const [selectedBookName, setSelectedBookName] = useState("");
	const [renameModeDisabled, setRenameModeDisabled] = useState(true);
	const bookHeadingRef = useRef();

	const [isPopupVisible, setPopupVisible] = useState(false);

	const openPopup = () => setPopupVisible(true);
	const closePopup = () => setPopupVisible(false);

	useEffect(() => {
		if (!props.loggedUserData) {
			navigate("/");
			return;
		}
		if (props.loggedUserData.recipeBooks) {
			setRecipeBooks(props.loggedUserData.recipeBooks);
			setSelectedBookName(props.loggedUserData.recipeBooks[selectedBook].title);
		}
	}, [props.loggedUserData]);

	useEffect(() => {
		if (recipeBooks.length > 0) {
			setSelectedBookName(recipeBooks[selectedBook].title);
		}
		setRenameModeDisabled(true);
	}, [selectedBook]);

	useEffect(() => {
		if (bookHeadingRef.current) {
			bookHeadingRef.current.style.width =
				bookHeadingRef.current.value.length + "ch";
		}
	}, [selectedBookName]);

	useEffect(() => {
		async function getUpdatedImages() {
			let tempRecipeBooks = recipeBooks;
			for (let i = 0; i < recipeBooks.length; i++) {
				for (let j = 0; j < recipeBooks[i].recipes.length; j++) {
					console.log(recipeBooks[i].recipes);
					const apiUrl = `https://api.edamam.com/search?q=${recipeBooks[i].recipes[j].recipeId}&app_id=${APP_ID}&app_key=${APP_KEY}`;
					// Make the GET request
					axios
						.get(apiUrl)
						.then((response) => {
							// Handle the successful response
							tempRecipeBooks[i].recipes[j].recipeImage =
								response.data.hits[0].recipe.image;
						})
						.catch((error) => {
							// Handle any errors
							console.error("Error fetching data:", error);
						});
				}
			}
		}
		if (recipeBooks.length > 0) {
			getUpdatedImages();
		}
	}, [recipeBooks]);

	const displayRecipeMenu = (elem) => {
		console.log(elem.offsetParent.nextElementSibling);
		elem.offsetParent.nextElementSibling.style.display = "block";
	};
	const hideRecipeMenu = (elem) => {
		elem.offsetParent.style.display = "none";
	};

	const deleteRecipe = async (idx) => {
		if (recipeBooks.length > 0) {
			let splicedArr = recipeBooks[selectedBook].recipes.filter(
				(element, index) => index !== idx
			);
			console.log(splicedArr);

			let updatedRecipeBooks = recipeBooks;
			updatedRecipeBooks[selectedBook].recipes = splicedArr;

			// !!!! NEED TO UPDATE LoggedUserData to include above changes.
			props.setLoggedUserData({
				...props.loggedUserData,
				recipeBooks: updatedRecipeBooks,
			});

			// Update in db
			const userRef = doc(db, "user_data", props.loggedUserData.user_uid);
			setDoc(userRef, { recipeBooks: updatedRecipeBooks }, { merge: true });
		}
	};

	const createRecipeBook = async (newBookName) => {
		if (newBookName.length < 1) return;

		let recipeName = newBookName;
		console.log(recipeName.length);
		if (recipeName.length > 17) {
			recipeName = newBookName.slice(0, 17);
		}

		if (
			props.loggedUserData.recipeBooks.some(
				(book) => book.title.toLowerCase() === newBookName.toLowerCase()
			)
		) {
			setPopupVisible(false);
			return;
		}

		let newRecipeBooks = [
			...props.loggedUserData.recipeBooks,
			{ title: newBookName, recipes: [] },
		];
		// setRecipeBooks([...newRecipeBooks]);

		props.setLoggedUserData({
			...props.loggedUserData,
			recipeBooks: newRecipeBooks,
		});

		const userRef = doc(db, "user_data", props.loggedUserData.user_uid);
		await setDoc(userRef, { recipeBooks: newRecipeBooks }, { merge: true });
		closePopup();
	};

	const saveNewRecipeBookName = async (newRecipeBookName) => {
		let recipeName = newRecipeBookName;
		if (recipeName.length > 17) {
			recipeName = newRecipeBookName.slice(0, 17);
		}

		let newRecipeBooks = recipeBooks;
		newRecipeBooks[selectedBook].title = recipeName;

		props.setLoggedUserData({
			...props.loggedUserData,
			recipeBooks: newRecipeBooks,
		});

		try {
			const userRef = doc(db, "user_data", props.loggedUserData.user_uid);
			await setDoc(userRef, { recipeBooks: newRecipeBooks }, { merge: true });

			setRenameModeDisabled(true);
		} catch (err) {
			console.log(err);
		}
	};

	const deleteRecipeBook = async () => {
		let newRecipeBooks = recipeBooks;
		newRecipeBooks.splice(selectedBook, 1);

		setSelectedBook(0);

		props.setLoggedUserData({
			...props.loggedUserData,
			recipeBooks: newRecipeBooks,
		});

		try {
			const userRef = doc(db, "user_data", props.loggedUserData.user_uid);
			await setDoc(userRef, { recipeBooks: newRecipeBooks }, { merge: true });
			setRenameModeDisabled(true);
		} catch (err) {
			console.log(err);
		}
	};

	return (
		<div className="app-log-wrapper">
			<Header loggedUserData={props.loggedUserData}></Header>
			{isPopupVisible && (
				<Popup onClose={closePopup} createRecipeBook={createRecipeBook}></Popup>
			)}
			<MobileMenu
				selectedBook={selectedBook}
				recipeBooks={recipeBooks}
				setSelectedBook={setSelectedBook}
				setRecipeBooks={setRecipeBooks}
				selectedBookName={selectedBookName}
				logout={logout}
				openPopup={openPopup}
				closePopup={closePopup}
			/>
			<div id="account-flex">
				<div id="account-left">
					<p style={{ fontWeight: "700" }}>My recipe books</p>
					{recipeBooks.map((book, idx) => {
						return (
							<div
								key={idx}
								className="book-btn"
								id={idx === selectedBook ? "book-selected" : ""}
								onClick={() => {
									setSelectedBook(idx);
									setViewState("book");
								}}
							>
								{selectedBook === idx ? (
									<BookOpen
										size={20}
										strokeWidth={1.8}
										style={{ marginRight: 5 }}
									/>
								) : (
									<Book
										size={20}
										strokeWidth={1.8}
										style={{ marginRight: 5 }}
									/>
								)}

								<p>{book.title}</p>
							</div>
						);
					})}
					<div className="book-btn" onClick={openPopup}>
						<PlusCircle
							size={20}
							strokeWidth={1.8}
							style={{ marginRight: 5 }}
						/>
						Create recipe book
					</div>
					<div
						style={{
							width: "90%",
							borderBottom: "1px solid lightgray",
							marginBottom: 20,
							marginTop: 20,
						}}
					></div>
					<p style={{ fontWeight: "700" }}>Settings</p>

					<div
						className="settings-btn"
						onClick={() => {
							setViewState("settings");
						}}
					>
						<Settings strokeWidth={1.8} style={{ marginRight: 5 }} />
						Account
					</div>
					<div className="settings-btn" onClick={logout}>
						<LogOut strokeWidth={1.8} style={{ marginRight: 5 }} />
						Logout
					</div>
				</div>
				<div id="account-right">
					{viewState == "book" && recipeBooks.length > 0 && (
						<div style={{ position: "relative" }}>
							<div
								style={{
									display: "flex",
									flexDirection: "row",
									alignItems: "center",
								}}
							>
								<input
									id="recipe-book-heading"
									value={selectedBookName}
									onChange={(e) => {
										e.target.style.width = e.target.value.length + `ch`;
										setSelectedBookName(e.target.value);
									}}
									disabled={renameModeDisabled}
									style={{
										border: renameModeDisabled ? "none" : "1px solid lightgray",
									}}
									ref={bookHeadingRef}
								></input>
								{renameModeDisabled ? (
									<Pencil
										size="13px"
										onClick={() => {
											setRenameModeDisabled(false);
										}}
										className="book-name-btn"
									/>
								) : (
									<div>
										<Save
											size="20px"
											color="#39b44a"
											onClick={() => {
												saveNewRecipeBookName(bookHeadingRef.current.value);
											}}
											className="book-name-btn"
											style={{ marginLeft: 10 }}
										/>
										<XCircle
											size="20px"
											color="#ff3c2e"
											onClick={() => {
												setSelectedBookName(recipeBooks[selectedBook].title);
												setRenameModeDisabled(true);
											}}
											className="book-name-btn"
										/>
									</div>
								)}
							</div>
							{!renameModeDisabled && (
								<div
									style={{
										display: "flex",
										flexDirection: "row",
										justifyContent: "center",
										alignItems: "center",
										position: "absolute",
										top: 0,
										right: 30,
										color: "#ff3c2e",
										cursor: "pointer",
									}}
									className="recipe-book-delete-btn"
									onClick={deleteRecipeBook}
								>
									<Trash2 size={18} style={{ marginRight: 5 }} />
									<p style={{ margin: 0 }}>Delete</p>
								</div>
							)}

							<p id="recipe-book-sub">
								{recipeBooks[selectedBook].recipes.length} recipes
							</p>
							<div id="recipe-book-display">
								{recipeBooks[selectedBook].recipes.map((recipe, idx) => {
									return (
										<div key={recipe.recipeImage} className="recipe-card">
											<div
												className="recipe-menu-btn"
												onClick={(e) => {
													displayRecipeMenu(e.target);
												}}
											>
												<div className="rmb-background"></div>
												<MoreVertical />
											</div>
											<div
												className="recipe-menu"
												onMouseLeave={(e) => {
													hideRecipeMenu(e.target);
												}}
											>
												<ul>
													<li>
														<a
															style={{ color: "black", textDecoration: "none" }}
															href={recipe.recipeLink}
															target="_blank"
														>
															View recipe
														</a>
													</li>
													<li
														onClick={() => {
															deleteRecipe(idx);
														}}
													>
														Delete
													</li>
												</ul>
											</div>
											<a
												href={recipe.recipeLink}
												style={{ textDecoration: "none", color: "black" }}
												target="_blank"
											>
												<div className="recipe-card-img-holder">
													<img
														src={recipe.recipeImage}
														className="recipe-card-img"
													/>
												</div>
												<p
													style={{ fontWeight: "700" }}
													className="recipe-title"
												>
													{recipe.recipeTitle}
												</p>
												<ul style={{ listStyle: "none", padding: 0 }}>
													{recipe.recipeIngredients.map((ingredient, idx) => {
														return (
															<li
																key={idx}
																style={{
																	fontSize: 12,
																	lineHeight: "17px",
																	overflowWrap: "break-word",
																}}
															>
																{ingredient}
															</li>
														);
													})}
												</ul>
												{recipe.recipeCookTime != 0 && (
													<p
														style={{ fontSize: 12, margin: 0, marginBottom: 5 }}
													>
														<span style={{ fontWeight: "700" }}>
															Cook time:
														</span>{" "}
														{recipe.recipeCookTime} minutes
													</p>
												)}
												<p style={{ fontSize: 12, margin: 0, marginBottom: 5 }}>
													<span style={{ fontWeight: "700" }}>Serves:</span>{" "}
													{recipe.recipeServings}
												</p>
												<p style={{ fontSize: 12, margin: 0, marginBottom: 5 }}>
													<span style={{ fontWeight: "700" }}>Meal type:</span>{" "}
													{recipe.recipeMealType}
												</p>
											</a>
										</div>
									);
								})}
							</div>
						</div>
					)}
					{recipeBooks[selectedBook] &&
						recipeBooks[selectedBook].recipes.length == 0 &&
						viewState == "book" && (
							<p
								style={{
									width: "90%",
									boxSizing: "border-box",
									marginLeft: "5%",
								}}
							>
								There is nothing in this recipe book.{" "}
								<Link to="/" style={{ color: "#39b44a" }}>
									Browse recipes
								</Link>
							</p>
						)}
					{viewState == "settings" && (
						<AccountSettings
							loggedUserData={props.loggedUserData}
							setLoggedUserData={props.setLoggedUserData}
						/>
					)}
				</div>
			</div>
			<Footer></Footer>
		</div>
	);
}
