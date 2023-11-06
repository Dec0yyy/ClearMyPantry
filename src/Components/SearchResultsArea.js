import React from "react";

import MenuIcon from "../Assets/dots.png";

import { doc, setDoc, getDoc } from "firebase/firestore";

import { db } from "../firebase";

export default function SearchResultsArea(props) {
	React.useEffect(() => {
		console.log(props.searchResults);
	}, [props.searchResults]);

	const displayRecipeMenu = (elem) => {
		console.log(elem.offsetParent.nextElementSibling);
		elem.offsetParent.nextElementSibling.style.display = "block";
	};
	const hideRecipeMenu = (elem) => {
		elem.offsetParent.style.display = "none";
	};

	const saveRecipeToBook = async (book, recipe) => {
		// download recipe image
		// Replace non-alphanumeric characters with an empty string
		const recipeId = recipe.uri.split("_")[1];

		let allBookData = props.loggedUserData.recipeBooks;
		for (let i = 0; i < allBookData.length; i++) {
			if (allBookData[i].title == book) {
				allBookData[i].recipes.push({
					recipeId: recipeId,
					recipeTitle: recipe.label,
					recipeLink: recipe.url,
					recipeImage: recipe.image,
					recipeIngredients: recipe.ingredientLines,
					recipeCookTime: recipe.totalTime,
					recipeServings: recipe.yield,
					recipeMealType: recipe.mealType,
				});

				break;
			}
		}
		props.setLoggedUserData({
			...props.loggedUserData,
			recipeBooks: allBookData,
		});
		const userRef = doc(db, "user_data", props.loggedUserData.user_uid);
		console.log(userRef);
		await setDoc(userRef, { recipeBooks: [...allBookData] }, { merge: true });

		props.displayRecipeBookNotification(book);
	};

	return (
		<div id="search-result-area">
			{props.recipeCount > 0 && (
				<div style={{ width: "100%" }}>
					<p style={{ fontSize: 20 }}>
						Results: {props.recipeCount > 9999 ? "10,000+" : props.recipeCount}
					</p>
				</div>
			)}

			{props.searchResults.map((recipe) => {
				return (
					<div key={recipe.recipe.uri} className="recipe-card">
						{props.loggedUserData && (
							<div>
								<div
									className="recipe-menu-btn"
									onClick={(e) => {
										displayRecipeMenu(e.target);
									}}
								>
									<div className="rmb-background"></div>
									<img src={MenuIcon} />
								</div>
								<div
									className="recipe-menu"
									onMouseLeave={(e) => {
										hideRecipeMenu(e.target);
									}}
								>
									<ul>
										{props.loggedUserData.recipeBooks.map((book) => {
											return (
												<li
													key={book.title}
													onClick={() => {
														saveRecipeToBook(book.title, recipe.recipe);
													}}
												>
													{book.title}
												</li>
											);
										})}
									</ul>
								</div>
							</div>
						)}

						<a
							href={recipe.recipe.url}
							style={{ textDecoration: "none", color: "black" }}
							target="_blank"
						>
							<div className="recipe-card-img-holder">
								<img src={recipe.recipe.image} className="recipe-card-img" />
							</div>
							<p style={{ fontWeight: "700" }} className="recipe-title">
								{recipe.recipe.label}
							</p>
							<ul style={{ listStyle: "none", padding: 0 }}>
								{recipe.recipe.ingredientLines.map((ingredient, idx) => {
									return (
										<li key={idx} style={{ fontSize: 12, lineHeight: "17px" }}>
											{ingredient}
										</li>
									);
								})}
							</ul>
							{recipe.recipe.totalTime != 0 && (
								<p style={{ fontSize: 12, margin: 0, marginBottom: 5 }}>
									<span style={{ fontWeight: "700" }}>Cook time:</span>{" "}
									{recipe.recipe.totalTime} minutes
								</p>
							)}
							<p style={{ fontSize: 12, margin: 0, marginBottom: 5 }}>
								<span style={{ fontWeight: "700" }}>Serves:</span>{" "}
								{recipe.recipe.yield}
							</p>
							<p style={{ fontSize: 12, margin: 0, marginBottom: 5 }}>
								<span style={{ fontWeight: "700" }}>Meal type:</span>{" "}
								{recipe.recipe.mealType}
							</p>
						</a>
					</div>
				);
			})}
		</div>
	);
}
