// @flow

import React from 'react';
import PropTypes from 'prop-types';
import FormElementState from "../model/FormElementState";

type Props = {
    element: FormElementState
};

export default class FormTextarea extends React.Component<Props> {

    _onFieldChange(event : SyntheticInputEvent<HTMLInputElement>) : void {
        var value = event.target.value;

        this.props.element.applyChange(value);
    }

    _onFieldBlur() : void {
        this.props.element.flagTouched();
    }

    render() : React$Element<any> {
        var { element, ...restOfProps } = this.props;

        return (
            <textarea
                { ...restOfProps }
                value={ element.data }
                onChange={ this._onFieldChange.bind(this) }
                onBlur={ this._onFieldBlur.bind(this) }
            />
        );
    }
}
