// @flow

import type { ProjectsReducerState } from '../reducers/projectsReducer';
import type { FormSelectAutocompleteOption } from '../components/shared/FormSelectAutocomplete';
import type { Project } from '../model/type/Project';

export function convertProjectCollectionToFormSelectAutocompleteOptionList(projects: ProjectsReducerState) : Array<FormSelectAutocompleteOption> {
    return projects.map((project: Project) => {
        return {
            value: project.id,
            label: project.title
        };
    })
}
