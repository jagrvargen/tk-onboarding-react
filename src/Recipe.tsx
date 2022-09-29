import React from 'react';
import IngredientList from "./IngredientList";

export default function Recipe({name, description, ingredients}) {
    return (
        <div>
            <h2>{name}</h2>
            <h3>Description: <br/>{description}</h3>
            {ingredients.length > 0 ? <div>Ingredients: <IngredientList ingredientsList={ingredients}/></div> : ''}
        </div>
    )
}
