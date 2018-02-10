// @flow

import type { Current } from '../reducers/currentReducer';
import type { Project } from '../model/type/Project';

export function determineNextList(current: Current, projects: Array<Project>) : string {
    if (projects.length === 0) {
        return 'active';
    }

    if (current.list === 'active') {
        return projects[0].id;
    }

    var indexOfCurrentProject = projects.findIndex((project) => {
        return project.id === current.list;
    });

    if (typeof projects[indexOfCurrentProject + 1] !== 'undefined') {
        return projects[indexOfCurrentProject + 1].id;
    }

    return 'active';
}

export function determinePreviousList(current: Current, projects: Array<Project>) : string {
    if (projects.length === 0) {
        return 'active';
    }

    var noOfProjects = projects.length;

    if (current.list === 'active') {
        return projects[noOfProjects - 1].id;
    }

    var indexOfCurrentProject = projects.findIndex((project) => {
        return project.id === current.list;
    });

    if (typeof projects[indexOfCurrentProject - 1] !== 'undefined') {
        return projects[indexOfCurrentProject - 1].id;
    }

    return 'active';
}
