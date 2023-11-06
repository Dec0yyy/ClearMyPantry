import React from "react";

import One from "../Assets/RecipeImages/pear-salad.jpg";
import Two from "../Assets/RecipeImages/Chicken-Parm-Stuffed-Peppers.jpg";
import Three from "../Assets/RecipeImages/broccoli-stir-fry.webp";
import Four from "../Assets/RecipeImages/salmon.webp";
import Five from "../Assets/RecipeImages/chicken.jpg";
import Six from "../Assets/RecipeImages/meatball.jpg";
import Seven from "../Assets/RecipeImages/chicken2.jpg";
import Eight from "../Assets/RecipeImages/oats.jpeg";
import Nine from "../Assets/RecipeImages/sweet1.jpg";
import Ten from "../Assets/RecipeImages/sweet2.webp";

export default function PopularRecipes() {
	return (
		<div className="popular-recipes-holder">
			<p style={{ fontWeight: "700", fontSize: "1.2em" }}>Popular Recipes</p>
			<div className="pop-recipe-area">
				<a
					className="pop-recipe-card"
					href="https://www.delish.com/cooking/recipe-ideas/a41094046/pear-salad-recipe/"
					target="_blank"
					style={{ textDecoration: "none", color: "black" }}
				>
					<div className="pop-img-holder">
						<img src={One} />
					</div>
					<p>Healthy Pear Salad</p>
				</a>
				<a
					className="pop-recipe-card"
					href="https://www.delish.com/cooking/recipe-ideas/recipes/a51054/chicken-parm-stuffed-peppers-recipe/"
					target="_blank"
					style={{ textDecoration: "none", color: "black" }}
				>
					<div className="pop-img-holder">
						<img src={Two} />
					</div>
					<p>Chicken Parm Stuffed Peppers</p>
				</a>

				<a
					className="pop-recipe-card"
					href="https://www.olivemagazine.com/recipes/healthy/broccoli-fried-rice/"
					target="_blank"
					style={{ textDecoration: "none", color: "black" }}
				>
					<div className="pop-img-holder">
						<img src={Three} />
					</div>
					<p>Thai-style broccoli fried rice</p>
				</a>
				<a
					className="pop-recipe-card"
					href="https://www.olivemagazine.com/recipes/fish-and-seafood/salmon-with-watercress-sauce/"
					target="_blank"
					style={{ textDecoration: "none", color: "black" }}
				>
					<div className="pop-img-holder">
						<img src={Four} />
					</div>
					<p>Pan-fried salmon with watercress sauce</p>
				</a>
				<a
					className="pop-recipe-card"
					href="https://www.countryliving.com/food-drinks/a37973867/fast-easy-chicken-marsala-recipe/"
					target="_blank"
					style={{ textDecoration: "none", color: "black" }}
				>
					<div className="pop-img-holder">
						<img src={Five} style={{ height: "auto", width: "100%" }} />
					</div>
					<p>Fast Easy Chicken Marsala</p>
				</a>
				<a
					className="pop-recipe-card"
					href="https://www.taste.com.au/recipes/5-ingredient-meatball-carbonara-recipe/j9q27ag0?r=dinner/zwhsqg1l"
					target="_blank"
					style={{ textDecoration: "none", color: "black" }}
				>
					<div className="pop-img-holder">
						<img src={Six} />
					</div>
					<p>5-ingredient meatball carbonara</p>
				</a>
				<a
					className="pop-recipe-card"
					href="https://www.taste.com.au/recipes/lemon-rosemary-chicken-crispy-smashed-potatoes-recipe/cd0v621i?r=dinner&h=Dinner"
					target="_blank"
					style={{ textDecoration: "none", color: "black" }}
				>
					<div className="pop-img-holder">
						<img src={Seven} />
					</div>
					<p>Lemon rosemary chicken with crispy smashed potatoes</p>
				</a>
				<a
					className="pop-recipe-card"
					href="https://www.delish.com/cooking/recipe-ideas/a43444387/overnight-oats-recipe/"
					target="_blank"
					style={{ textDecoration: "none", color: "black" }}
				>
					<div className="pop-img-holder">
						<img src={Eight} />
					</div>
					<p>Easy Overnight Oats</p>
				</a>
			</div>
			<p style={{ fontWeight: "700", fontSize: "1.2em" }}>Sweet Tooth</p>
			<div class="pop-recipe-area">
				<a
					className="pop-recipe-card"
					href="https://www.delicious.com.au/recipes/pecan-chocolate-bread-butter-pudding-recipe/a89p7dzo?r=recipes/collections/77cijfrr"
					target="_blank"
					style={{ textDecoration: "none", color: "black" }}
				>
					<div className="pop-img-holder">
						<img src={Nine} />
					</div>
					<p>Easy Overnight Oats</p>
				</a>
				<a
					className="pop-recipe-card"
					href="https://www.bonappetit.com/recipe/eggless-lime-custards-with-lychees"
					target="_blank"
					style={{ textDecoration: "none", color: "black" }}
				>
					<div className="pop-img-holder">
						<img src={Ten} style={{ height: "auto", width: "100%" }} />
					</div>
					<p>Lime Custards with Lychees</p>
				</a>
				<a
					className="pop-recipe-card"
					href="https://www.bonappetit.com/recipe/ruffled-milk-pie-with-raspberries"
					target="_blank"
					style={{ textDecoration: "none", color: "black" }}
				>
					<div className="pop-img-holder">
						<img src="https://assets.bonappetit.com/photos/60df22a6d5b7346ea0217cd8/1:1/w_1920%2Cc_limit/0821-Ruffled%2520Milk%2520Pie%2520with%2520Raspberries.jpg" />
					</div>
					<p>Ruffled Milk Pie With Raspberries</p>
				</a>
				<a
					className="pop-recipe-card"
					href="https://myfoodbook.com.au/recipes/show/choc-mint-crackle-cheesecake-lasagne"
					target="_blank"
					style={{ textDecoration: "none", color: "black" }}
				>
					<div className="pop-img-holder">
						<img src="https://myfoodbook.com.au/sites/default/files/styles/card_c_xw_wp/public/recipe_photo/Whisk_CophaPt1_180522_ChocMintLassagne_H_V_WEB_EDIT.jpg" />
					</div>
					<p>Choc-Mint Crackle Cheesecake Lasagne</p>
				</a>
			</div>
		</div>
	);
}
