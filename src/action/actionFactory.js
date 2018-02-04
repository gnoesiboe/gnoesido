// @flow

import type { UpdateTodoAction } from './types';
import { UPDATE_TODO } from './types';

export function createUpdateTodoAction(id: string, checked: boolean, title: string) : UpdateTodoAction {
    return { type: UPDATE_TODO, id, checked, title };
}
