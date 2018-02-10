// @flow

import type { Project } from '../model/type/Project';
import type { Action, AddProjectAction } from '../action/types';
import { ADD_PROJECT } from '../action/types';
import { createProjectFromAddProjectAction } from '../model/factory/projectFactory';

export type ProjectsReducerState = Array<Project>;

function _handleAddProjectAction(currentState: ProjectsReducerState, action: AddProjectAction): ProjectsReducerState {
    return [
        ...currentState,
        createProjectFromAddProjectAction(action)
    ];
}

export function projectsReducer(currentState: ProjectsReducerState = [], action: Action) : ProjectsReducerState {
    switch (action.type) {
        case ADD_PROJECT:
            // $ExpectError
            var addAction : AddProjectAction = (action: Action);
            return _handleAddProjectAction(currentState, addAction);

        default:
            return currentState;
    }
}
