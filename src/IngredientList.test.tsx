import {render, screen} from '@testing-library/react';
import IngredientList from "./IngredientList";


test('test ingredients list renders recipes', () => {
    const mockIngredientsList = [{id: 1, name: "Test Ingredient 1"}, {id: 2, name: "Test Ingredient 2"}];
    render(<IngredientList ingredientsList={mockIngredientsList}/>);

    const ul = screen.getByRole('list')
    expect(ul).toBeInTheDocument();
    const lis = screen.getAllByRole('listitem');
    lis.forEach(item => {
        expect(item).toBeInTheDocument();
    })
    expect(lis[0]).toHaveTextContent("Test Ingredient 1");
    expect(lis[1]).toHaveTextContent("Test Ingredient 2");
})