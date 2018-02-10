// @flow

import React from 'react';
import type { Todo } from '../../../../model/type/Todo';
import type { Project } from '../../../../model/type/Project';
import type { TodoFormData } from '../todoForm/TodoForm';
import TodoForm from '../todoForm/TodoForm';
import createClassName from 'classnames';
import type { ProjectsReducerState } from '../../../../reducers/projectsReducer';

export type OnChangeCallback = (checked: boolean, title: string, projectId: string, active: boolean) => void;
export type OnDeleteCallback = (id: string) => void;

type Props = {
    item: Todo,
    project: Project,
    projects: ProjectsReducerState,
    onChange: OnChangeCallback,
    onDelete: OnDeleteCallback
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

    _onEditFormSubmit(data: TodoFormData) : void {
        var { item, onChange } = this.props;

        this.setState((currentState: State) => {
            return {
                ...currentState,
                showEditForm: false
            };
        }, () => {
            onChange(
                item.checked,
                data.title,
                data.projectId,
                data.active
            )
        })
    }

    _onTitleDoubleClick(event: SyntheticInputEvent<HTMLInputElement>): void {
        this.setState((currentState: State) => {
            return {
                ...currentState,
                showEditForm: true
            }
        });
    }

    _renderInner(): React$Element<any> {
        var { item, project, onDelete } = this.props;
        var { showEditForm } = this.state;

        if (showEditForm) {
            return (
                <div className="todo-list-item-edit-form">
                    <TodoForm
                        onSubmit={ this._onEditFormSubmit.bind(this) }
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
                        <ul className="list-inline pull-right">
                            <li>
                                <span className="todo-list-item-drag-handle">
                                    <i className="glyphicon glyphicon-menu-hamburger" />
                                </span>
                            </li>
                            <li>
                                <button className="btn-link" onClick={ onDelete }>
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
        return (
            <div className="todo-list-item spacer-m">
                { this._renderInner() }
            </div>
        );
    }
}

export default TodoListItem;
