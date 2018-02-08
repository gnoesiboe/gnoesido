// @flow

import type { UpdateTodoAction, AddTodoAction, DeleteTodoAction } from './types';
import { UPDATE_TODO, ADD_TODO, DELETE_TODO } from './types';
import type { TodoFormData } from '../components/todoList/components/todoForm/TodoForm';

export function createUpdateTodoAction(id: string, checked: boolean, title: string) : UpdateTodoAction {
    return { type: UPDATE_TODO, id, checked, title };
}

export function createAddTodoAction(data: TodoFormData) : AddTodoAction {
    return {
        type: ADD_TODO,
        title: data.title,
        projectId: data.projectId,
        active: data.active
    };
}

export function createDeleteTodoAction(id: string) : DeleteTodoAction {
    return { type: DELETE_TODO, id };
}
