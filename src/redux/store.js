import {createStore, applyMiddleware, /*bindActionCreators*/} from 'redux';
// create store allows us to export the creation of our store
import reducer from './reducer';
import promiseMiddleware from 'redux-promise-middleware';


// The Store is the object that brings the actions and reducers together. 
// The store holds application state, allows access to state, and allows state to be updated via dispatch(action).
// There is a single store in a redux app
// To split data handling logic, use reducer composition instad of splitting the store
// To create a store, import the reducer and pass it to createStore()

// The data lifecycle in any Redux app follows these 4 steps:
    // Call the store to emit an action, which is akin to spreading news to the rest of the app
    // The redux store calls the reducer function we gave it, and passes current state tree and actions to the reducer              (this step happens before any actions are dispatched)
    // The root reducer may combine the output of multiple reducers into a single state tree.
    // The Redux store saves the complete state tree returned by the root reducer.

export default createStore(reducer, applyMiddleware(promiseMiddleware()));
