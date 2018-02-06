// @flow

import { combineReducers } from 'redux';
import { todosReducer } from './todosReducer';
import { projectsReducer } from './projectsReducer';

var reducers : Object = {
    todos: todosReducer,
    projects: projectsReducer
}

var rootReducer : Function = combineReducers(reducers);

export default rootReducer;
