// @flow

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

export function createTodoFormConstraintSet() : ConstraintSet {
    return { title, projectId, active };
}
