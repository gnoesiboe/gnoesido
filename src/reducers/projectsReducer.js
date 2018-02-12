// @flow

import type { Project } from '../model/type/Project';
import type {
    Action,
    AddProjectAction,
    AddTodoAction,
    UpdateTodoAction,
    DeleteTodoAction,
    MoveTodoAction,
    DeleteProjectAction
} from '../action/types';
import {
    ADD_PROJECT,
    ADD_TODO,
    UPDATE_TODO,
    DELETE_TODO,
    MOVE_TODO,
    DELETE_PROJECT
} from '../action/types';
import { createProjectFromAddProjectAction } from '../model/factory/projectFactory';
import { arrayMove } from 'react-sortable-hoc';

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

function _handleDeleteTodoAction(currentState: ProjectsReducerState, action: DeleteTodoAction): ProjectsReducerState {
    return currentState.map((project: Project) => {
        if (project.sortedTodos.indexOf(action.id) !== -1) {
            return {
                ...project,
                sortedTodos: project.sortedTodos.filter((todoId) => todoId !== action.id)
            };
        }

        return project;
    });
}

function _handleMoveTodoAction(currentState: ProjectsReducerState, action: MoveTodoAction): ProjectsReducerState {
    if (action.active) {
        return currentState;
    }

    if (!action.projectId) {
        throw new Error('We should be able to expect there to be a projectId available at this poit');
    }

    return currentState.map((project: Project) => {
        if (project.id === action.projectId) {
            return {
                ...project,
                sortedTodos: arrayMove(project.sortedTodos, action.oldIndex, action.newIndex)
            };
        }

        return project;
    })
}

function _handleDeleteProjectAction(currentState : ProjectsReducerState, action: DeleteProjectAction) : ProjectsReducerState {
    return currentState.filter((project : Project) => {
        console.log('test: ', project.id, action.id);

        return project.id !== action.id;
    });
}

export function projectsReducer(currentState: ProjectsReducerState = [], action: Action) : ProjectsReducerState {
    switch (action.type) {
        case ADD_PROJECT:
            // $ExpectError
            var addAction : AddProjectAction = (action: Action);
            return _handleAddProjectAction(currentState, addAction);

        case DELETE_PROJECT:
            // $ExpectError
            var deleteProjectAction : DeleteTodoAction = (action: Action);
            return _handleDeleteProjectAction(currentState, deleteProjectAction);

        case ADD_TODO:
            // $ExpectError
            var addTodoAction : AddTodoAction = (action: Action);
            return _handleAddTodoAction(currentState, addTodoAction);

        case UPDATE_TODO:
            // $ExpectError
            var updateTodoAction : UpdateTodoAction = (action: Action);
            return _handleUpdateTodoAction(currentState, updateTodoAction);

        case DELETE_TODO:
            // $ExpectError
            var deleteTodoAction : DeleteTodoAction = (action: Action);
            return _handleDeleteTodoAction(currentState, deleteTodoAction);

        case MOVE_TODO:
            // $ExpectError
            var moveTodoAction : MoveTodoAction = (action: Action);
            return _handleMoveTodoAction(currentState, moveTodoAction);

        default:
            return currentState;
    }
}
