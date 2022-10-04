import React, {useState, useEffect} from "react";
import axios from "axios";
import Recipe from "./Recipe";
import type {RecipeData} from "./App";

type Props = { recipes: Array<RecipeData>, selectedRecipe: RecipeData, onSelectRecipe: (recipeData: RecipeData) => void };

export default function RecipeSelection(props: Props) {
    const recipes = props.recipes;
    const selectedRecipe = props.selectedRecipe;
    const setSelectedRecipe = props.onSelectRecipe;

    function handleChange(evt) {
        for (let i in recipes) {
            if (recipes[i].id === +evt.target.value) {
                setSelectedRecipe(recipes[i])
                break
            }
        }
    }

    // function renderRecipeDropDown(filterId) {
    //     if (filterId) {
    //         return recipes.filter(recipe => recipe.id !== filterId).map(data => <option key={data.id}
    //                                                                                     value={data.id}>{data.name}</option>)
    //     } else {
    //         return recipes.map(data => <option key={data.id} value={data.id}>{data.name}</option>)
    //     }
    // }

    return (
        <>
            <h2>Choose a recipe</h2>
            <select value='' onChange={handleChange}>
                {recipes.map(data => <option key={data.id} value={data.id}>{data.name}</option>)}
            </select>
        </>
    )
}
