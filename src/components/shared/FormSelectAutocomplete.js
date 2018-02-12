// @flow

import React from 'react';
import { Creatable } from 'react-select';
import FormElementState from '../../lib/forms/model/FormElementState';

export type FormSelectAutocompleteOption = {
    value: string | boolean,
    label: string
};

export type NewOptionCallBack = (label : string) => void;

type Props = {
    elementState: FormElementState,
    [string]: any,
    options: Array<FormSelectAutocompleteOption>,
    onNewOption: NewOptionCallBack
};

export default class FormSelectAutocomplete extends React.Component<Props> {

    _onChange(selectedOption: ?FormSelectAutocompleteOption) : void {
        this.props.elementState.applyChange(selectedOption ? selectedOption.value : '');
    }

    _onBlur() : void {
        this.props.elementState.flagTouched();
    }

    _onNewOptionClick(option : { value: string }) : void {
        this.props.onNewOption(option.value);
    }

    render() : React$Element<any> {
        var { elementState, options, ...restOfProps } = this.props;

        return (
            <Creatable
                value={ elementState.data }
                onChange={ this._onChange.bind(this) }
                onBlur={ this._onBlur.bind(this) }
                onNewOptionClick={ this._onNewOptionClick.bind(this) }
                options={ options }
                { ...restOfProps }
            />
        );
    }
}
