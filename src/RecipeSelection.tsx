import React, {useState, useEffect} from "react";
import axios from "axios";
import Recipe from "./Recipe";

type Ingredient = { name: string };
type RecipeData = { id: number, name: string, description: string, ingredients: Array<Ingredient> };
type Props = { recipes: Array<RecipeData>, selectedRecipe: number, onSelectRecipe: (recipeId: number) => void };

export default function RecipeSelection(props: Props) {
    const recipes = props.recipes;
    const selectedRecipe = props.selectedRecipe;
    const setSelectedRecipe = props.onSelectRecipe;

    function handleChange(evt) {
        console.log(evt.target);
        setSelectedRecipe(evt.target.id)
    }

    return (
        <>
            <h2>Choose a recipe</h2>
            <select value='' onChange={handleChange}>
                {recipes.map(data => <option key={data.id} value={data.id}>{data.name}</option>)}
            </select>
        </>
    )
}
