// @flow

import type { ProjectsReducerState } from '../reducers/projectsReducer';
import type { FormSelectAutocompleteOption } from '../components/shared/FormSelectAutocomplete';
import type { Project } from '../model/type/Project';
import {
    formatTodayDate,
    formatTomorrowDate,
    formatNextWeekDate,
    formatNextDayDate
} from './dateTimeHelper';

export function convertProjectCollectionToFormSelectAutocompleteOptionList(projects: ProjectsReducerState) : Array<FormSelectAutocompleteOption> {
    return projects.map((project: Project) => {
        return {
            value: project.id,
            label: project.title
        };
    })
}

export function convertStartsAtCollectionToFormSelectAutocompleteOptionList(startsAtValues : { [string] : string }) : Array<FormSelectAutocompleteOption> {
    return Object.keys(startsAtValues).map((key : string) => {
        return {
            value: key,
            label: startsAtValues[key]
        };
    })
}

export function createStartsAtValues() : Array<FormSelectAutocompleteOption> {
    return [
        {
            value: formatTodayDate(),
            label: 'today'
        },
        {
            value: formatTomorrowDate(),
            label: 'tomorrow'
        },
        {
            value: formatNextWeekDate(),
            label: 'next week'
        },
        {
            value: formatNextDayDate(1),
            label: 'monday'
        },
        {
            value: formatNextDayDate(2),
            label: 'tuesday'
        },
        {
            value: formatNextDayDate(3),
            label: 'wednesday'
        },
        {
            value: formatNextDayDate(4),
            label: 'thursday'
        },
        {
            value: formatNextDayDate(5),
            label: 'friday'
        },
        {
            value: formatNextDayDate(6),
            label: 'saturday'
        },
        {
            value: formatNextDayDate(7),
            label: 'sunday'
        },
    ];
}
