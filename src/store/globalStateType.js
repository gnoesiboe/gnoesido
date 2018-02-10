// @flow

import type { Todo } from '../model/type/Todo';
import type { Project } from '../model/type/Project';
import type { Current } from '../reducers/currentReducer';
import type { ProjectsReducerState } from '../reducers/projectsReducer';

export type GlobalStateType = {
    todos: Array<Todo>,
    projects: ProjectsReducerState,
    current: Current
};
