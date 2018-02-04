// @flow

export const UPDATE_TODO : string = 'update_todo';

export type Action = {
    type: string
};

export type UpdateTodoAction = {
    type: string,
    id: string,
    checked: boolean,
    title: string
};
