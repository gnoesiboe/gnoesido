// @flow

import * as React from 'react';
import createClassName from 'classnames';
import FormElementState from "../../lib/forms/model/FormElementState";

type Props = {
    element: FormElementState,
    children: React.Node
}

function FormGroup(props : Props) : React$Element<any> {
    var { element } = props;

    var hasErrors : boolean = element.hasErrors(),
        touchedAndValid : boolean = element.isTouched() && !hasErrors;

    var formGroupClassName : string = createClassName('form-group', {
        'has-error': hasErrors,
        'has-success': touchedAndValid,
        'has-feedback': element.isTouched()
    });

    var feedbackClassName : string = createClassName('form-control-feedback', 'glyphicon', {
        'glyphicon-ok': touchedAndValid,
        'glyphicon-remove': hasErrors
    });

    return (
        <div className={ formGroupClassName }>
            { props.children }
            <span className={ feedbackClassName } aria-hidden="true" />
        </div>
    );
}

export default FormGroup;
