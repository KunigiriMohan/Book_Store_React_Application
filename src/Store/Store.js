import {createStore,applyMiddleware} from 'redux'
import  BookStoreReducer  from './reducers/BookStoreReducer';
import {composeWithDevTools} from 'redux-devtools-extension';
import thunk from 'redux-thunk';

const middleware = [thunk]

const store = createStore(
    BookStoreReducer,
    composeWithDevTools(applyMiddleware(...middleware))
);
export default store;