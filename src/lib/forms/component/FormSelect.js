// @flow

import * as React from 'react';
import FormElementState from '../model/FormElementState';

type Props = {
    element: FormElementState,
    children: React.Node,
    [string]: any
};

export default class FormInput extends React.Component<Props> {

    _onFieldChange(event : SyntheticInputEvent<HTMLInputElement>) : void {
        var value = event.target.value;

        this.props.element.applyChange(value);
    }

    _onFieldBlur() : void {
        this.props.element.flagTouched();
    }

    render() : React$Element<any> {
        var { children, element, ...restOfProps } = this.props;

        return (
            <select
                { ...restOfProps }
                value={ element.data }
                onChange={ this._onFieldChange.bind(this) }
                onBlur={ this._onFieldBlur.bind(this) }
            >
                { children }
            </select>
        );
    }
}
