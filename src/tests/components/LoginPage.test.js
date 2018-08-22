import React from 'react';
import { shallow } from 'enzyme';
import { LoginPage } from '../../components/LoginPage';

let startLogin;

beforeAll(() => {
    startLogin = jest.fn();
});

test('Login Page snapshot', () => {
    const wrapper = shallow(<LoginPage startLogin={() => {}} />);
    expect(wrapper).toMatchSnapshot();
});

test('should call Login Page button', () => {
    const wrapper = shallow(<LoginPage startLogin={startLogin}/>);
    wrapper.find("button").simulate("click");
    expect(startLogin).toHaveBeenCalled();
});