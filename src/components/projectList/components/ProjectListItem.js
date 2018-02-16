// @flow

import React from 'react';
import TodoList from '../../todoList/TodoList';
import type { Project } from '../../../model/type/Project';
import ReactTooltip from 'react-tooltip';
import ProjectListItemActions from './ProjectListItemActions';
import type { OnDeleteCallback } from './ProjectListItemActions';
import ProjectForm from './ProjectForm';
import type { ProjectFormData } from './ProjectForm';

export type OnChangeCallback = (id: string, title: string, abbrevation: string) => void;

type Props = {
    item: Project,
    onDelete: OnDeleteCallback,
    onChange: OnChangeCallback
};

type State = {
    showEditForm: boolean
}

export default class ProjectListItem extends React.Component<Props, State> {

    state : State = {
        showEditForm: false
    };

    _showEditForm() {
        this.setState((currentState : State) => {
            return {
                ...currentState,
                showEditForm: true
            };
        });
    }

    _hideEditForm() {
        this.setState((currentState : State) => {
            return {
                ...currentState,
                showEditForm: false
            };
        });
    }

    _onEditClick = () : void => {
        this._showEditForm();
    };

    _renderDisplayState() : React$Element<any> {
        var { item, onDelete } = this.props;

        return (
            <div>
                <ProjectListItemActions
                    onDelete={ onDelete }
                    project={ item }
                    onEdit={ this._onEditClick }
                />
                <h3 className="project-list-item--title"><strong>[{ item.abbrevation }]</strong> { item.title }</h3>
                <TodoList
                    currentProject={ item }
                    showOnlyActive={ false }
                />
                <ReactTooltip id="action-delete-project">
                    <span>Remove project</span>
                </ReactTooltip>
                <ReactTooltip id="action-sort-project">
                    <span>Drag to sort projects</span>
                </ReactTooltip>
                <ReactTooltip id="action-edit-project">
                    <span>Edit project</span>
                </ReactTooltip>
            </div>
        );
    }

    _onEditCancel = () : void => {
        this._hideEditForm();
    }

    _onEditSubmit = (data: ProjectFormData) : void => {
        var { item, onChange } = this.props;

        this._hideEditForm();

        onChange(
            item.id,
            data.title,
            data.abbrevation
        );
    }

    _renderEditState() : React$Element<any> {
        var { item } = this.props;

        return (
            <div>
                <ProjectForm
                    project={ item }
                    onSubmit={ this._onEditSubmit }
                    onCancel={ this._onEditCancel }
                />
            </div>
        );
    }

    _renderInner() : React$Element<any> {
        var { showEditForm } = this.state;

        return showEditForm
            ? this._renderEditState()
            : this._renderDisplayState();
    }

    render() : React$Element<any> {
        return (
            <div className="project-list-item spacer-l">
                { this._renderInner() }
            </div>
        );
    }
}
