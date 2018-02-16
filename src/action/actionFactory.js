// @flow

import type {
    ActivateNextProjectAction,
    ActivatePreviousProjectAction,
    ActivateNextTodoAction,
    ActivatePreviousTodoAction,
    UpdateTodoAction,
    AddTodoAction,
    DeleteTodoAction,
    AddProjectAction,
    DeleteProjectAction,
    MoveProjectAction,
    MoveTodoAction,
    ActivateTodosThatStartToday,
    EditProjectAction
} from './types';
import {
    UPDATE_TODO,
    ADD_TODO,
    DELETE_TODO,
    ADD_PROJECT,
    DELETE_PROJECT,
    MOVE_PROJECT,
    ACTIVATE_PREVIOUS_PROJECT,
    ACTIVATE_NEXT_PROJECT,
    ACTIVATE_NEXT_TODO,
    ACTIVATE_PREVIOUS_TODO,
    MOVE_TODO,
    ACTIVATE_TODOS_THAT_START_TODAY,
    EDIT_PROJECT
} from './types';
import type { TodoFormData } from '../components/todoList/components/todoForm/TodoForm';
import type { ProjectFormData } from '../components/projectList/components/ProjectForm';
import uuid from 'uuid';

export function createUpdateTodoAction(
    id: string,
    checked: boolean,
    title: string,
    previousProjectId: string,
    projectId: string,
    previousActive: boolean,
    active: boolean,
    startsAt: string
) : UpdateTodoAction {
    return { type: UPDATE_TODO, id, checked, title, previousProjectId, projectId, previousActive, active, startsAt };
}

export function createAddTodoAction(data: TodoFormData) : AddTodoAction {
    return {
        type: ADD_TODO,
        id: uuid(),
        title: data.title,
        projectId: data.projectId,
        startsAt: data.startsAt,
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

export function createEditProjectAction(id: string, title: string, abbrevation: string) : EditProjectAction {
    return { type: EDIT_PROJECT, id, title, abbrevation};
}

export function createDeleteProjectAction(id: string) : DeleteProjectAction {
    return { type: DELETE_PROJECT, id };
}

export function createMoveProjectAction(oldIndex : number, newIndex : number) : MoveProjectAction {
    return { type: MOVE_PROJECT, oldIndex, newIndex };
}

export function createActivatePreviousProjectAction(list: string) : ActivatePreviousProjectAction {
    return { type: ACTIVATE_PREVIOUS_PROJECT, list };
}

export function createActivateNextProjectAction(list: string) : ActivateNextProjectAction {
    return { type: ACTIVATE_NEXT_PROJECT, list };
}

export function createActivateNextTodoAction(todoIndex: number) : ActivateNextTodoAction {
    return { type: ACTIVATE_NEXT_TODO, todoIndex };
}

export function createActivatePreviousTodoAction(todoIndex: number) : ActivatePreviousTodoAction {
    return { type: ACTIVATE_PREVIOUS_TODO, todoIndex };
}

export function createMoveTodoAction(oldIndex: number, newIndex: number, projectId: ?string, active: boolean) : MoveTodoAction {
    return { type: MOVE_TODO, oldIndex, newIndex, projectId, active };
}

export function createActivateTodosThatStartTodayAction(ids : Array<string>) : ActivateTodosThatStartToday {
    return { type: ACTIVATE_TODOS_THAT_START_TODAY, ids };
}
