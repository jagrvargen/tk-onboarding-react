import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import axios from "axios";

jest.mock('./RecipeList');
jest.mock('axios');

test('renders app title', () => {
    render(<BrowserRouter> <App/></BrowserRouter>);
    // getByRole to get type of element e.g. <button>
    // see: https://testing-library.com/docs/queries/about#priority
    const title = screen.getByRole("heading", {name: 'My Fun Recipes'});
    expect(title).toBeInTheDocument();
});

// test('test add recipe button renders form', () => {
//     render(<BrowserRouter> <App/></BrowserRouter>);
//     const resp = {
//         id: 1,
//         name: 'Test Recipe',
//         description: 'Test Recipe Description',
//         ingredients: [{name: 'Test ingredient'}]
//     }
//     axios.get.mockResolvedValue(resp);
//
//     const recipe = screen.getByText('button')
//     // const addRecipeButton = screen.getByLabelText("button");
//     // expect(addRecipeButton.textContent).toBe('Add Recipe');
//     //
//     // fireEvent.click(addRecipeButton);
//
// })
