import configureMockStore from 'redux-mock-store';
import thunk from 'redux-thunk';
import { startEditExpense, startRemoveExpense, startSetExpenses, startAddExpense, addExpense, editExpense, removeExpense, setExpenses } from '../../actions/expenses';
import expenses from '../fixtures/expenses';
import db from '../../firebase/firebase';

const uid = 'thisismytestuid';
const createMockStore = configureMockStore([thunk]);

beforeEach((done) => {
    const expensesData = {};
    expenses.forEach(({ id, description, note, amount, createdAt }) => {
        expensesData[id] = { description, note, amount, createdAt } 
    });
    // If we will not use done the tests will start 
    // immediately
    db.ref(`users/${uid}/expenses`).set(expensesData).then(() => done());
});

// *** // Thunk // *** // 
// Thunk has 2 main ideas, 
// one of them is to delay action dispatchement
// second is to dispatch an action only when a condition is met.

// toBe -> for booleans, numbers, strings
// toEqual -> objects and arrays.
test('should setup remove expense action object', () => {
    const action = removeExpense({ id: '123abc' })
    expect(action).toEqual({
        type: 'REMOVE_EXPENSE',
        id: '123abc'
    });
});

test('should setup edit expense action object', () => {
    const action = editExpense('123abc', { note:'hi' })
    expect(action).toEqual({
        type: 'EDIT_EXPENSE',
        id: '123abc',
        updates: {
            note: 'hi'
        }
    });
});

test('should setup add expense with provided values', () => {
    const action = addExpense(expenses[2]);
    expect(action).toEqual({
        type: 'ADD_EXPENSE',
        expense: expenses[2]
    });
});

test('should add expense to database and store', (done) => {
    const store = createMockStore({ auth: { uid } });
    const expenseData = {
        description: 'Mouse',
        amount: 12,
        note: '',
        createdAt: 1000
    };

    store.dispatch(startAddExpense(expenseData)).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                ...expenseData    
            }
        });

        return db.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual(expenseData);
        // Note: in an async test we want to use 'done' func
        // so we can't consider the test neither a succes nor 
        // a failure until 'done' is called.
        done();
    });
});

test('should add expense with defaults to database and store', (done) => {
    const store = createMockStore({ auth: { uid } });
    store.dispatch(startAddExpense()).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'ADD_EXPENSE',
            expense: {
                id: expect.any(String),
                description: '', 
                note: '', 
                amount: 0, 
                createdAt: 0
            }
        });

        return db.ref(`users/${uid}/expenses/${actions[0].expense.id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toEqual({
            description: '', 
            note: '', 
            amount: 0, 
            createdAt: 0
        });
        done();
    });
});

test('should setup set expense action object with data', () => {
    const action = setExpenses(expenses);
    expect(action).toEqual({
        type: 'SET_EXPENSES',
        expenses
    });
});

test('should fetch the expenses from firebase', () => {
    const store = createMockStore({ auth: { uid } });
    store.dispatch(startSetExpenses()).then((action) => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'SET_EXPENSES',
            expenses
        });
    });
});

test('should remove expense from firebase', (done) => {
    const store = createMockStore({ auth: { uid } });
    const id = expenses[2].id;
    store.dispatch(startRemoveExpense({ id })).then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'REMOVE_EXPENSE',
            id
        });
        return db.ref(`users/${uid}/expenses/${id}`).once('value');
    }).then((snapshot) => {
        expect(snapshot.val()).toBeFalsy();
        done();
    });
});

test('should edit expense from firebase', (done) => {
    const store = createMockStore({ auth: { uid } });
    const id = expenses[2].id;
    const updates = {
        note: 'startEditExpense works well'
    };
    store.dispatch(startEditExpense(id, updates))
    .then(() => {
        const actions = store.getActions();
        expect(actions[0]).toEqual({
            type: 'EDIT_EXPENSE',
            id,
            updates 
        });
        return db.ref(`users/${uid}/expenses/${id}`).once('value');
    })
    .then((snapshot) => {
        expect(snapshot.val().note).toEqual(updates.note);
        done();
    })
});
















