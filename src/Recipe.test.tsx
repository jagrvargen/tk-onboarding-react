import {fireEvent, render, screen} from '@testing-library/react';
import Recipe from './Recipe';
import {deleteRecipe} from "./api";
import {RecipeData} from "./App";

jest.mock("axios");
jest.mock("./api");

// it, describe, userEvent vs fireEvent
test('renders selected recipe data', () => {
    const mockedSelectedRecipe: RecipeData = {
        id: 1,
        name: 'Test Recipe 1',
        description: 'Test Recipe 1 Description',
        ingredients: [{id: 1, name: 'Test Ingredient 1'}]
    }
    const mockSetSelectedRecipe = jest.fn();
    mockSetSelectedRecipe.mockReturnValue({});

    // render(<Recipe selectedRecipe={mockedSelectedRecipe} onSelectRecipe={mockSetSelectedRecipe}/>);

    // Check heading render correct data
    const h2 = screen.getByRole('heading', {level: 2});
    expect(h2).toHaveTextContent(mockedSelectedRecipe.name);
    const h3 = screen.getByRole('heading', {level: 3});
    expect(h3).toHaveTextContent(mockedSelectedRecipe.description);

    // Check ingredient list renders correctly
    const ingredientList = screen.getByRole('ingredient-list');
    expect(ingredientList).toHaveTextContent("Test Ingredient 1");

    // Check clicking button opens form
    expect(screen.queryByTestId('recipe-form')).toBeNull();
    const editRecipeButton = screen.getByRole('edit-recipe');
    fireEvent.click(editRecipeButton);
    expect(screen.getByTestId('recipe-form').textContent).toBe("Recipe Name:Description:Add Ingredients:Submit");

    // Check clicking delete button calls axios DELETE
    const deleteRecipeButton = screen.getByRole('delete-recipe');
    fireEvent.click(deleteRecipeButton);
    const mockDeleteRecipe =
        deleteRecipe as typeof deleteRecipe & jest.Mock
    mockDeleteRecipe.mockReturnValue(undefined);
    expect(mockDeleteRecipe).toBeCalledTimes(1);
});
