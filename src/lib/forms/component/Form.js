// @flow

import * as React from 'react';
import FormState from '../model/FormState';

type Props = {
    children: React.Node,
    formState: FormState
}

class Form extends React.Component<Props> {

    _onSubmit(event : SyntheticInputEvent<HTMLInputElement>) : void {
        event.preventDefault();

        this.props.formState.submit();
    }

    render() : React$Element<any> {
        return (
            <form onSubmit={ this._onSubmit.bind(this) } noValidate={ true }>
                { this.props.children }
            </form>
        );
    }
}

export default Form;
