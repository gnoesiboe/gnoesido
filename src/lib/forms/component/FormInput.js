// @flow

import React from 'react';
import FormElementState from '../model/FormElementState';

type Props = {
    type: string,
    element: FormElementState
};

export default class FormInput extends React.Component<Props> {

    static defaultProps = {
        type: 'text'
    }

    _onFieldChange(event : SyntheticInputEvent<HTMLInputElement>) : void {
        var value = event.target.value;

        this.props.element.applyChange(value);
    }

    _onFieldBlur() : void {
        this.props.element.flagTouched();
    }

    render() : React$Element<any> {
        var { type, element, ...restOfProps } = this.props;

        return (
            <input
                { ...restOfProps }
                value={ element.data }
                type={ type }
                onChange={ this._onFieldChange.bind(this) }
                onBlur={ this._onFieldBlur.bind(this) }
            />
        );
    }
}
