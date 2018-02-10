import type { Todo } from '../type/Todo';
import type { AddTodoAction } from '../../action/types';

export function createTodoFromAddTodoAction(action: AddTodoAction): Todo {
    return {
        id: action.id,
        projectId: action.projectId,
        active: action.active,
        title: action.title,
        checked: false
    };
}
