import React, { useState, useEffect } from "react";

import { Minus } from "lucide-react";

export default function SearchArea(props) {
	const [aoOpen, SetAoOpen] = useState(false);

	// Current input values
	const [ingredientInputValue, setIngredientInputValue] = useState("");
	const [excludeInputValue, setExcludeInputValue] = useState("");

	// Search input values
	const [includes, setIncludes] = useState([]);
	const [excludes, setExcludes] = useState([]);
	const [cookTime, setCookTime] = useState(0);
	const [minCalories, setMinCalories] = useState(0);
	const [maxCalories, setMaxCalories] = useState(0);
	const [vegetarianFilter, setVegetarianFilter] = useState(false);
	const [veganFilter, setVeganFilter] = useState(false);

	function searchForRecipes() {
		props.setSearchInputs({
			includes: includes,
			excludes: excludes,
			time: cookTime,
			calories: { min: minCalories, max: maxCalories },
			vegetarian: vegetarianFilter,
			vegan: veganFilter,
		});
	}

	function addIngredient() {
		if (ingredientInputValue.length < 1) return;

		setIncludes((c) => [...c, ingredientInputValue]);
		setIngredientInputValue("");
	}
	function excludeIngredient() {
		if (excludeInputValue.length < 1) return;

		setExcludes((c) => [...c, excludeInputValue]);
		setExcludeInputValue("");
	}

	const handleKeyPressInc = (event) => {
		if (event.key === "Enter") {
			addIngredient();
		}
	};
	const handleKeyPressExc = (event) => {
		if (event.key === "Enter") {
			excludeIngredient();
		}
	};

	useEffect(() => {
		if (!aoOpen) {
			setVegetarianFilter(false);
			setVeganFilter(false);
			setMinCalories(0);
			setMaxCalories(0);
			setCookTime(0);
		}
	}, [aoOpen]);

	return (
		<div id="search-area">
			<div id="search-bar">
				<input
					id="search-input"
					placeholder="Add Ingredient"
					value={ingredientInputValue}
					onChange={(e) => {
						setIngredientInputValue(e.target.value);
					}}
					onKeyDown={handleKeyPressInc}
				></input>
				<div id="add-btn" onClick={addIngredient}>
					+
				</div>
			</div>
			<div id="advanced-options-btn">
				<p
					id="aob-text"
					onClick={() => {
						SetAoOpen(!aoOpen);
					}}
				>
					{aoOpen ? "Hide" : "Show"} advanced options
				</p>
			</div>
			{aoOpen && (
				<div id="advanced-options-area">
					<div id="search-bar">
						<input
							id="exclude-input"
							placeholder="Exclude Ingredient"
							value={excludeInputValue}
							onChange={(e) => {
								setExcludeInputValue(e.target.value);
							}}
							onKeyDown={handleKeyPressExc}
						></input>
						<div id="exclude-btn" onClick={excludeIngredient}>
							<Minus size={20} />
						</div>
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-start",
							alignItems: "center",
							marginLeft: 10,
						}}
					>
						<p>Cook Time:</p>
						<input
							id="cook-time-input"
							className="advanced-option-input"
							placeholder="00"
							value={cookTime}
							onChange={(e) => {
								setCookTime(e.target.value);
							}}
						></input>
						<p>minutes</p>
					</div>
					<div
						style={{
							display: "flex",
							justifyContent: "flex-start",
							alignItems: "center",
							marginLeft: 10,
						}}
					>
						<p>Calorie Range:</p>
						<input
							id="min-cal-input"
							className="advanced-option-input"
							placeholder="min"
							value={minCalories}
							onChange={(e) => {
								setMinCalories(e.target.value);
							}}
						></input>
						<p>-</p>
						<input
							id="max-cal-input"
							className="advanced-option-input"
							placeholder="max"
							value={maxCalories}
							onChange={(e) => {
								setMaxCalories(e.target.value);
							}}
						></input>
					</div>
					<div id="advanced-options-checkbox-area">
						<label className="container">
							Vegetarian
							<input
								type="checkbox"
								checked={vegetarianFilter}
								id="vegetarian-checkbox"
								onChange={() => {
									setVegetarianFilter(!vegetarianFilter);
								}}
							/>
							<span className="checkmark"></span>
						</label>
						<label className="container">
							Vegan
							<input
								type="checkbox"
								checked={veganFilter}
								id="vegan-checkbox"
								onChange={() => {
									setVeganFilter(!veganFilter);
								}}
							/>
							<span className="checkmark"></span>
						</label>
					</div>
				</div>
			)}
			<div id="ingredient-area">
				{includes.map((ingredient, idx) => {
					return (
						<div
							key={ingredient + idx}
							idx={idx}
							className="included-ingredient"
							onClick={() => {
								const current = [...includes];
								current.splice(idx, 1);
								setIncludes(current);
							}}
						>
							{ingredient}
						</div>
					);
				})}
				{excludes.map((ingredient, idx) => {
					return (
						<div
							style={{ color: "red" }}
							key={ingredient + idx}
							idx={idx}
							className="excluded-ingredient"
							onClick={() => {
								const current = [...excludes];
								current.splice(idx, 1);
								setExcludes(current);
							}}
						>
							{ingredient}
						</div>
					);
				})}
			</div>
			{!props.isSearching ? (
				<div id="search-btn" onClick={searchForRecipes}>
					Search
				</div>
			) : (
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
						<p>Searching</p>
					</div>
				</div>
			)}
		</div>
	);
}
