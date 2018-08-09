import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import ExpensesSelector from '../selectors/expenses';

// Exporting both named(not connected to the store) version
// of Expense list, and default exported version - connected
// to the store, for actual running.
export const ExpenseList = (props) => (
    <div>
        {
            props.expenses.length === 0 ? (
               <p>No Expenses</p>
            ) : (
                props.expenses.map((expense) => (
                    <ExpenseListItem key={expense.id} {...expense}/>
                ))
            )
        }
    </div>
);

// filters is immutable as they are just props! 
// parent will see original filters
const mapStateToProps = (state) => {
    return {
        expenses: ExpensesSelector(state.expenses, state.filters)
    };
};

export default connect(mapStateToProps)(ExpenseList);
