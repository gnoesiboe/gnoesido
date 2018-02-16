// @flow

import React from 'react';
import Form from '../../../lib/forms/component/Form';
import FormGroup from '../../shared/FormGroup';
import FormInput from '../../../lib/forms/component/FormInput';
import FormState from '../../../lib/forms/model/FormState';
import FormErrorList from '../../shared/formErrorList/FormErrorList';
import { createProjectFormState } from '../../../form/factory/formStateFactory';
import type { Project } from '../../../model/type/Project';

export type ProjectFormData = {
    title: string,
    abbrevation: string
}

type Props = {
    project: ?Project,
    onSubmit: (data: ProjectFormData) => void,
    onCancel: () => void
}

type State = {
    formState: FormState
}

export default class ProjectForm extends React.Component<Props, State> {

    state : State =  {
        formState: createProjectFormState(
            this._onFormChange.bind(this),
            this.props.onSubmit,
            this.props.project
        )
    }

    _onFormChange(newFormState : FormState) {
        this.setState((currentState : State) => {
            return {
                ...currentState,
                formState: newFormState
            }
        });
    }

    render() : React$Element<any> {
        var { onCancel } = this.props;
        var { formState } = this.state;

        return (
            <Form className="form" formState={ formState }>
                <FormGroup element={ formState.getElementState('title') }>
                    <label htmlFor="title">Title</label>
                    <FormInput
                        autoFocus={ true }
                        element={ formState.getElementState('title')  }
                        type="text"
                        className="form-control"
                        id="title"
                    />
                    <FormErrorList errors={ formState.getElementState('title').errors } />
                </FormGroup>
                <FormGroup element={ formState.getElementState('title') }>
                    <label htmlFor="abbrevation">Abbrevation</label>
                    <FormInput
                        element={ formState.getElementState('abbrevation')  }
                        type="text"
                        className="form-control"
                        id="abbrevation"
                    />
                    <FormErrorList errors={ formState.getElementState('abbrevation').errors } />
                </FormGroup>
                <ul className="list-inline">
                    <li>
                        <button type="submit" className="btn btn-success">Save</button>
                    </li>
                    <li>
                        <button className="btn btn-link" onClick={ onCancel }>Cancel</button>
                    </li>
                </ul>
            </Form>
        );
    }
}
