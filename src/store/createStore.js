// @flow

import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import reducers from './../reducers/reducers'
import uuid from 'uuid';
import type { Todo } from './../model/type/Todo';

export function createStore(): Array<Function> {
    var middleware = [
        createLogger({ collapsed: true }),
        promiseMiddleware(),
        thunkMiddleware
    ];

    var createStoreWithMiddleware = applyMiddleware(...middleware)(reduxCreateStore);

    var initialTodos : Array<Todo> = [
        {
            id: uuid(),
            title: 'Magna Ullamcorper Fringilla Bibendum',
            checked: false
        },
        {
            id: uuid(),
            title: 'Tristique Fermentum Ultricies Nibh',
            checked: true
        }
    ];

    return createStoreWithMiddleware(reducers, {
        todos: initialTodos
    });
}
