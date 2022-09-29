import React, {useState, useEffect} from "react";
import axios from "axios";
import './RecipeList.css';

const URL = "http://127.0.0.1:8000/";

export default function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    useEffect(() => {
        async function fetchList() {
            const resp = await axios.get(URL + "recipes/");
            console.log(resp);
            setRecipes(resp.data);
        }

        fetchList();
    }, []);

    return (
        <div className={'RecipeList-div'}>
            {recipes.map(recipe => <div key={recipe.id}>Recipe: {recipe.name} <br/>Description: {recipe.description}
                <br/>Ingredients: <ul>{recipe.ingredients.map(ingredient => <li
                    key={ingredient.id}>{ingredient.name}</li>)}</ul>
            </div>)}
        </div>
    )
}
