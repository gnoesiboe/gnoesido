// @flow

import {
    UPDATE_TODO,
    ADD_TODO,
    DELETE_TODO,
    DELETE_PROJECT,
    ACTIVATE_TODOS_THAT_START_TODAY
} from '../action/types';
import type {
    UpdateTodoAction,
    AddTodoAction,
    DeleteTodoAction,
    DeleteProjectAction,
    Action
} from '../action/types';
import type { Todo } from '../model/type/Todo';
import { createTodoFromAddTodoAction } from '../model/factory/todoFactory';
import { createToday, createMomentFromDate } from '../helper/dateTimeHelper';
import { NotificationManager } from 'react-notifications';

export type TodosReducerState = Array<Todo>;

function _handleUpdateTodoAction(currentState: TodosReducerState, action: UpdateTodoAction): TodosReducerState {
    return currentState.map((currentTodo: Todo) : Todo => {
        if (currentTodo.id ===  action.id) {
            return {
                ...currentTodo,
                checked:  action.checked,
                title:  action.title,
                projectId: action.projectId,
                active: action.active,
                startsAt: action.startsAt
            };
        } else {
            return { ...currentTodo };
        }
    });
}

function _handleAddTodoAction(currentState: TodosReducerState, action: AddTodoAction): TodosReducerState {
    return  [
        ...currentState,
        createTodoFromAddTodoAction(action)
    ];
}

function _handleDeleteTodoAction(currentState: TodosReducerState, action: DeleteTodoAction): TodosReducerState {
    return currentState.filter((item: Todo) => {
        return item.id !== action.id;
    });
}

function _handleDeleteProjectAction(currentState : TodosReducerState, action : DeleteProjectAction) : TodosReducerState {
    return currentState.filter((item: Todo) => {
        return item.projectId !== action.id;
    });
}

function _handleActivateTodosThatStartToday(currentState : TodosReducerState): TodosReducerState {
    var countActivated = 0;

    var newState = currentState.map((todo : Todo) => {
        var todoIsToStartToday = createMomentFromDate(todo.startsAt).isSame(createToday(), 'day');

        if (todoIsToStartToday && !todo.checked && !todo.active) {
            countActivated++;

            return {
                ...todo,
                active: true
            };
        }

        return todo;
    });

    if (countActivated > 0) {
        NotificationManager.success(`${countActivated} todo's have been activated as they start today`);
    }

    return newState;
}

export function todosReducer(currentState: TodosReducerState = [], action: UpdateTodoAction | Action) : TodosReducerState {
    switch (action.type) {
        case UPDATE_TODO:
            // $ExpectError
            var updateAction: UpdateTodoAction = (action: Action);
            return _handleUpdateTodoAction(currentState, updateAction);

        case ADD_TODO:
            // $ExpectError
            var addAction: AddTodoAction = (action: Action);
            return _handleAddTodoAction(currentState, addAction);

        case DELETE_TODO:
            // $ExpectError
            var deleteAction : DeleteTodoAction = (action: Action);
            return _handleDeleteTodoAction(currentState, deleteAction);

        case DELETE_PROJECT:
            // $ExpectError
            var deleteProjectAction : DeleteProjectAction = (action: Action);
            return _handleDeleteProjectAction(currentState, deleteProjectAction);

        case ACTIVATE_TODOS_THAT_START_TODAY:
            return _handleActivateTodosThatStartToday(currentState);

        default:
            return currentState;
    }
}
