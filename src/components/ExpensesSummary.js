import React from 'react';
import numeral from 'numeral';
import { connect } from 'react-redux';
import expensesTotal from '../selectors/expenses-total';
import expensesSelector from '../selectors/expenses';
import { Link } from 'react-router-dom';

export const ExpensesSummary = ({ expenseCount, expensesTotal }) => {
    const expenseWord = expenseCount === 1 ? 'expense' : 'expenses';
    const formattedExpensesTotal = numeral(expensesTotal / 100).format('$0,0.00');
    
    return (
        <div className="page-header">
            <div className="content-container">
                <h1 className="page-header__title"> 
                    Viewing <span>{expenseCount}</span> {expenseWord} totalling: <span>{formattedExpensesTotal}</span>.
                    <div className="page-header__actions">
                        <Link className="button" to="/create">Add Expense</Link>
                    </div>
                </h1>
            </div>       
        </div>
    );
};

const mapStateToProps = (state) => {
    const visibleExpenses = expensesSelector(state.expenses, state.filters);
    
    return {
        expenseCount: visibleExpenses.length,
        expensesTotal: expensesTotal(visibleExpenses)
    };
};

export default connect(mapStateToProps)(ExpensesSummary);