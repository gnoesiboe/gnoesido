// @flow

export const UPDATE_TODO : string = 'update_todo';
export const ADD_TODO : string = 'add_todo';
export const DELETE_TODO : string = 'delete_todo';
export const ADD_PROJECT : string = 'add_project';
export const ACTIVATE_PREVIOUS_PROJECT : string = 'activate_previous_project';
export const ACTIVATE_NEXT_PROJECT : string = 'activate_next_project';
export const MOVE_TODO : string = 'move_todo';

export type Action = $ReadOnly<{
    type: string
}>;

export type UpdateTodoAction = $ReadOnly<{
    type: string,
    id: string,
    checked: boolean,
    title: string,
    previousProjectId: string,
    projectId: string,
    previousActive: boolean,
    active: boolean
}>;

export type AddTodoAction = $ReadOnly<{
    id: string,
    type: string,
    title: string,
    projectId: string,
    active: boolean
}>;

export type DeleteTodoAction = $ReadOnly<{
    type: string,
    id: string
}>

export type AddProjectAction = $ReadOnly<{
    type: string,
    title: string,
    abbrevation: string
}>;

export type ActivateNextProjectAction = $ReadOnly<{
    type: string,
    list: string,
    todo: ?string
}>;

export type ActivatePreviousProjectAction = $ReadOnly<{
    type: string,
    list: string,
    todo: ?string
}>;

export type MoveTodoAction = $ReadOnly<{
    type: string,
    newIndex: number,
    oldIndex: number,
    projectId: ?string,
    active: boolean
}>;
