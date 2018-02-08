import type { Todo } from '../type/Todo';
import type { AddTodoAction } from '../../action/types';
import uuid from 'uuid';

export function createTodoFromAddTodoAction(action: AddTodoAction): Todo {
    return {
        id: uuid(),
        projectId: action.projectId,
        active: action.active,
        title: action.title,
        checked: false
    };
}
