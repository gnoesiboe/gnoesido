// @flow

export const UPDATE_TODO : string = 'update_todo';
export const ADD_TODO : string = 'add_todo';

export type Action = $ReadOnly<{
    type: string
}>;

export type UpdateTodoAction = $ReadOnly<{
    type: string,
    id: string,
    checked: boolean,
    title: string
}>;

export type AddTodoAction = $ReadOnly<{
    type: string,
    title: string,
    projectId: string,
    active: boolean
}>;
