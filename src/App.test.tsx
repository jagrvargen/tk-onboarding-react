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
