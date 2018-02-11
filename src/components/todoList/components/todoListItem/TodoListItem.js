// @flow

import React from 'react';
import type { Todo } from '../../../../model/type/Todo';
import type { Project } from '../../../../model/type/Project';
import type { TodoFormData } from '../todoForm/TodoForm';
import TodoForm from '../todoForm/TodoForm';
import createClassName from 'classnames';
import type { ProjectsReducerState } from '../../../../reducers/projectsReducer';
import SortableListItemHandle from '../../../shared/sortableList/SortableHandle';

export type OnChangeCallback = (checked: boolean, title: string, projectId: string, active: boolean) => void;
export type OnDeleteCallback = (id: string) => void;

type Props = {
    item: Todo,
    project: Project,
    projects: ProjectsReducerState,
    onChange: OnChangeCallback,
    onDelete: OnDeleteCallback,
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
            item.active
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
                data.active
            )
        });
    }

    _onActivateClick = (event: SyntheticInputEvent<HTMLInputElement>) : void => {
        var { item, onChange } = this.props;

        onChange(
            item.checked,
            item.title,
            item.projectId,
            true
        );
    }

    _onTitleDoubleClick(event: SyntheticInputEvent<HTMLInputElement>): void {
        this.edit();
    }

    _renderActivateActionIfRequired() : ?React$Element<any> {
        var { item } = this.props;

        if (item.active) {
            return null;
        }

        return (
            <li>
                <button className="btn-link" onClick={ this._onActivateClick }>
                    <i className="glyphicon glyphicon-record" />
                </button>
            </li>
        );
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
                            { this._renderActivateActionIfRequired() }
                            <li>
                                <SortableListItemHandle className="todo-list-item-drag-handle">
                                    <i className="glyphicon glyphicon-menu-hamburger" />
                                </SortableListItemHandle>
                            </li>
                            <li>
                                <button className="btn-link todo-list-item-remove-button" onClick={ onDelete }>
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
                            <strong>{ project.abbrevation }</strong> — { item.title }
                        </div>
                    </div>
                </form>
            );
        }
    }

    render(): React$Element<any> {
        var { active } = this.props;

        var className : string = createClassName('todo-list-item', 'spacer-m', {
            'todo-list-item--active': active
        })

        return (
            <div className={ className }>
                { this._renderInner() }
            </div>
        );
    }
}

export default TodoListItem;
