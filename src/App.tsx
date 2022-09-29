import React, {useEffect, useState} from "react";
import {Route, Routes} from 'react-router-dom';
import './App.css';
import Recipe from "./Recipe";
import RecipeSelection from './RecipeSelection';
import RecipeList from './RecipeList';
import IngredientList from "./IngredientList";
import axios from "axios";

type Ingredient = {id: number, name: string}
type RecipeData = { id: number, name: string, description: string, ingredients: Array<Ingredient> };

const URL = "http://127.0.0.1:8000/recipes/";

function App() {
    const [recipes, setRecipes] = useState([]);
    const [selectedRecipe, setSelectedRecipe] = useState<number>(null);

    useEffect(() => {
        async function fetchRecipeNames() {
            const resp = await axios.get(URL);
            setRecipes(resp.data);
        }

        fetchRecipeNames();
    }, []);

    // async function handleSelectRecipe(evt) {
    //     let recipeData = axios.get(URL + `${selectedRecipe}/`)
    // }

    // async function handleRenderRecipe() {
    //     const resp = await axios.get(URL + `${recipeId}/`);
    //     setRecipeData(resp.data);
    // }

    return (
        <div className="App">
            <h1>My Fun Recipes</h1>
            <Routes>
                <Route path='/' element={<RecipeList />}/>
            </Routes>
            <RecipeSelection recipes={recipes} selectedRecipe={selectedRecipe} onSelectRecipe={setSelectedRecipe}/>
            <button onClick={}></button>
        </div>
    );
}

export default App;
