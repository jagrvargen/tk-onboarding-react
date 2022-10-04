import React, {useState} from 'react';
import IngredientList from "./IngredientList";
import {RecipeData} from "./App";
import RecipeForm from "./RecipeForm";
import axios from "axios";

type Props = { selectedRecipe: RecipeData, onSelectRecipe: (recipeData: RecipeData) => void }

export const URL = "http://127.0.0.1:8000/recipes/";

export default function Recipe(props: Props) {
    const {id, name, description, ingredients} = props.selectedRecipe;
    const setSelectedRecipe = props.onSelectRecipe;
    const [showForm, setShowForm] = useState<boolean>(false);

    const handleEditRecipe = () => {
        setShowForm(!showForm);
    }

    async function handleDeleteRecipe() {
        let resp = axios.delete(URL + `${id}/`).then(() => setSelectedRecipe(null))
        console.log(resp);
    }

    return (
        <>
            <div>
                <h2>{name}</h2>
                <h3>Description: <br/>{description}</h3>
                {ingredients.length > 0 ?
                    <div>Ingredients: <IngredientList ingredientsList={ingredients}/></div> : ''}
                <button onClick={handleEditRecipe}><i className="fa-solid fa-pen-to-square"></i></button>
                {showForm ? <RecipeForm selectedRecipe={props.selectedRecipe} submissionType='edit'/> : null}
                <button onClick={handleDeleteRecipe}><i className="fa-solid fa-minus"></i></button>
            </div>
        </>
    )
}
