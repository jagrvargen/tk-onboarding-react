import React from "react";
import {Route, Routes} from 'react-router-dom';
import './App.css';
import RecipeList from './RecipeList';

type Ingredient = {id: number, name: string}
type RecipeData = { id: number, name: string, description: string, ingredients: Array<Ingredient> };


function App() {

    return (
        <div data-testid="render-recipe-list" className="App">
            <h1>My Fun Recipes</h1>
            <Routes>
                <Route path='/' element={<RecipeList />}/>
            </Routes>
        </div>
    );
}

export default App;
export type {Ingredient, RecipeData};
