// @flow

import type { AddProjectAction } from '../../action/types';
import type { Project } from '../type/Project';
import uuid from 'uuid';

export function createProjectFromAddProjectAction(action: AddProjectAction) : Project {
    return {
        id: uuid(),
        title: action.title,
        abbrevation: action.abbrevation
    };
}
