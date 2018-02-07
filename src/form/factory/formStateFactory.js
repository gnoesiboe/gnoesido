// @flow

import FormState from '../../lib/forms/model/FormState';

import type { OnChangeCallbackType, OnFormValidCallback } from '../../lib/forms/model/FormState';

export function createTodoFormState(onChange: OnChangeCallbackType, onFormValid : OnFormValidCallback) : FormState {

    // @todo apply constraint set
    var constraintSet = {};

    var form = new FormState(onChange, onFormValid, constraintSet);

    form.addElement('title');
    form.addElement('project');
    form.addElement('active');

    return form;
}
