import React, {useState} from "react";
import {RecipeData} from "./App";
import axios from "axios";

export const URL = "http://127.0.0.1:8000/recipes/";

type Props = { selectedRecipe: RecipeData, submissionType: string };

export default function RecipeForm(props: Props) {
    const [formData, setFormData] = useState<RecipeData>({...props.selectedRecipe});
    const submissionType = props.submissionType;

    // let ingredients = formData.ingredients.map((ingredient) => ingredient.name)

    async function handleSubmit() {
        const {id, ...payload} = formData;
        let resp;
        if (submissionType === 'new') {
            resp = await axios.post(URL, payload);
        } else {
            resp = await axios.patch(URL + `${formData.id}/`, payload);
        }
        console.log(resp);
    }

    const ingredientsObjToStr = (ingredients) => {
        return ingredients.map((ingredient) => {
            return ingredient.name
        });
    }

    const ingredientStrToObj = (ingredients) => {
        let ingredientNames = ingredients.split(',');
        return ingredientNames.map((name) => ({name}));
    }

    return (
        <>
            <form onSubmit={handleSubmit}>
                <label htmlFor="recipeName">Recipe Name:</label>
                <input type='text' id="recipeName" name="name" value={formData.name}
                       onChange={(evt) => setFormData({...formData, [evt.target.name]: evt.target.value})}/>
                <label htmlFor="recipeDescription">Description:</label>
                <input type='text' id="recipeDescription" name="description" value={formData.description}
                       onChange={(evt) => setFormData({...formData, [evt.target.name]: evt.target.value})}/>
                <label htmlFor="addIngredient">Add Ingredients:</label>
                <input type='text' id="addIngredients" name="ingredients"
                       placeholder="eggs, cheese, ..." value={ingredientsObjToStr(formData.ingredients)}
                       onChange={(evt) => setFormData({
                           ...formData,
                           [evt.target.name]: ingredientStrToObj(evt.target.value)
                       })}/>
                <button type="submit">Submit</button>
            </form>
        </>
    )
}