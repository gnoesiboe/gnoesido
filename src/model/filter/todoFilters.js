// @flow

import type { TodosReducerState } from '../../reducers/todosReducer';
import type { Todo } from '../type/Todo';
import { createToday, createMomentFromDate } from '../../helper/dateTimeHelper';

export function filterOutIdsOfAllTodosThatShouldBeActivatedToday(todos : TodosReducerState) : Array<string> {
    var today = createToday();

    return todos
        .filter((todo: Todo) => {
            var startsAtMoment = todo.startsAt ? createMomentFromDate(todo.startsAt) : null;

            if (!startsAtMoment) {
                return false;
            }

            return !todo.active && !todo.checked && startsAtMoment.isSame(today, 'day');
        })
        .map((todo : Todo) => {
            return todo.id;
        });
}
