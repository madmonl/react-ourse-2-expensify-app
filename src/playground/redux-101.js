import { createStore } from 'redux';

const incrementCount = ({ incrementBy = 1 } = {}) => ({
    type: 'INCREMENT',
    incrementBy
});

const decrementCount = ({ decrementBy = 1 } = {}) => ({
    type: 'DECREMENT',
    decrementBy
});

const resetCounter = () => ({
    type: 'RESET'
});

const setCounter = ({ count } = {}) => ({
    type: 'SET',
    count
});

// Reducers
// 1. Reducers are pure functions.
// 2. Never change state or action.

const countReducer = (state = { count: 0 }, action) => {
    switch (action.type) {
        case  'INCREMENT':
            return {
                count: state.count + action.incrementBy
            }
        case  'DECREMENT':
            return {
                count: state.count - action.decrementBy
            }    
        case 'SET':
            return {
                count: action.count
            }
        case 'RESET':
            return {
                count: 0
            }
        default:
            return state;
    }
    if (action.type === 'INCREMENT'){
        return {
            count: state.count + 1
        }
    } else {
        return state;
    }
}

//Meaning if count = 0 is the default state if no previous state is given.
const store = createStore(countReducer);

const unsubscribe = store.subscribe(() => {
    console.log(store.getState());
});

store.dispatch(incrementCount({ incrementBy: 5 }));

store.dispatch(decrementCount({ decrementBy: 10 }));

store.dispatch(resetCounter());

store.dispatch(setCounter({ count: 101 }));

// unsubscribe();