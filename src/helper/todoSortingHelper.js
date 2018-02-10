// @flow

import type { TodosReducerState } from '../reducers/todosReducer';
import type { Todo } from '../model/type/Todo';

export function sortTodosWithSorting(todos: TodosReducerState, sorting: Array<string>): TodosReducerState {
    var sortedTodos = sorting.map(
        (sortedTodoId: string) => todos.find((todo: Todo) => todo.id === sortedTodoId)
    );

    // $ExpectError - make sure there are no empty values in the TodoList
    return sortedTodos.filter((possibleTodo: any) => !!possibleTodo);
}
