import React from 'react';
import { shallow } from 'enzyme';
import { ExpenseListFilters } from '../../components/ExpenseListFilters';
import { filters, altFilters } from '../fixtures/filters';

let setTextFilter, sortByDate, sortByAmount, setStartDate, setEndDate, wrapper;

beforeEach(() => {
    setTextFilter = jest.fn();
    sortByDate = jest.fn();
    sortByAmount = jest.fn();
    setStartDate = jest.fn();
    setEndDate = jest.fn();
    wrapper = shallow(
        <ExpenseListFilters 
            filters={filters}
            setTextFilter={setTextFilter}
            sortByDate={sortByDate}
            sortByAmount={sortByAmount}
            setStartDate={setStartDate}
            setEndDate={setEndDate}
        />
    );
});

test('should render expenseListFilters correctly', () => {
    expect(wrapper).toMatchSnapshot();
});

test('should render expenseListFilters with alt data correctly', () => {
    wrapper.setProps({ filters: altFilters });
    expect(wrapper).toMatchSnapshot();
});

test('should handle text change', () => {
    wrapper.find('input').simulate('change', {
        target: {
            value: 'should change text'
        }
    });
    expect(setTextFilter).toHaveBeenCalledWith('should change text')
});

test('should sort by date', () => {
    wrapper.setProps({ filters: altFilters });
    wrapper.find('select').simulate('change', { 
        target: {
             value: 'date' 
        }
    });
    expect(sortByDate).toHaveBeenCalledTimes(1);    
});

test('should sort by amount', () => {
    wrapper.find('select').simulate('change', { 
        target: {
             value: 'amount' 
        }
    });
    expect(sortByAmount).toHaveBeenCalledTimes(1);
});

test('should handle date changes', () => {
    wrapper.find('DateRangePicker').prop('onDatesChange')({
        startDate: altFilters.startDate,
        endDate: altFilters.endDate
    })
    expect(setStartDate).toHaveBeenLastCalledWith(altFilters.startDate);
    expect(setEndDate).toHaveBeenLastCalledWith(altFilters.endDate);
});

test('should handle dateFocus changes', () => {
    wrapper.find('DateRangePicker').prop('onFocusChange')('startDate');
    expect(wrapper.state('calendarFocused')).toBe('startDate');    
});