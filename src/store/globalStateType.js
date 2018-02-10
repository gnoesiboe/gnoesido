// @flow

import type { Todo } from '../model/type/Todo';
import type { Project } from '../model/type/Project';
import type { Current } from '../reducers/currentReducer';

export type GlobalStateType = {
    todos: Array<Todo>,
    projects: Array<Project>,
    current: Current
};
