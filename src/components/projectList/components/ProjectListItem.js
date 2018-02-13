// @flow

import React from 'react';
import TodoList from '../../todoList/TodoList';
import type { Project } from '../../../model/type/Project';
import ReactTooltip from 'react-tooltip';
import SortableListItemHandle from '../../shared/sortableList/SortableHandle';

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
                <ul className="list-inline pull-right project-list-item-actions">
                    <li>
                        <SortableListItemHandle
                            data-tip data-for="action-sort-project"
                            className="todo-list-item-drag-handle"
                        >
                            <i className="glyphicon glyphicon-menu-hamburger" />
                        </SortableListItemHandle>
                    </li>
                    <li>
                        <button
                            className="btn btn-link project-list-item-delete-button"
                            onClick={ this._onDeleteClick }
                            data-tip data-for="action-delete-project"
                        >
                            <i className="glyphicon glyphicon-remove" />
                        </button>
                    </li>
                </ul>
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
