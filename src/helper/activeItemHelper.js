// @flow

import type { Current } from '../reducers/currentReducer';
import type { ProjectsReducerState } from '../reducers/projectsReducer';

export function determineNextList(current: Current, projects: ProjectsReducerState) : string {
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

export function determinePreviousList(current: Current, projects: ProjectsReducerState) : string {
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

export function determineNextTodoIndex(currentIndex : number, todoIds : Array<string>) : number {
    var noOfItems = todoIds.length,
        lastIndex = noOfItems - 1;

    return (currentIndex + 1) > lastIndex ? 0 : currentIndex + 1;
}

export function determinePreviousTodoIndex(currentIndex : number, todoIds : Array<string>) : number {
    var noOfItems = todoIds.length,
        lastIndex = noOfItems - 1;

    return (currentIndex - 1) < 0 ? lastIndex : currentIndex - 1;
}
