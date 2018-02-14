// @flow

import { createStartsAtValues } from '../../helper/formValueHelper';
import type { FormSelectAutocompleteOption } from '../../components/shared/FormSelectAutocomplete';

type ConstraintSet = {
    [string] : {
        [string] : any
    }
};

var title = {
    presence: {
        allowEmpty: false,
    }
};

var projectId = {
    presence: {
        allowEmpty: false,
    }
}

var active = {
    presence: {
        allowEmpty: false,
    },
    inclusion: [true, false]
}

var abbrevation = {
    presence: {
        allowEmpty: false,
    }
}

var alllowedStartsAtValues = [
    ...createStartsAtValues().map((data: FormSelectAutocompleteOption) => data.value),
    ''
];

var startsAt = {
    inclusion: alllowedStartsAtValues
}

export function createTodoFormConstraintSet() : ConstraintSet {
    return { title, projectId, active, startsAt };
}

export function createProjectFormConstraintSet() : ConstraintSet {
    return { title, abbrevation };
}
