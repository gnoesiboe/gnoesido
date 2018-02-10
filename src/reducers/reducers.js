// @flow

import { combineReducers } from 'redux';
import { todosReducer } from './todosReducer';
import { projectsReducer } from './projectsReducer';
import { currentReducer } from './currentReducer';
import { activeSortedTodosReducer } from './activeSortedTodosReducer';

var reducers : Object = {
    todos: todosReducer,
    projects: projectsReducer,
    current: currentReducer,
    activeSortedTodos: activeSortedTodosReducer
}

var rootReducer : Function = combineReducers(reducers);

export default rootReducer;
