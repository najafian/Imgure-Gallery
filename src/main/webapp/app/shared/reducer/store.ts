import {createStore, applyMiddleware, compose} from 'redux';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import reducer, {IRootState} from "./index";

const defaultMiddlewares = [
    thunkMiddleware,
    promiseMiddleware
];
const composedMiddlewares = (middlewares:any) => compose(applyMiddleware(...defaultMiddlewares, ...middlewares));

const initialize = (initialState?: IRootState, middlewares = [] as any[]) => createStore(reducer, initialState, composedMiddlewares(middlewares));

export default initialize;
