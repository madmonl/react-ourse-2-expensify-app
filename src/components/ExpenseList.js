import React from 'react';
import { connect } from 'react-redux';
import ExpenseListItem from './ExpenseListItem';
import ExpensesSelector from '../selectors/expenses';

// Exporting both named(not connected to the store) version
// of Expense list, and default exported version - connected
// to the store, for actual running.
export const ExpenseList = (props) => (
    <div className="content-container">
        <div className="list-header">
            <div className="show-for-mobile">Expenses</div>
            <div className="show-for-desktop">Expense</div>
            <div className="show-for-desktop">Amount</div>
        </div>
        <div className="list-body">
            {
                props.expenses.length === 0 ? (
                    <div className="list-item list-item--message">
                        <span>No Expenses</span>
                    </div>
                    
                ) : (
                    props.expenses.map((expense) => (
                        <ExpenseListItem key={expense.id} {...expense}/>
                    ))
                )
            }
        </div>
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
