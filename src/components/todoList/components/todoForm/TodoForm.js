// @flow

import React from 'react';
import type { Project } from '../../../../model/type/Project';
import FormState from './../../../../lib/forms/model/FormState';
import FormInput from './../../../../lib/forms/component/FormInput';
import FormSelect from './../../../../lib/forms/component/FormSelect';
import FormCheckbox from './../../../../lib/forms/component/FormCheckbox';
import FormGroup from '../../../shared/FormGroup';
import FormErrorList from '../../../shared/formErrorList/FormErrorList';
import Form from './../../../../lib/forms/component/Form';
import { createTodoFormState } from '../../../../form/factory/formStateFactory';

export type TodoFormData = {
    title: string,
    projectId: string,
    active: boolean
}

type Props = {
    projects: Array<Project>,
    onSubmit: (data: TodoFormData) => void
}

type State = {
    formState: FormState
}

export default class TodoForm extends React.Component<Props, State> {

    state : State = {
        formState: createTodoFormState(
            this._onFormChange.bind(this),
            this.props.onSubmit
        )
    };

    _onFormChange(newFormState : FormState) {
        this.setState((currentState: State) => {
            return {
                ...currentState,
                formState: newFormState
            };
        })
    }

    render() : React$Element<any> {
        var { formState } = this.state;
        var { projects } = this.props;

        return (
            <Form className="form" formState={ formState }>
                <FormGroup element={ formState.getElementState('title') }>
                    <label htmlFor="title">Title</label>
                    <FormInput
                        element={ formState.getElementState('title')  }
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                    />
                    <FormErrorList errors={ formState.getElementState('title').errors } />
                </FormGroup>
                <FormGroup element={ formState.getElementState('projectId') }>
                    <label htmlFor="project">Project</label>
                    <FormSelect
                        element={ formState.getElementState('projectId') }
                        id="projectId"
                        className="form-control"
                    >
                        <option value="">-- choose a project --</option>

                        { projects.map(project => (
                            <option key={ project.id } value={ project.id }>
                                { project.title }
                            </option>
                        )) }
                    </FormSelect>
                    <FormErrorList errors={ formState.getElementState('projectId').errors } />
                </FormGroup>
                <FormGroup element={ formState.getElementState('active') }>
                    <label htmlFor="active">Active</label>
                    <div className="checkbox">
                        <label>
                            <FormCheckbox
                                element={ formState.getElementState('active') }
                            /> Active
                        </label>
                    </div>
                    <FormErrorList errors={ formState.getElementState('active').errors } />
                </FormGroup>
                <button type="submit" className="btn btn-success">Save</button>
            </Form>
        );
    }
}
