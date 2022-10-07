import React, {useState} from 'react';
import IngredientList from "./IngredientList";
import {RecipeData} from "./App";
import RecipeForm from "./RecipeForm";
import {deleteRecipe} from "./api";

type Props = { recipes: Array<RecipeData>, setRecipes: (recipes: Array<RecipeData>) => void, selectedRecipe: RecipeData }

export const URL = "http://127.0.0.1:8000/recipes/";

export default function Recipe(props: Props) {
    const {id, name, description, ingredients} = props.selectedRecipe;
    const {recipes, setRecipes} = props;
    const [showForm, setShowForm] = useState<boolean>(false);

    const handleEditRecipe = () => {
        setShowForm(!showForm);
    }

    async function handleDeleteRecipe() {
        const resp = await deleteRecipe(id);
        if (resp !== undefined && resp.status === 204) {
            setRecipes(recipes.filter(recipe => recipe.id !== id));
        } else {
            console.log(`DELETE recipe failed: ${resp}`);
        }
    }

    return (
        <div>
            <h2>{name}</h2>
            <h3>Description: <br/>{description}</h3>
            {ingredients.length > 0 ?
                <div role="ingredient-list">Ingredients: <IngredientList ingredientsList={ingredients}/></div> : ''}
            <button role="edit-recipe" onClick={handleEditRecipe}><i className="fa-solid fa-pen-to-square"></i></button>
            {showForm ? <RecipeForm selectedRecipe={props.selectedRecipe} submissionType='edit'/> : null}
            <button role="delete-recipe" onClick={handleDeleteRecipe}><i className="fa-solid fa-minus"></i></button>
        </div>
    )
}
