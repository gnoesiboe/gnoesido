// @flow

import type { TodosReducerState } from '../reducers/todosReducer';
import type { Todo } from '../model/type/Todo';

export function sortTodosWithSorting(todos: TodosReducerState, sorting: Array<string>): TodosReducerState {
    var sortedTodos = [],
        notFoundTodos = [];

    var todosThatAreNotInSorting = todos.filter((todo: Todo) => sorting.indexOf(todo.id) === -1);

    sorting.forEach((sortedTodoId: string) => {
        var foundTodo = todos.find((todo: Todo) => todo.id === sortedTodoId);

        if (foundTodo) {
            sortedTodos.push(foundTodo);
        } else {
            notFoundTodos.push(sortedTodoId);
        }
    });

    if (notFoundTodos.length > 0) {
        console.warn('Invalid state! There are todo\'s in the sorting that are not represented in the todo list');
    }

    if (todosThatAreNotInSorting.length > 0) {
        console.warn('Invalid state! There are todo\'s that are not represented in the sorting');

        return [
            ...sortedTodos,
            ...todosThatAreNotInSorting
        ];
    }

    return sortedTodos;
}
