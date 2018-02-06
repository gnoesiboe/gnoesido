// @flow

import { createStore as reduxCreateStore, applyMiddleware } from 'redux';
import { createLogger } from 'redux-logger';
import promiseMiddleware from 'redux-promise-middleware';
import thunkMiddleware from 'redux-thunk';
import reducers from './../reducers/reducers'
import uuid from 'uuid';
import type { Todo } from './../model/type/Todo';
import type { Project } from '../model/type/Project';

export function createStore(): Object {
    var middleware : Array<Function> = [
        createLogger({ collapsed: true }),
        promiseMiddleware(),
        thunkMiddleware
    ];

    type StoreFactoryType = (reducers: Function, initialState: Object) => Object;

    var createStoreWithMiddleware : StoreFactoryType = applyMiddleware(...middleware)(reduxCreateStore);

    var firstProjectId : string = uuid(),
        secondProjectId : string = uuid();

    var initialProjects : Array<Project> = [
        {
            id: firstProjectId,
            title: 'Theaters Tilburg',
            abbrevation: 'TT'
        },
        {
            id: secondProjectId,
            title: 'GGZ Standaarden',
            abbrevation: 'GZS'
        }
    ];

    var initialTodos : Array<Todo> = [
        {
            id: uuid(),
            projectId: firstProjectId,
            active: true,
            title: 'Magna Ullamcorper Fringilla Bibendum',
            checked: false
        },
        {
            id: uuid(),
            projectId: firstProjectId,
            active: false,
            title: 'Adipiscing Nibh Sit Inceptos',
            checked: false
        },
        {
            id: uuid(),
            projectId: secondProjectId,
            active: true,
            title: 'Tristique Fermentum Ultricies Nibh',
            checked: true
        }
    ];

    return createStoreWithMiddleware(reducers, {
        todos: initialTodos,
        projects: initialProjects
    });
}
