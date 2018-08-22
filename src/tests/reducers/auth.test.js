import expensesReducer from '../../reducers/auth';

test('testing auth reducer for login', () => {
    const loginAction = {
        type: 'LOGIN',
        uid: '1'
    };
    const state = expensesReducer(undefined, loginAction);
    expect(state).toEqual({ id: '1' });
});

test('testing auth reducer for logout', () => {
    const logoutAction = {
        type: 'LOGOUT'
    };
    const state = expensesReducer({ uid: 'anything' }, logoutAction);
    expect(state).toEqual({});
});