// @flow

import React from 'react';
import type { Todo } from '../../../../model/type/Todo';
import type { Project } from '../../../../model/type/Project';
import type { TodoFormData } from '../todoForm/TodoForm';
import TodoForm from '../todoForm/TodoForm';
import createClassName from 'classnames';
import type { ProjectsReducerState } from '../../../../reducers/projectsReducer';
import InlineMarkdown from '../../../shared/InlineMarkdown';
import ReactTooltip from 'react-tooltip';
import TodolistItemMeta from './components/TodolistItemMeta';
import type { OnDeleteCallback, OnToggleActiveStatusCallback } from './components/TodoListItemActions';
import TodoListItemActions from './components/TodoListItemActions';

export type OnChangeCallback = (checked: boolean, title: string, projectId: string, active: boolean, startsAt: string) => void;

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

    _onToggleActiveStateClick : OnToggleActiveStatusCallback = () : void => {
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

    _onEditClick = () : void => {
        this.edit();
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
                        <TodoListItemActions
                            onDelete={ onDelete }
                            onEdit={ this._onEditClick }
                            todo={ item }
                            onToggleActiveStatus={ this._onToggleActiveStateClick }
                        />
                        <input
                            onChange={ this._onCheckboxChange.bind(this) }
                            type="checkbox"
                            checked={ item.checked }
                        />
                        <div onDoubleClick={ this._onTitleDoubleClick.bind(this) } className={ titleClassName }>
                            <strong>{ project.abbrevation }</strong> — <InlineMarkdown source={ item.title } />
                        </div>
                        <TodolistItemMeta todo={ item } />
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
                    <ReactTooltip id="action-edit">
                        <span>Edit item</span>
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
