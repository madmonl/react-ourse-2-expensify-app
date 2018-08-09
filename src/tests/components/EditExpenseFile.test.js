import React from 'react';
import { shallow } from 'enzyme';
import { EditExpensePage } from '../../components/EditExpensePage';
import expenses from '../fixtures/expenses';

let history, wrapper, editExpense, removeExpense;

beforeEach(() => {
    history = { push: jest.fn() };
    editExpense = jest.fn();
    removeExpense = jest.fn();
    wrapper = shallow(
        <EditExpensePage 
            history={history} 
            expense={expenses[0]} 
            editExpense={editExpense} 
            removeExpense={removeExpense} 
        />
    );
});

test('should render EditExensePage', () => {
    expect(wrapper).toMatchSnapshot()
});

test('should handle editExpense', () => {
    wrapper.find('ExpenseForm').prop('onSubmit')(expenses[0]);
    expect(editExpense).toHaveBeenLastCalledWith(expenses[0].id, expenses[0]);
    expect(history.push).toHaveBeenLastCalledWith('/'); 
});

test('should handle removeExpense', () => {
    wrapper.find('button').simulate('click', {});
    expect(removeExpense).toHaveBeenLastCalledWith({ id: expenses[0].id });
    expect(history.push).toHaveBeenLastCalledWith('/');
});