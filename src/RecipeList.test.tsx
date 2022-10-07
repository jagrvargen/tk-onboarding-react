import {act, render, screen} from '@testing-library/react';
import Recipe from "./Recipe";
import RecipeForm from "./RecipeForm";
import {RecipeData} from "./App";
import RecipeList from "./RecipeList";
import {getAllRecipes} from "./api";

jest.mock('./api', () => {
    const originalApi = jest.requireActual('./api');
    return {
        ...originalApi,
        getAllRecipes: () => ({data: mockRecipesArr()}),
        setRecipes: jest.fn()
    };
});

const mockSelectedRecipe = (recipeId) => {
    const recipeData: RecipeData = {
        id: recipeId,
        name: `Test Recipe ${recipeId}`,
        description: `Test Recipe ${recipeId} Description`,
        ingredients: [{id: recipeId, name: `Test Ingredient ${recipeId}`}]
    }

    return recipeData;
}

const mockRecipesArr = () => {
    return [1, 2, 3, 4, 5].map(recipeId => mockSelectedRecipe(recipeId));
}

test('render recipe list', async () => {
    // getAllRecipes.mockImplementation(() => ({data: mockRecipesArr()}));
    render(<RecipeList/>);

    const recipeListDiv = await screen.findByTestId("recipe-list");
    expect(recipeListDiv).toHaveTextContent("Add Recipe");
    // expect(recipeListDiv.children).toBeInTheDocument();
});

test('clicking add recipe button displays recipe form', () => {

});

test('clicking add recipe button twice removes recipe form', () => {

});
