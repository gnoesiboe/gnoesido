// @flow

import type { Todo } from '../model/type/Todo';
import type { Project } from '../model/type/Project';
import type { Current } from '../reducers/currentReducer';
import type { ProjectsReducerState } from '../reducers/projectsReducer';
import type { TodosReducerState } from '../reducers/todosReducer';

export type GlobalStateType = {
    todos: TodosReducerState,
    projects: ProjectsReducerState,
    current: Current
};
