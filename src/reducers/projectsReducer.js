// @flow

import type { Project } from '../model/type/Project';
import type {
    Action,
    AddProjectAction,
    AddTodoAction,
    UpdateTodoAction
} from '../action/types';
import {
    ADD_PROJECT,
    ADD_TODO,
    UPDATE_TODO
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

function _handleUpdateTodoAction(currentState: ProjectsReducerState, action: UpdateTodoAction): ProjectsReducerState {
    if (action.projectId === action.previousProjectId) {
        return currentState;
    }

    // at this point we know the todo has changed from to another project
    return currentState.map((project: Project) => {
        if (project.id === action.previousProjectId) {
            return {
                ...project,
                sortedTodos: project.sortedTodos.filter((todoId: string) => todoId !== action.id)
            };
        } else if (project.id === action.projectId) {
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

        case UPDATE_TODO:
            // $ExpectError
            var updateTodoAction : UpdateTodoAction = (action: Action);
            return _handleUpdateTodoAction(currentState, updateTodoAction);

        default:
            return currentState;
    }
}
