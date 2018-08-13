import selectExpensesTotal from '../../selectors/expenses-total.js';

export default [{
    id: '1',
    description: 'Gum',
    note: '',
    amount: 195,
    createdAt: 0
}, {
    id: '2',
    description: 'Rent',
    note: '',
    amount: 109500,
    createdAt: moment(0).subtract(4, 'days').valueOf()
}, {
    id: '3',
    description: 'Credit Card',
    note: '',
    amount: 4500,
    createdAt: moment(0).add(4, 'days').valueOf()
}];

const total = selectExpensesTotal(expenses);

export default (expenses) => {
    return expenses.map((expense) => expense.amount).reduce((a,b) => a + b, 0);
};

console.log(total);