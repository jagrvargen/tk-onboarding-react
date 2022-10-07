import {act, render, screen} from '@testing-library/react';
import RecipeForm from "./RecipeForm";
import {deleteRecipe, submitNewRecipe, updateRecipe} from "./api";
import {RecipeData} from "./App";
import userEvent from "@testing-library/user-event";

jest.mock('./api');

const mockSelectedRecipe = (recipeId) => {
    const recipeData: RecipeData = {
        id: recipeId,
        name: `Test Recipe ${recipeId}`,
        description: `Test Recipe ${recipeId} Description`,
        ingredients: [{id: recipeId, name: `Test Ingredient ${recipeId}`}]
    }

    return recipeData;
}

const mockEmptyRecipe = () => {
    const emptyRecipeData: RecipeData = {
        id: null,
        name: "",
        description: "",
        ingredients: []
    }

    return emptyRecipeData
}

test('recipe form renders form with 3 input fields and a submit button', () => {
    const mockedSelectedRecipe = mockSelectedRecipe(1);
    render(<RecipeForm selectedRecipe={mockedSelectedRecipe} submissionType="edit"/>);

    expect(screen.getByTestId('recipe-form')).toHaveTextContent('Recipe Name:Description:Add Ingredients:Submit');
    expect(screen.getByTestId('recipe-form-name')).toHaveValue('Test Recipe 1');
    expect(screen.getByTestId('recipe-form-description')).toHaveValue('Test Recipe 1 Description');
    expect(screen.getByTestId('recipe-form-ingredients')).toHaveValue('Test Ingredient 1');
});

test('adding text to name field', () => {
    const mockedEmptyRecipe = mockEmptyRecipe();
    render(<RecipeForm selectedRecipe={mockedEmptyRecipe} submissionType="new"/>);

    const recipeNameInput = screen.getByTestId('recipe-form-name');
    userEvent.type(recipeNameInput, 'Test Recipe Name Text');
    expect(recipeNameInput).toHaveValue('Test Recipe Name Text');
});

test('adding text to description field', () => {
    const mockedEmptyRecipe = mockEmptyRecipe();
    render(<RecipeForm selectedRecipe={mockedEmptyRecipe} submissionType="new"/>);

    const recipeDescriptionInput = screen.getByTestId('recipe-form-description');

    userEvent.type(recipeDescriptionInput, 'Test Recipe Description Text');
    expect(recipeDescriptionInput).toHaveValue('Test Recipe Description Text');
});

test('adding text to ingredients field', () => {
    const mockedEmptyRecipe = mockEmptyRecipe();
    render(<RecipeForm selectedRecipe={mockedEmptyRecipe} submissionType="new"/>);

    const recipeIngredientsInput = screen.getByTestId('recipe-form-ingredients');

    userEvent.type(recipeIngredientsInput, 'Test Recipe Ingredients Text');
    expect(recipeIngredientsInput).toHaveValue('Test Recipe Ingredients Text');
});

test('submit recipe update', () => {
    const mockedSelectedRecipe = mockSelectedRecipe(1);
    render(<RecipeForm selectedRecipe={mockedSelectedRecipe} submissionType="edit"/>);
    const mockUpdateRecipe = updateRecipe as typeof updateRecipe & jest.Mock;

    const submitButton = screen.getByTestId('submit');
    userEvent.click(submitButton);
    expect(mockUpdateRecipe).toHaveBeenCalledTimes(1);
});

test('submit new recipe', () => {
    const mockedEmptyRecipe = mockEmptyRecipe();
    render(<RecipeForm selectedRecipe={mockedEmptyRecipe} submissionType="new"/>);
    const recipeNameInput = screen.getByTestId('recipe-form-name');
    const recipeDescriptionInput = screen.getByTestId('recipe-form-description');
    const recipeIngredientsInput = screen.getByTestId('recipe-form-ingredients');

    userEvent.type(recipeNameInput, 'Test Recipe Name Text');
    userEvent.type(recipeDescriptionInput, 'Test Recipe Description Text');
    userEvent.type(recipeIngredientsInput, 'Test Recipe Ingredients Text');

    const mockUpdateRecipe = submitNewRecipe as typeof submitNewRecipe & jest.Mock;

    const submitButton = screen.getByTestId('submit');
    userEvent.click(submitButton);
    expect(mockUpdateRecipe).toHaveBeenCalledTimes(1);
});

test('ingredientsArrToStr converts ingredients objects array to text string', () => {
    const mockedSelectedRecipe = mockSelectedRecipe(1);
    mockedSelectedRecipe.ingredients.push({id: 2, name: 'Test Ingredient 2'})
    render(<RecipeForm selectedRecipe={mockedSelectedRecipe} submissionType="edit"/>);

    const ingredientsInput = screen.getByTestId('recipe-form-ingredients');
    expect(ingredientsInput).toHaveValue('Test Ingredient 1,Test Ingredient 2');
});

test('ingredientStrToArray converts text string to ingredients objects array', () => {
    const mockedEmptyRecipe = mockEmptyRecipe();
    render(<RecipeForm selectedRecipe={mockedEmptyRecipe} submissionType="new"/>);
    const recipeNameInput = screen.getByTestId('recipe-form-name');
    const recipeDescriptionInput = screen.getByTestId('recipe-form-description');
    const recipeIngredientsInput = screen.getByTestId('recipe-form-ingredients');
    const submitButton = screen.getByTestId('submit');
    const mockUpdateRecipe = submitNewRecipe as typeof submitNewRecipe & jest.Mock;

    userEvent.type(recipeNameInput, 'Test Recipe Name Text');
    userEvent.type(recipeDescriptionInput, 'Test Recipe Description Text');
    userEvent.type(recipeIngredientsInput, 'Test Recipe Ingredients Text 1,Test Recipe Ingredients Text 2');
    userEvent.click(submitButton);

    const expectedInput = {
        "description": "Test Recipe Description Text",
        "ingredients": [{"name": "Test Recipe Ingredients Text 1"}, {"name": "Test Recipe Ingredients Text 2"}],
        "name": "Test Recipe Name Text"
    }

    expect(mockUpdateRecipe).toBeCalledWith(expectedInput)
});