import React, {useState, useEffect} from "react";
import axios from "axios";
import './RecipeList.css';
import Recipe from "./Recipe";
import RecipeForm from "./RecipeForm";
import {RecipeData} from "./App";

const URL = "http://127.0.0.1:8000/";


export default function RecipeList() {
    const [selectedRecipe, setSelectedRecipe] = useState<RecipeData>(null);
    const [recipes, setRecipes] = useState([]);
    const [displayRecipe, setDisplayRecipe] = useState<boolean>(false);

    useEffect(() => {
        async function fetchList() {
            const resp = await axios.get(URL + "recipes/");
            console.log(resp);
            setRecipes(resp.data);
        }

        fetchList();
    }, []);
    // delete recipe from `recipes` without re-pinging API.

    const displayRecipeForm = () => {
        setDisplayRecipe(!displayRecipe);
    }

    return (
        <div className={'RecipeList-div'}>
            {recipes.map(recipe => <Recipe recipesArr={recipes} setRecipes={setRecipes} selectedRecipe={recipe}
                                           onSelectRecipe={setSelectedRecipe}/>)}
            <button onClick={displayRecipeForm}><i className="fa-solid fa-plus">Add Recipe</i></button>
            {displayRecipe ? <RecipeForm selectedRecipe={{id: null, name: "", description: "", ingredients: []}}
                                         submissionType='new'/> : null}
        </div>
    )
}
