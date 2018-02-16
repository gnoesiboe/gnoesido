// @flow

import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import reducers from './../reducers/reducers'
import localPersistingMiddleware from '../middleware/localPersistingMiddleware';
import * as localStorageRepository from './../repository/localStorageRepository';

export function createStore(id: string): Object {
    var middleware : Array<Function> = [
        localPersistingMiddleware,
        createLogger({ collapsed: true }),
        promiseMiddleware(),
        thunkMiddleware
    ];

    type StoreFactoryType = (reducers: Function, initialState: Object) => Object;

    var createStoreWithMiddleware : StoreFactoryType = applyMiddleware(...middleware)(reduxCreateStore);

    var initialState = localStorageRepository.getState(id) || undefined;

    return createStoreWithMiddleware(reducers, initialState);
}
