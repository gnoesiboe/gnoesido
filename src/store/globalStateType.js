// @flow

import type { Todo } from '../model/type/Todo';
import type { Project } from '../model/type/Project';

export type GlobalStateType = {
    todos: Array<Todo>,
    projects: Array<Project>
};
