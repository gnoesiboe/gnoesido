// @flow

import type { Project } from '../model/type/Project';
import type {
    Action,
    AddProjectAction,
    AddTodoAction
} from '../action/types';
import {
    ADD_PROJECT,
    ADD_TODO
} from '../action/types';
import { createProjectFromAddProjectAction } from '../model/factory/projectFactory';

export type ProjectsReducerState = Array<Project>;

function _handleAddProjectAction(currentState: ProjectsReducerState, action: AddProjectAction): ProjectsReducerState {
    return [
        ...currentState,
        createProjectFromAddProjectAction(action)
    ];
}

function _handleAddTodoAction(currentState: ProjectsReducerState, action: AddTodoAction): ProjectsReducerState {
    return currentState.map((project: Project) => {
        if (project.id === action.projectId) {
            return {
                ...project,
                sortedTodos: [...project.sortedTodos, action.id]
            };
        }

        return project;
    });
}

export function projectsReducer(currentState: ProjectsReducerState = [], action: Action) : ProjectsReducerState {
    switch (action.type) {
        case ADD_PROJECT:
            // $ExpectError
            var addAction : AddProjectAction = (action: Action);
            return _handleAddProjectAction(currentState, addAction);

        case ADD_TODO:
            // $ExpectError
            var addTodoAction : AddTodoAction = (action: Action);
            return _handleAddTodoAction(currentState, addTodoAction);

        default:
            return currentState;
    }
}
