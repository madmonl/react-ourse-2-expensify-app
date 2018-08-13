import expenses from '../fixtures/expenses';
import selectExpensesTotal from '../../selectors/expenses-total.js';

test('should return 0 if no expenses', () => {
    const total = selectExpensesTotal([]);
    expect(total).toBe(0);
});

test('should correctly add up a single expense', () => {
    const total = selectExpensesTotal([expenses[0]]);
    expect(total).toBe(expenses[0].amount);
});

test('should correctly add up multiple expenses', () => {
    const totalAmount = expenses[0].amount + 
                        expenses[1].amount + 
                        expenses[2].amount
    const total = selectExpensesTotal(expenses);
    expect(total).toBe(totalAmount);
});

const total = selectExpensesTotal(expenses);


