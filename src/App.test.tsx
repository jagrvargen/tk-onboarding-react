import {fireEvent, render, screen} from '@testing-library/react';
import App from './App';
import {BrowserRouter} from "react-router-dom";
import axios from "axios";

jest.mock('./RecipeList');
jest.mock('axios');

test('renders app title', () => {
    render(<BrowserRouter> <App/></BrowserRouter>);
    const title = screen.getByRole("heading", {name: 'My Fun Recipes'});
    expect(title).toBeInTheDocument();
});
