// @flow

import FormState from '../../lib/forms/model/FormState';
import type { Todo } from '../../model/type/Todo';
import { createTodoFormConstraintSet, createProjectFormConstraintSet } from '../validation/validationConstraintFactory';

import type { OnChangeCallbackType, OnFormValidCallback } from '../../lib/forms/model/FormState';
import type { Project } from '../../model/type/Project';

export function createTodoFormState(currentState: ?Todo, onChange: OnChangeCallbackType, onFormValid : OnFormValidCallback, active: boolean = false, projectId: string = '') : FormState {
    var constraintSet = createTodoFormConstraintSet();

    var formState = new FormState(onChange, onFormValid, constraintSet);

    formState.addElement('title', currentState ? currentState.title : undefined);
    formState.addElement('projectId', currentState ? currentState.projectId : projectId);
    formState.addElement('startsAt', currentState && currentState.startsAt ? currentState.startsAt : undefined);
    formState.addElement('active', currentState ? currentState.active : active);

    return formState;
}

export function createProjectFormState(onChange : OnChangeCallbackType, onFormValid : OnFormValidCallback, project: ?Project) : FormState {

    // @todo setup constraint set
    var constraintSet = createProjectFormConstraintSet();

    var formState = new FormState(onChange, onFormValid, constraintSet);

    formState.addElement('title', project ? project.title : '');
    formState.addElement('abbrevation', project ? project.abbrevation : '');

    return formState;
}
