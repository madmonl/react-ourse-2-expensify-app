import expensesReducer from '../../reducers/expenses';
import expenses from '../fixtures/expenses';

test('should setup default filter values', () => {
    const state = expensesReducer(undefined, { type: '@@INIT'})
    expect(state).toEqual([]);
});

test('should remove expense by id', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: expenses[1].id
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0], expenses[2]]);
});

test('should remove expense by id when doesn`t exists', () => {
    const action = {
        type: 'REMOVE_EXPENSE',
        id: '-1'
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should add expense', () => {
    const action = {
        type: 'ADD_EXPENSE',
        expense: {
            description: 'Liad' 
        }
    };

    const state = expensesReducer(undefined, action);
    expect(state).toEqual([{ description: 'Liad' }]);
});

test('should edit expense', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: expenses[0].id,
        updates: {
            description: 'Changed Description' 
        }
    };

    const state = expensesReducer(expenses, action);
    expect(state[0].description).toBe('Changed Description');
});

test('should not edit expense, since not found', () => {
    const action = {
        type: 'EDIT_EXPENSE',
        id: '-1',
        updates: {
            description: 'Changed Description' 
        }
    };

    const state = expensesReducer(expenses, action);
    expect(state).toEqual(expenses);
});

test('should set expenses in reducer properly', () => {
    const action = {
        type: 'SET_EXPENSES',
        expenses: [expenses[0]]
    };
    const state = expensesReducer(expenses, action);
    expect(state).toEqual([expenses[0]]);
});

