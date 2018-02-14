// @flow

import React from 'react';
import type { Project } from '../../../../model/type/Project';
import type { Todo } from '../../../../model/type/Todo';
import FormState from './../../../../lib/forms/model/FormState';
import FormInput from './../../../../lib/forms/component/FormInput';
import FormSelectAutocomplete from '../../../shared/FormSelectAutocomplete';
import FormCheckbox from './../../../../lib/forms/component/FormCheckbox';
import FormGroup from '../../../shared/FormGroup';
import FormErrorList from '../../../shared/formErrorList/FormErrorList';
import Form from './../../../../lib/forms/component/Form';
import { createTodoFormState } from '../../../../form/factory/formStateFactory';
import type { ProjectsReducerState } from '../../../../reducers/projectsReducer';
import {
    convertProjectCollectionToFormSelectAutocompleteOptionList,
    createStartsAtValues
} from '../../../../helper/formValueHelper';

import 'react-select/dist/react-select.css';

export type TodoFormData = {
    title: string,
    projectId: string,
    active: boolean
}

type Props = {
    currentProject: ?Project,
    currentTodo: ?Todo,
    active: boolean,
    projects: ProjectsReducerState,
    onSubmit: (data: TodoFormData) => void,
    onCancel: () => void,
    onNewProject: (title: string) => void
}

type State = {
    formState: FormState
}

export default class TodoForm extends React.Component<Props, State> {

    state : State = {
        formState: createTodoFormState(
            this.props.currentTodo,
            this._onFormChange.bind(this),
            this.props.onSubmit,
            this.props.active,
            this.props.currentProject ? this.props.currentProject.id : ''
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
        var { projects, onCancel, onNewProject } = this.props;

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
                        name="title"
                    />
                    <FormErrorList errors={ formState.getElementState('title').errors } />
                </FormGroup>
                <FormGroup element={ formState.getElementState('projectId') }>
                    <label htmlFor="project">Project</label>
                    <FormSelectAutocomplete
                        elementState={ formState.getElementState('projectId') }
                        id="projectId"
                        placeholder="Select a project"
                        noResultsText="No projects found.."
                        options={ convertProjectCollectionToFormSelectAutocompleteOptionList(projects) }
                        onNewOption={ onNewProject }
                        allowCreate={ true }
                    />
                    <FormErrorList errors={ formState.getElementState('projectId').errors } />
                </FormGroup>
                <FormGroup element={ formState.getElementState('startsAt') }>
                    <label htmlFor="startsAt">Start at</label>
                    <FormSelectAutocomplete
                        elementState={ formState.getElementState('startsAt') }
                        allowCreate={ false }
                        id="startsAt"
                        placeholder="Select a starts day"
                        noResultsText="No starts day found"
                        options={ createStartsAtValues() }
                        onNewOption={ null }
                    />
                    <FormErrorList errors={ formState.getElementState('startsAt').errors } />
                </FormGroup>
                <FormGroup element={ formState.getElementState('active') }>
                    <div className="checkbox">
                        <label>
                            <FormCheckbox
                                element={ formState.getElementState('active') }
                            /> Active
                        </label>
                    </div>
                    <FormErrorList errors={ formState.getElementState('active').errors } />
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
