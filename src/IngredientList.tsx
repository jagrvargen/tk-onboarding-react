// @ts-ignore
import React from "react";

export default function IngredientList(props) {
    console.log(props)
    const ingredients = props.ingredientsList;
    return (
        <ul>
            {ingredients.map(ingredient => <li key={ingredient.id}>{ingredient.name}</li>)}
        </ul>
    )
}
