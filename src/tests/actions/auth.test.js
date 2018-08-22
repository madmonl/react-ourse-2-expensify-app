import { login, logout } from '../../actions/auth';

test('expect login action to work properly', () => {
    const uid = 'some id'; 
    const loginAction = login(uid);
    expect(loginAction).toEqual({
        type: 'LOGIN',
        uid: 'some id'
    });    
});

test('expect logout action to work properly', () => {
    const logoutAction = logout();
    expect(logoutAction).toEqual({
        type: 'LOGOUT'
    });
});