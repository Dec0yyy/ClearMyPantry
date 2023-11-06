import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import Header from "../Components/Header";
import SearchArea from "../Components/SearchArea";
import SearchResultsArea from "../Components/SearchResultsArea";
import PopularRecipes from "../Components/PopularRecipes";
import Footer from "../Components/Footer";
import FullScreenLoading from "../Components/FullScreenLoading";

import CloseIcon from "../Assets/close.png";

export default function Home(props) {
	const [searchInputs, setSearchInputs] = useState(null);

	const [searchResults, setSearchResults] = useState([]);

	const [recipeCount, setRecipeCount] = useState(0);

	const [isSearching, setIsSearching] = useState(false);

	useEffect(() => {
		if (searchInputs != null) {
			if (isSearching) return;

			setIsSearching(true);

			console.log(searchInputs);

			const apiUrl = `https://api.edamam.com/search?q=${searchInputs.includes}&app_id=${APP_ID}&app_key=${APP_KEY}&from=0&to=40&excluded=${searchInputs.excludes}`;
			// Make the GET request
			axios
				.get(apiUrl)
				.then((response) => {
					// Handle the successful response
					console.log(response.data);
					setSearchResults([...response.data.hits]);
					setRecipeCount(response.data.count);
					setIsSearching(false);
				})
				.catch((error) => {
					// Handle any errors
					console.error("Error fetching data:", error);
					setIsSearching(false);
				});
		}
	}, [searchInputs]);

	useEffect(() => {
		if (props.loggedUserData) {
			props.setPageLoading(false);
		}
	}, [props.loggedUserData]);

	const notificationRef = useRef();

	const displayRecipeBookNotification = (book) => {
		notificationRef.current.style.display = "flex";
		notificationRef.current.firstChild.textContent = `Successfully added to your ${book} recipe book.`;
		setTimeout(() => {
			notificationRef.current.style.opacity = "1";
			notificationRef.current.style.top = "30px";
		}, 50);
	};

	const hideRecipeBookNotification = () => {
		notificationRef.current.style.opacity = "0";
		notificationRef.current.style.top = "0px";
		setTimeout(() => {
			notificationRef.current.style.display = "none";
		}, 400);
	};

	return (
		<div className="App">
			{props.pageLoading && <FullScreenLoading />}

			<div className="app-wrapper">
				<div id="success-notification" ref={notificationRef}>
					Successfully added to your Breakfast recipe book.
					<img
						src={CloseIcon}
						style={{ height: 13, cursor: "pointer" }}
						onClick={hideRecipeBookNotification}
					/>
				</div>
				<Header loggedUserData={props.loggedUserData}></Header>
				<SearchArea
					searchInputs={searchInputs}
					setSearchInputs={setSearchInputs}
					isSearching={isSearching}
				></SearchArea>
				<SearchResultsArea
					searchResults={searchResults}
					loggedUserData={props.loggedUserData}
					setLoggedUserData={props.setLoggedUserData}
					displayRecipeBookNotification={displayRecipeBookNotification}
					recipeCount={recipeCount}
				></SearchResultsArea>
				<PopularRecipes></PopularRecipes>
				<Footer></Footer>
			</div>
		</div>
	);
}
