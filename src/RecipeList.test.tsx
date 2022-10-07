import {act, render, screen} from '@testing-library/react';
import Recipe from "./Recipe";
import RecipeForm from "./RecipeForm";
import {RecipeData} from "./App";
import RecipeList from "./RecipeList";
import {getAllRecipes} from "./api";
import userEvent from "@testing-library/user-event";

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
    render(<RecipeList/>);

    const recipeListDiv = await screen.findByTestId("recipe-list");
    const recipeListMemberOne = await screen.findByTestId("recipe-1");
    const recipeListMemberTwo = await screen.findByTestId("recipe-2");

    expect(recipeListDiv).toHaveTextContent("Add Recipe");

    expect(recipeListMemberOne).toHaveTextContent("Test Recipe 1");
    expect(recipeListMemberOne).toHaveTextContent("Test Recipe 1 Description");
    expect(recipeListMemberOne).toHaveTextContent("Test Ingredient 1");

    expect(recipeListMemberTwo).toHaveTextContent("Test Recipe 2");
    expect(recipeListMemberTwo).toHaveTextContent("Test Recipe 2 Description");
    expect(recipeListMemberTwo).toHaveTextContent("Test Ingredient 2");
});

test('clicking add recipe button displays recipe form', async () => {
    render(<RecipeList/>);

    const nullRecipeFormComponent = screen.queryByTestId("recipe-form");
    expect(nullRecipeFormComponent).toBeNull();

    const addRecipeButton = screen.getByTestId("add-recipe-button");
    userEvent.click(addRecipeButton);

    const recipeFormComponent = await screen.findByTestId("recipe-form");
    expect(recipeFormComponent).toBeInTheDocument()
});
