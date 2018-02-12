// @flow

import React from 'react';
import TodoList from '../../todoList/TodoList';
import type { Project } from '../../../model/type/Project';

type Props = {
    item: Project,
    onDelete: (projectId: string) => void
};

export default class ProjectListItem extends React.Component<Props> {

    _onDeleteClick = (event: SyntheticInputEvent<HTMLInputElement>) => {
        var { item, onDelete } = this.props;

        onDelete(item.id);
    }

    render() : React$Element<any> {
        var { item } = this.props;

        return (
            <div className="project-list-item col-lg-4 col-md-6 spacer-l">
                <button className="btn btn-link pull-right project-list-item-delete-button" onClick={ this._onDeleteClick }>
                    <i className="glyphicon glyphicon-remove" />
                </button>
                <h3 className="project-list-item-title"><strong>[{ item.abbrevation }]</strong> { item.title }</h3>
                <TodoList
                    currentProject={ item }
                    showOnlyActive={ false }
                />
            </div>
        );
    }
}
