// @flow

export const UPDATE_TODO : string = 'update_todo';
export const ADD_TODO : string = 'add_todo';
export const DELETE_TODO : string = 'delete_todo';
export const ADD_PROJECT : string = 'add_project';
export const ACTIVATE_PREVIOUS : string = 'activate_previous';
export const ACTIVATE_NEXT : string = 'activate_next';

export type Action = $ReadOnly<{
    type: string
}>;

export type UpdateTodoAction = $ReadOnly<{
    type: string,
    id: string,
    checked: boolean,
    title: string,
    projectId: string,
    active: boolean
}>;

export type AddTodoAction = $ReadOnly<{
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

export type ActivateNextAction = $ReadOnly<{
    type: string,
    list: string,
    todo: ?string
}>;

export type ActivatePreviousAction = $ReadOnly<{
    type: string,
    list: string,
    todo: ?string
}>;
