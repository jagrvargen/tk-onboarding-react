import axios from "axios";
import {URL} from "./Recipe";

export async function deleteRecipe(id) {
    return axios.delete(URL + `${id}/`);
}
