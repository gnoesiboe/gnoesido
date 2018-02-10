// @flow

import React from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import TodoListItem from './components/todoListItem/TodoListItem';
import type { Todo } from '../../model/type/Todo';
import type { Project } from '../../model/type/Project';
import type { GlobalStateType } from '../../store/globalStateType';
import { createUpdateTodoAction, createAddTodoAction, createDeleteTodoAction } from '../../action/actionFactory';
import type { Action } from '../../action/types';
import Modal from '../shared/Modal';
import TodoForm from './components/todoForm/TodoForm';
import type { TodoFormData } from './components/todoForm/TodoForm';
import createClassName from 'classnames';
import type { Current } from '../../reducers/currentReducer';

type Props = {
    items: Array<Todo>,
    showOnlyActive: boolean,
    currentProject: ?Project,
    projects: Array<Project>,
    current: Current,
    dispatch: (action: Action) => void
};

type ReduxProvidedProps = {
    items: Array<Todo>,
    projects: Array<Project>,
    current: Current
}

type State = {
    showAddTodoModal: boolean
}

class TodoList extends React.Component<Props, State> {

    state : State = {
        showAddTodoModal: false
    };

    _onTodoChanged(id: string, checked: boolean, title: string, projectId: string, active: boolean): void {
        var { dispatch } = this.props;

        dispatch(
            createUpdateTodoAction(id, checked, title, projectId, active)
        );
    }

    _onTodoDelete(id: string): void {
        if (window.confirm('Are you sure?')) {
            this.props.dispatch(
                createDeleteTodoAction(id)
            );
        }
    }

    _renderItem(item: Todo): React$Element<any> {
        return (
            <li key={ item.id }>
                <TodoListItem
                    item={ item}
                    projects={ this.props.projects }
                    project={ this._determineCurrentProjectForItem(item) }
                    onChange={ this._onTodoChanged.bind(this, item.id) }
                    onDelete={ this._onTodoDelete.bind(this, item.id) }
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
        var callback = () => {
            this.props.dispatch(
                createAddTodoAction(data)
            );
        }

        this._hideAddModal(callback);
    }

    _renderAddTodoModalIfRequired() : ?React$Element<any>{
        if (!this.state.showAddTodoModal) {
            return null;
        }

        return (
            <Modal onClose={ this._onAddModalClose.bind(this) }>
                <h1>Add todo</h1>
                <TodoForm
                    active={ this.props.showOnlyActive }
                    currentTodo={ null }
                    currentProject={ this.props.currentProject }
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

    _hideAddModal(callback : ?() => void = null) : void {
        this.setState(currentState => {
            return {
                ...currentState,
                showAddTodoModal: false
            }
        }, () => {
            if (callback) {
                callback();
            }
        })
    }

    _onAddClick(event: SyntheticInputEvent<HTMLInputElement>) : void {
        event.preventDefault();

        this._showAddModal();
    }

    _filterOutTodosThatShouldNotBeInThisSpecificTodoList(items: Array<Todo>) : Array<Todo> {
        var { showOnlyActive, currentProject } = this.props;

        return items.filter((item) => {
            if (showOnlyActive && !item.active) {
                return false;
            }

            if (currentProject && currentProject.id !== item.projectId) {
                return false;
            }

            return true;
        })
    }

    _checkShouldBeActiveList() : boolean {
        var { showOnlyActive, currentProject, current } = this.props;

        if (showOnlyActive) {
            return current.list === 'active';
        } else if (currentProject) {
            return current.list === currentProject.id;
        } else {
            return false;
        }
    }

    render(): ?React$Element<any> {
        var { items } = this.props;

        var filteredItems : Array<Todo> = this._filterOutTodosThatShouldNotBeInThisSpecificTodoList(items);

        var className = createClassName('todo-list', {
            'todo-list--active': this._checkShouldBeActiveList()
        });

        return (
            <div className={ className }>
                { this._renderAddTodoModalIfRequired() }
                <div className="spacer-m">
                    <ul className="list-unstyled">
                        { filteredItems.map((item) => this._renderItem(item)) }
                    </ul>
                </div>
                <div className="text-center spacer-m">
                    <button className="todo-list--add btn btn-default" onClick={ this._onAddClick.bind(this) }>
                        <i className="glyphicon glyphicon-plus" /> Add todo
                    </button>
                </div>
            </div>
        );
    }
}

function _mapGlobalStateToProps(globalState: GlobalStateType) : ReduxProvidedProps {
    return {
        items: globalState.todos,
        projects: globalState.projects,
        current: globalState.current
    };
}

var connector: Connector<{}, Props> = connect(_mapGlobalStateToProps);

export default connector(TodoList);
