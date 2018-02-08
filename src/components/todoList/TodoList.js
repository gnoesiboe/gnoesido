// @flow

import React from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import TodoListItem from './components/todoListItem/TodoListItem';
import type { Todo } from '../../model/type/Todo';
import type { Project } from '../../model/type/Project';
import type { GlobalStateType } from '../../store/globalStateType';
import { createUpdateTodoAction, createAddTodoAction } from '../../action/actionFactory';
import type { Action } from '../../action/types';
import Modal from '../shared/Modal';
import TodoForm from './components/todoForm/TodoForm';
import type { TodoFormData } from './components/todoForm/TodoForm';

type Props = {
    items: Array<Todo>,
    currentProject: ?Project,
    projects: Array<Project>,
    dispatch: (action: Action) => void,
    filter: (todo: Todo) => void
};

type ReduxProvidedProps = {
    items: Array<Todo>,
    projects: Array<Project>
}

type State = {
    showAddTodoModal: boolean
}

class TodoList extends React.Component<Props, State> {

    state : State = {
        showAddTodoModal: true
    };

    _onTodoChanged(id: string, checked: boolean, title: string): void {
        var { dispatch } = this.props;

        dispatch(
            createUpdateTodoAction(id, checked, title)
        );
    }

    _renderItem(item: Todo): React$Element<any> {
        return (
            <li key={ item.id }>
                <TodoListItem
                    item={ item}
                    project={ this._determineCurrentProjectForItem(item) }
                    onChange={ this._onTodoChanged.bind(this, item.id) }
                />
            </li>
        );
    }

    _determineCurrentProjectForItem(item: Todo) : Project {

        // $ExpectError
        return this.props.projects.find((project) => project.id === item.projectId);
    }

    _onAddModalClose() : void {
        this._hideAddModal();
    }

    _onAddFormSubmit(data: TodoFormData) : void {
        this.props.dispatch(
            createAddTodoAction(data)
        );
    }

    _renderAddTodoModalIfRequired() : ?React$Element<any>{
        if (!this.state.showAddTodoModal) {
            return null;
        }

        return (
            <Modal onClose={ this._onAddModalClose.bind(this) }>
                <h1>Add todo</h1>
                <TodoForm
                    projects={ this.props.projects }
                    project={ this.props.currentProject }
                    onSubmit={ this._onAddFormSubmit.bind(this) }
                />
            </Modal>
        );
    }

    _showAddModal() : void {
        this.setState(currentState => {
            return {
                ...currentState,
                showAddTodoModal: true
            }
        })
    }

    _hideAddModal() : void {
        this.setState(currentState => {
            return {
                ...currentState,
                showAddTodoModal: false
            }
        })
    }

    _onAddClick(event: SyntheticInputEvent<HTMLInputElement>) : void {
        event.preventDefault();

        this._showAddModal();
    }

    render(): ?React$Element<any> {
        var { items, filter } = this.props;

        if (items.length === 0) {
            return null;
        }

        var filteredItems : Array<Todo> = items.filter(filter);

        return (
            <div className="todo-list">
                <button className="pull-right btn-link" onClick={ this._onAddClick.bind(this) }>
                    <i className="glyphicon glyphicon-plus-sign" />
                </button>
                { this._renderAddTodoModalIfRequired() }
                <ul className="list-unstyled">
                    { filteredItems.map((item) => this._renderItem(item)) }
                </ul>
            </div>
        );
    }
}

function _mapGlobalStateToProps(globalState: GlobalStateType) : ReduxProvidedProps {
    return {
        items: globalState.todos,
        projects: globalState.projects
    };
}

var connector: Connector<{}, Props> = connect(_mapGlobalStateToProps);

export default connector(TodoList);
