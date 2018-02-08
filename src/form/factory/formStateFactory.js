// @flow

import FormState from '../../lib/forms/model/FormState';
import { createTodoFormConstraintSet } from '../validation/validationConstraintFactory';

import type { OnChangeCallbackType, OnFormValidCallback } from '../../lib/forms/model/FormState';

export function createTodoFormState(onChange: OnChangeCallbackType, onFormValid : OnFormValidCallback, active: boolean = false, projectId: string = '') : FormState {
    var constraintSet = createTodoFormConstraintSet();

    var form = new FormState(onChange, onFormValid, constraintSet);

    form.addElement('title');
    form.addElement('projectId', projectId);
    form.addElement('active', active);

    return form;
}
