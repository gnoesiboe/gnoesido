// @flow

import { combineReducers } from 'redux';
import { todosReducer } from './todosReducer';
import { projectsReducer } from './projectsReducer';
import { currentReducer } from './currentReducer';

var reducers : Object = {
    todos: todosReducer,
    projects: projectsReducer,
    current: currentReducer
}

var rootReducer : Function = combineReducers(reducers);

export default rootReducer;
