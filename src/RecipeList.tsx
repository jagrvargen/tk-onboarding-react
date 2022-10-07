import React, {useState, useEffect} from "react";
import './RecipeList.css';
import Recipe from "./Recipe";
import RecipeForm from "./RecipeForm";
import {getAllRecipes} from "./api";


export default function RecipeList() {
    const [recipes, setRecipes] = useState([]);
    const [displayRecipe, setDisplayRecipe] = useState<boolean>(false);

    useEffect(() => {
        async function fetchList() {
            const resp = await getAllRecipes();
            setRecipes(resp.data);
        }

        fetchList();
    }, []);

    const displayRecipeForm = () => {
        setDisplayRecipe(!displayRecipe);
    }

    return (
        <div data-testid="recipe-list" className={'RecipeList-div'}>
            {recipes.map(recipe => <Recipe key={recipe.id} recipes={recipes} setRecipes={setRecipes} selectedRecipe={recipe}/>)}
            <button data-testid='add-recipe-button' onClick={displayRecipeForm}><i className="fa-solid fa-plus">Add Recipe</i></button>
            {displayRecipe ? <RecipeForm selectedRecipe={{id: null, name: "", description: "", ingredients: []}}
                                         submissionType='new'/> : null}
        </div>
    )
}
