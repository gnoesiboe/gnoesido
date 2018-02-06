// @flow

import type { Project } from '../model/type/Project';
import type { Action } from '../action/types';

export function projectsReducer(currentState: Array<Project> = [], action: Action) : Array<Project> {
    switch (action.type) {
        default:
            return currentState;
    }
}
