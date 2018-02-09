// @flow

import type { Project } from '../model/type/Project';
import type { Action, AddProjectAction } from '../action/types';
import { ADD_PROJECT } from '../action/types';
import { createProjectFromAddProjectAction } from '../model/factory/projectFactory';

function _handleAddProjectAction(currentState: Array<Project>, action: AddProjectAction): Array<Project> {
    return [
        ...currentState,
        createProjectFromAddProjectAction(action)
    ];
}

export function projectsReducer(currentState: Array<Project> = [], action: Action) : Array<Project> {
    switch (action.type) {
        case ADD_PROJECT:
            // $ExpectError
            var addAction : AddProjectAction = (action: Action);
            return _handleAddProjectAction(currentState, addAction);

        default:
            return currentState;
    }
}
