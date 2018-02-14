// @flow

import React from 'react';
import type { Todo } from '../../../../model/type/Todo';
import type { Project } from '../../../../model/type/Project';
import type { TodoFormData } from '../todoForm/TodoForm';
import TodoForm from '../todoForm/TodoForm';
import createClassName from 'classnames';
import type { ProjectsReducerState } from '../../../../reducers/projectsReducer';
import SortableListItemHandle from '../../../shared/sortableList/SortableHandle';
import InlineMarkdown from '../../../shared/InlineMarkdown';
import ReactTooltip from 'react-tooltip';
import { formatDateRelativeToToday } from '../../../../helper/dateTimeHelper';

export type OnChangeCallback = (checked: boolean, title: string, projectId: string, active: boolean, startsAt: string) => void;
export type OnDeleteCallback = (id: string) => void;

type Props = {
    item: Todo,
    project: Project,
    projects: ProjectsReducerState,
    onChange: OnChangeCallback,
    onDelete: OnDeleteCallback,
    onNewProject: (title: string) => void,
    active: boolean
};

type State = {
    showEditForm: boolean
};

class TodoListItem extends React.Component<Props, State> {

    state: State = {
        showEditForm: false
    }

    _titleInputEl: ?HTMLInputElement

    _onCheckboxChange(event: SyntheticInputEvent<HTMLInputElement>): void {
        var target = event.target;

        var { item } = this.props;

        this.props.onChange(
            target.checked,
            item.title,
            item.projectId,
            item.active,
            item.startsAt
        );
    }

    edit() {
        this._showEditForm();
    }

    _showEditForm() {
        this.setState((currentState: State) => {
            return {
                ...currentState,
                showEditForm: true
            }
        });
    }

    _hideEditForm(callback: ?Function = null) {
        this.setState((currentState: State) => {
            return {
                ...currentState,
                showEditForm: false
            };
        }, () => {
            if (callback) {
                callback();
            }
        });
    }

    _onEditFormSubmit(data: TodoFormData) : void {
        var { item, onChange } = this.props;

        this._hideEditForm(() => {
            onChange(
                item.checked,
                data.title,
                data.projectId,
                data.active,
                data.startsAt
            )
        });
    }

    _onToggleActiveStateClick = (event: SyntheticInputEvent<HTMLInputElement>) : void => {
        var { item, onChange } = this.props;

        onChange(
            item.checked,
            item.title,
            item.projectId,
            !item.active,
            item.startsAt
        );
    }

    _onTitleDoubleClick(event: SyntheticInputEvent<HTMLInputElement>): void {
        this.edit();
    }

    _renderToggleActiveStatusAction() : ?React$Element<any> {
        var { item } = this.props;

        if (item.active) {
            return (
                <li>
                    <button
                        className="btn-link"
                        onClick={ this._onToggleActiveStateClick }
                        data-tip data-for="action-remove-from-active-list"
                    >
                        <i className="glyphicon glyphicon-ban-circle" />
                    </button>
                </li>
            )
        } else {
            return (
                <li>
                    <button
                        className="btn-link"
                        onClick={ this._onToggleActiveStateClick }
                        data-tip data-for="action-add-to-active-list"
                    >
                        <i className="glyphicon glyphicon-record" />
                    </button>
                </li>
            );
        }
    }

    _renderMetaInformationIfRequired() : ?React$Element<any> {
        var { item } = this.props;

        var startsAt = item.startsAt;

        if (!startsAt) {
            return null;
        }

        return (
            <ul className="list-inline todo-list-item-meta-list">
                <li><i className="glyphicon glyphicon-calendar" /> { formatDateRelativeToToday(item.startsAt) }</li>
            </ul>
        )
    }

    _renderInner(): React$Element<any> {
        var { item, project, onDelete } = this.props;
        var { showEditForm } = this.state;

        if (showEditForm) {
            return (
                <div className="todo-list-item-edit-form">
                    <TodoForm
                        onSubmit={ this._onEditFormSubmit.bind(this) }
                        onCancel={ () => this._hideEditForm() }
                        currentProject={ null }
                        active={ item.active }
                        projects={ this.props.projects }
                        currentTodo={ item }
                        onNewProject={ this.props.onNewProject }
                    />
                </div>
            );
        } else {
            var titleClassName : string = createClassName('todo-list-item-title', {
                'todo-list-item-title--checked': item.checked
            });

            return (
                <form className="form" onSubmit={ (event: SyntheticInputEvent<HTMLInputElement>) : void => event.preventDefault() }>
                    <div className="checkbox">
                        <ul className="list-inline pull-right todo-list-item-actions">
                            { this._renderToggleActiveStatusAction() }
                            <li>
                                <SortableListItemHandle
                                    data-tip data-for="action-sort"
                                    className="todo-list-item-drag-handle"
                                >
                                    <i className="glyphicon glyphicon-menu-hamburger" />
                                </SortableListItemHandle>
                            </li>
                            <li>
                                <button
                                    className="btn-link todo-list-item-remove-button"
                                    onClick={ onDelete }
                                    data-tip data-for="action-delete"
                                >
                                    <i className="glyphicon glyphicon-remove" />
                                </button>
                            </li>
                        </ul>
                        <input
                            name="checked"
                            onChange={ this._onCheckboxChange.bind(this) }
                            type="checkbox"
                            checked={ item.checked }
                        />
                        <div onDoubleClick={ this._onTitleDoubleClick.bind(this) } className={ titleClassName }>
                            <strong>{ project.abbrevation }</strong> — <InlineMarkdown source={ item.title } />
                        </div>
                        { this._renderMetaInformationIfRequired() }
                    </div>
                    <ReactTooltip id="action-remove-from-active-list">
                        <span>Remove item from active list</span>
                    </ReactTooltip>
                    <ReactTooltip id="action-add-to-active-list">
                        <span>Add item to active list</span>
                    </ReactTooltip>
                    <ReactTooltip id="action-sort">
                        <span>Drag to sort</span>
                    </ReactTooltip>
                    <ReactTooltip id="action-delete">
                        <span>Remove item</span>
                    </ReactTooltip>
                </form>
            );
        }
    }

    render(): React$Element<any> {
        var { active } = this.props;

        var className : string = createClassName('todo-list-item', {
            'todo-list-item--active': active
        });

        return (
            <div className={ className }>
                { this._renderInner() }
            </div>
        );
    }
}

export default TodoListItem;
