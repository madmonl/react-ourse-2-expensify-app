import moment from 'moment';
import filtersReducer from '../../reducers/filters';

test('should setup default filter values', () => {
    const state = filtersReducer(undefined, { type: '@@INIT'})
    expect(state).toEqual({
        text: '',
        sortBy: 'date',
        startDate: moment().startOf('month'),
        endDate: moment().endOf('month')
    });
});

test('should set to sort by amount', () => {
    const state = filtersReducer(undefined, { type: 'SORT_BY_AMOUNT'})
    expect(state.sortBy).toBe('amount');
});

test('should set to sort by date', () => {
    const prevState = {
        text: '',
        sortBy: 'amount',
        startDate: undefined,
        endDate: undefined
    };

    const state = filtersReducer(prevState, { type: 'SORT_BY_DATE'})
    expect(state.sortBy).toBe('date');
});

test('should set text filter', () => {
    const state = filtersReducer(undefined, { type: 'SET_TEXT_FILTER', text: 'hello' })
    expect(state.text).toBe('hello');
});

test('should set startDate filter', () => {
    const state = filtersReducer(undefined, { 
        type: 'SET_START_DATE', 
        startDate: moment().startOf('month') 
    });
    expect(state.startDate).toEqual(moment().startOf('month'));
});

// Another way of achieving the same comparison.
// Don't forget moment is an object.
test('should set endDate filter', () => {
    const state = filtersReducer(undefined, { 
        type: 'SET_END_DATE', 
        endDate: moment()
    });
    expect(state.endDate).toEqual(moment());
});
