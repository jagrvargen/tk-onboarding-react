import { render, screen} from '@testing-library/react';
import Recipe from './Recipe';
import {deleteRecipe} from "./api";
import {RecipeData} from "./App";
import userEvent from "@testing-library/user-event";

jest.mock("axios");
jest.mock("./api");

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

// Leaving this here for visibility. I couldn't get the setUp() function to
// return the expected types of each of these consts, so I'm redefining them in each test
// const setUp = () => {
//     const mockedSelectedRecipe = mockSelectedRecipe(1);
//     const mockedRecipesArr = mockRecipesArr();
//     const mockSetRecipes = jest.fn();
//
//     return [mockedSelectedRecipe, mockedRecipesArr, mockSetRecipes]
// }

// it, describe, userEvent vs fireEvent
test('renders selected recipe data', () => {
    const mockedSelectedRecipe = mockSelectedRecipe(1);
    const mockedRecipesArr = mockRecipesArr();
    const mockSetRecipes = jest.fn();
    render(<Recipe recipes={mockedRecipesArr} setRecipes={mockSetRecipes} selectedRecipe={mockedSelectedRecipe}/>);

    // Check heading render correct data
    const h2 = screen.getByRole('heading', {level: 2});
    expect(h2).toHaveTextContent(mockedSelectedRecipe.name);
    const h3 = screen.getByRole('heading', {level: 3});
    expect(h3).toHaveTextContent(mockedSelectedRecipe.description);
});

test('Check ingredient list renders correctly', () => {
    const mockedSelectedRecipe = mockSelectedRecipe(1);
    const mockedRecipesArr = mockRecipesArr();
    const mockSetRecipes = jest.fn();
    render(<Recipe recipes={mockedRecipesArr} setRecipes={mockSetRecipes} selectedRecipe={mockedSelectedRecipe}/>);

    const ingredientList = screen.getByRole('ingredient-list');
    expect(ingredientList).toHaveTextContent("Test Ingredient 1");
})

test('Check clicking button opens form', () => {
    const mockedSelectedRecipe = mockSelectedRecipe(1);
    const mockedRecipesArr = mockRecipesArr();
    const mockSetRecipes = jest.fn();
    render(<Recipe recipes={mockedRecipesArr} setRecipes={mockSetRecipes} selectedRecipe={mockedSelectedRecipe}/>);

    expect(screen.queryByTestId('recipe-form')).toBeNull();
    const editRecipeButton = screen.getByRole('edit-recipe');
    userEvent.click(editRecipeButton);
    expect(screen.getByTestId('recipe-form').textContent).toBe("Recipe Name:Description:Add Ingredients:Submit");
});

test('Check clicking delete button calls axios DELETE', () => {
    const mockedSelectedRecipe = mockSelectedRecipe(1);
    const mockedRecipesArr = mockRecipesArr();
    const mockSetRecipes = jest.fn();
    render(<Recipe recipes={mockedRecipesArr} setRecipes={mockSetRecipes} selectedRecipe={mockedSelectedRecipe}/>);

    const deleteRecipeButton = screen.getByRole('delete-recipe');
    userEvent.click(deleteRecipeButton);
    const mockDeleteRecipe =
        deleteRecipe as typeof deleteRecipe & jest.Mock
    mockDeleteRecipe.mockReturnValue(undefined);
    expect(mockDeleteRecipe).toBeCalledTimes(1);
});
