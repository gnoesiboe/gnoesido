// @flow

import React from 'react';
import type { Project } from '../../../../model/type/Project';
import FormState from './../../../../lib/forms/model/FormState';
import FormInput from './../../../../lib/forms/component/FormInput';
import FormSelect from './../../../../lib/forms/component/FormSelect';
import FormCheckbox from './../../../../lib/forms/component/FormCheckbox';
import Form from './../../../../lib/forms/component/Form';
import { createTodoFormState } from '../../../../form/factory/formStateFactory';

type Props = {
    projects: Array<Project>
}

type State = {
    formState: FormState
}

export default class TodoForm extends React.Component<Props, State> {

    state : State = {
        formState: createTodoFormState(
            this._onFormChange.bind(this),
            this._onFormSubmit.bind(this)
        )
    };

    _onFormSubmit(data : { [string] : string }) {
        console.log('_onFormSubmit', data);
    }

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

        return (
            <Form className="form" formState={ formState }>
                <div className="form-group">
                    <label htmlFor="title">Title</label>
                    <FormInput
                        element={ formState.getElementState('title')  }
                        type="text"
                        className="form-control"
                        id="title"
                        name="title"
                    />
                </div>
                <div className="form-group">
                    <label htmlFor="project">Project</label>
                    <FormSelect
                        element={ formState.getElementState('project') }
                        id="project"
                        className="form-control"
                    >
                        <option value="">-- choose a project --</option>

                        { this.props.projects.map(project => (
                            <option
                                key={ project.id }
                                value={ project.id }
                            >
                                { project.title }
                            </option>
                        )) }
                    </FormSelect>
                </div>
                <div className="form-group">
                    <label htmlFor="active">Active</label>
                    <div className="checkbox">
                        <label>
                            <FormCheckbox
                                element={ formState.getElementState('active') }
                            /> Active
                        </label>
                    </div>
                </div>
                <button type="submit" className="btn btn-success">Save</button>
            </Form>
        );
    }
}
