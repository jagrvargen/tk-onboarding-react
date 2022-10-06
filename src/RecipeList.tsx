import React, {useState, useEffect} from "react";
import axios from "axios";
import './RecipeList.css';
import Recipe from "./Recipe";
import RecipeForm from "./RecipeForm";

const URL = "http://127.0.0.1:8000/";


export default function RecipeList() {
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

    const displayRecipeForm = () => {
        setDisplayRecipe(!displayRecipe);
    }

    return (
        <div className={'RecipeList-div'}>
            {recipes.map(recipe => <Recipe recipes={recipes} setRecipes={setRecipes} selectedRecipe={recipe}/>)}
            <button onClick={displayRecipeForm}><i className="fa-solid fa-plus">Add Recipe</i></button>
            {displayRecipe ? <RecipeForm selectedRecipe={{id: null, name: "", description: "", ingredients: []}}
                                         submissionType='new'/> : null}
        </div>
    )
}
