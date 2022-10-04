import React, {useState, useEffect} from "react";
import axios from "axios";
import './RecipeList.css';
import Recipe from "./Recipe";
import RecipeForm from "./RecipeForm";
import {RecipeData} from "./App";

const URL = "http://127.0.0.1:8000/";

// type Props = { onSelectRecipe: (recipeData: RecipeData) => void }

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
    }, [selectedRecipe]);

    const displayRecipeForm = () => {
        setDisplayRecipe(!displayRecipe);
    }

    // async function handleAddRecipe() {
    //     const resp = axios.post(URL)
    // }

    return (
        <div className={'RecipeList-div'}>
            {recipes.map(recipe => <Recipe selectedRecipe={recipe}
                                           onSelectRecipe={setSelectedRecipe}/>)}
            <button onClick={displayRecipeForm}><i className="fa-solid fa-plus">Add Recipe</i></button>
            {displayRecipe ? <RecipeForm selectedRecipe={{id: null, name: "", description: "", ingredients: []}}
                                         submissionType='new'/> : null}
            {/*{recipes.map(recipe => <div className={'RecipeList-recipe-div'} key={recipe.id}>Recipe: {recipe.name}*/}
            {/*    <br/>Description: {recipe.description}*/}
            {/*    <br/>Ingredients: <ul>{recipe.ingredients.map(ingredient => <li*/}
            {/*        key={ingredient.id}>{ingredient.name}</li>)}</ul>*/}
            {/*</div>)}*/}
        </div>
    )
}
