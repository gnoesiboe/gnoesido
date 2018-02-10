// @flow

import type {
    ActivateNextProjectAction,
    ActivatePreviousProjectAction,
    UpdateTodoAction,
    AddTodoAction,
    DeleteTodoAction,
    AddProjectAction
} from './types';
import {
    UPDATE_TODO,
    ADD_TODO,
    DELETE_TODO,
    ADD_PROJECT,
    ACTIVATE_PREVIOUS_PROJECT,
    ACTIVATE_NEXT_PROJECT
} from './types';
import type { TodoFormData } from '../components/todoList/components/todoForm/TodoForm';
import type { ProjectFormData } from '../components/projectList/components/ProjectForm';
import uuid from 'uuid';

export function createUpdateTodoAction(id: string, checked: boolean, title: string, previousProjectId: string, projectId: string, previousActive: boolean, active: boolean) : UpdateTodoAction {
    return {
        type: UPDATE_TODO,
        id,
        checked,
        title,
        previousProjectId,
        projectId,
        previousActive,
        active
    };
}

export function createAddTodoAction(data: TodoFormData) : AddTodoAction {
    return {
        type: ADD_TODO,
        id: uuid(),
        title: data.title,
        projectId: data.projectId,
        active: data.active
    };
}

export function createDeleteTodoAction(id: string) : DeleteTodoAction {
    return { type: DELETE_TODO, id };
}

export function createAddProjectAction(data : ProjectFormData) : AddProjectAction {
    return {
        type: ADD_PROJECT,
        title: data.title,
        abbrevation: data.abbrevation
    };
}

export function createActivatePreviousProjectAction(list: string, todo: ?string) : ActivatePreviousProjectAction {
    return { type: ACTIVATE_PREVIOUS_PROJECT, list, todo };
}

export function createActivateNextProjectAction(list: string, todo: ?string) : ActivateNextProjectAction {
    return { type: ACTIVATE_NEXT_PROJECT, list, todo };
}
