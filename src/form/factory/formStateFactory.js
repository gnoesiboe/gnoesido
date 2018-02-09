// @flow

import FormState from '../../lib/forms/model/FormState';
import type { Todo } from '../../model/type/Todo';
import { createTodoFormConstraintSet } from '../validation/validationConstraintFactory';

import type { OnChangeCallbackType, OnFormValidCallback } from '../../lib/forms/model/FormState';

export function createTodoFormState(currentState: ?Todo, onChange: OnChangeCallbackType, onFormValid : OnFormValidCallback, active: boolean = false, projectId: string = '') : FormState {
    var constraintSet = createTodoFormConstraintSet();

    var form = new FormState(onChange, onFormValid, constraintSet);

    form.addElement('title', currentState ? currentState.title : undefined);
    form.addElement('projectId', currentState ? currentState.projectId : projectId);
    form.addElement('active', currentState ? currentState.active : active);

    return form;
}
