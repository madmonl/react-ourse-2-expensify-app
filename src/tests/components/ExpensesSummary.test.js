import React from 'react';
import { ExpensesSummary } from '../../components/ExpensesSummary';
import { shallow } from 'enzyme';

test('Viewing 1 expense', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={1} expensesTotal={1003232230}/>)
    expect(wrapper).toMatchSnapshot();
});

test('Viewing 2 expenses', () => {
    const wrapper = shallow(<ExpensesSummary expenseCount={13} expensesTotal={1000}/>)
    expect(wrapper).toMatchSnapshot();
});
