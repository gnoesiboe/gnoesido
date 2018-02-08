// @flow

import React from 'react';
import FormElementState from '../model/FormElementState';

type Props = {
    element: FormElementState,
    [string]: any
};

export default class FormCheckbox extends React.Component<Props> {

    _onFieldChange(event : SyntheticInputEvent<HTMLInputElement>) : void {
        var isChecked = event.target.checked;

        this.props.element.applyChange(isChecked);
    }

    _onFieldBlur() : void {
        this.props.element.flagTouched();
    }

    render() : React$Element<any> {
        var { element, ...restOfProps } = this.props;

        return (
            <input
                { ...restOfProps }
                checked={ element.data }
                type="checkbox"
                onChange={ this._onFieldChange.bind(this) }
                onBlur={ this._onFieldBlur.bind(this) }
            />
        );
    }
}
