// @flow

import React from 'react';
import TodoList from '../../todoList/TodoList';
import type { Project } from '../../../model/type/Project';
import ReactTooltip from 'react-tooltip';
import ProjectListItemActions from './ProjectListItemActions';
import type { OnDeleteCallback } from './ProjectListItemActions';

type Props = {
    item: Project,
    onDelete: OnDeleteCallback
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

    render() : React$Element<any> {
        var { item, onDelete } = this.props;

        return (
            <div className="project-list-item spacer-l">
                <ProjectListItemActions
                    onDelete={ onDelete }
                    project={ item }
                />
                <h3 className="project-list-item-title"><strong>[{ item.abbrevation }]</strong> { item.title }</h3>
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
            </div>
        );
    }
}
