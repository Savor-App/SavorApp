import { applyMiddleware, createStore} from "redux";
import reducer from "./reducers";
import thunk from 'redux-thunk';
import {logger} from 'redux-logger';

const middleware = applyMiddleware(thunk, logger);

export default createStore(reducer, middleware);
