import axios from "axios";
import {URL} from "./Recipe";

export async function getAllRecipes() {
    return axios.get(URL);
}

export async function submitNewRecipe(recipeFormData) {
    return axios.post(URL, recipeFormData);
}

export async function updateRecipe(recipeId, recipeFormData) {
    return axios.patch(URL + `${recipeId}/`, recipeFormData);
}

export async function deleteRecipe(id) {
    return axios.delete(URL + `${id}/`);
}
