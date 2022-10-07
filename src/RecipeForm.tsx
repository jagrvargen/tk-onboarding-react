import React, {useState} from "react";
import {RecipeData} from "./App";
import {submitNewRecipe, updateRecipe} from "./api";


type Props = { selectedRecipe: RecipeData, submissionType: string };

export default function RecipeForm(props: Props) {
    const [formData, setFormData] = useState<RecipeData>({...props.selectedRecipe});
    const submissionType = props.submissionType;

    async function handleSubmit(evt) {
        evt.preventDefault();
        const {id, ...payload} = formData;
        let resp;
        if (submissionType === 'new') {
            resp = await submitNewRecipe(payload);
        } else {
            resp = await updateRecipe(id, payload);
        }
        console.log(resp);
    }

    const ingredientsArrToStr = (ingredients) => {
        return ingredients.map((ingredient) => {
            return ingredient.name
        }).join(',');
    }

    const ingredientStrToArray = (ingredients) => {
        let ingredientNames = ingredients.split(',');
        return ingredientNames.map((name) => ({name}));
    }

    return (
        <>
            <form data-testid="recipe-form" onSubmit={evt => handleSubmit(evt)}>
                <label htmlFor="recipeName">Recipe Name:</label>
                <input data-testid="recipe-form-name" type='text' id="recipeName" name="name" value={formData.name}
                       onChange={(evt) => setFormData({...formData, [evt.target.name]: evt.target.value})}/>
                <label htmlFor="recipeDescription">Description:</label>
                <input data-testid="recipe-form-description" type='text' id="recipeDescription" name="description" value={formData.description}
                       onChange={(evt) => setFormData({...formData, [evt.target.name]: evt.target.value})}/>
                <label htmlFor="addIngredient">Add Ingredients:</label>
                <input data-testid="recipe-form-ingredients" type='text' id="addIngredients" name="ingredients"
                       placeholder="eggs, cheese, ..." value={ingredientsArrToStr(formData.ingredients)}
                       onChange={(evt) => setFormData({
                           ...formData,
                           [evt.target.name]: ingredientStrToArray(evt.target.value)
                       })}/>
                <button data-testid="submit" type="submit">Submit</button>
            </form>
        </>
    )
}
