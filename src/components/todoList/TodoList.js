// @flow

import React from 'react';
import { connect } from 'react-redux';
import type { Connector } from 'react-redux';
import TodoListItem from './components/todoListItem/TodoListItem';
import type { Todo } from '../../model/type/Todo';
import type { Project } from '../../model/type/Project';
import type { GlobalStateType } from '../../store/globalStateType';
import {
    createUpdateTodoAction,
    createAddTodoAction,
    createDeleteTodoAction,
    createMoveTodoAction,
    createActivateNextTodoAction,
    createActivatePreviousTodoAction,
    createAddProjectAction
} from '../../action/actionFactory';
import type { Action } from '../../action/types';
import Modal from '../shared/Modal';
import TodoForm from './components/todoForm/TodoForm';
import type { TodoFormData } from './components/todoForm/TodoForm';
import createClassName from 'classnames';
import type { Current } from '../../reducers/currentReducer';
import keyboardInputListener from 'mousetrap';
import SortableListItem from '../shared/sortableList/components/SortableListItem';
import SortableList from '../shared/sortableList/SortableList';
import type { OnSortEndData } from '../shared/sortableList/SortableList';
import type { ProjectsReducerState } from '../../reducers/projectsReducer';
import type { TodosReducerState } from '../../reducers/todosReducer';
import type { ActiveSortedTodosReducerState } from '../../reducers/activeSortedTodosReducer';
import { sortTodosWithSorting } from '../../helper/todoSortingHelper';
import { determineNextTodoIndex, determinePreviousTodoIndex } from '../../helper/activeItemHelper';

type Props = {
    items: TodosReducerState,
    showOnlyActive: boolean,
    currentProject: ?Project,
    projects: ProjectsReducerState,
    current: Current,
    activeSortedTodos: ActiveSortedTodosReducerState,
    dispatch: (action: Action) => void
};

type ReduxProvidedProps = {
    items: TodosReducerState,
    projects: ProjectsReducerState,
    current: Current,
    activeSortedTodos: ActiveSortedTodosReducerState
};

type State = {
    showAddTodoModal: boolean
}

class TodoList extends React.Component<Props, State> {

    _refs : { [string]: any } = {}

    state : State = {
        showAddTodoModal: false
    };

    _onTodoChanged(item: Todo, checked: boolean, title: string, projectId: string, active: boolean, startsAt: string): void {
        var { dispatch } = this.props;

        dispatch(
            createUpdateTodoAction(
                item.id,
                checked,
                title,
                item.projectId,
                projectId,
                item.active,
                active,
                startsAt
            )
        );
    }

    componentDidMount() {
        if (this._checkIsActiveList()) {
            this._registerAddKeyboardListener();
        }
    }

    _registerAddKeyboardListener() {
        keyboardInputListener.bind('a', this._onAddTodoKeyboardShortcutPressed)
        keyboardInputListener.bind('j', this._onNextTodoIndexShortcutPressed);
        keyboardInputListener.bind('k', this._onPreviousTodoIndexShortcutPressed);
        keyboardInputListener.bind('e', this._onEditCurrentTodoShortcutPressed);
        keyboardInputListener.bind('space', this._onToggleCheckedKeyboardShortcutPressed);
    }

    componentWillUnmount() {
        this._unregisterAddKeyboardListener();
    }

    _unregisterAddKeyboardListener() {
        keyboardInputListener.unbind('a', this._onAddTodoKeyboardShortcutPressed);
        keyboardInputListener.unbind('j', this._onNextTodoIndexShortcutPressed);
        keyboardInputListener.unbind('k', this._onPreviousTodoIndexShortcutPressed);
        keyboardInputListener.unbind('e', this._onEditCurrentTodoShortcutPressed);
        keyboardInputListener.unbind('space', this._onToggleCheckedKeyboardShortcutPressed);
    }

    componentDidUpdate(prevProps: Props, prevState: State) : void {
        if (this._checkIsActiveList()) {
            this._registerAddKeyboardListener();
        } else {
            this._unregisterAddKeyboardListener();
        }
    }

    _onToggleCheckedKeyboardShortcutPressed = (event: SyntheticInputEvent<HTMLInputElement>) => {
        var { current, currentProject, activeSortedTodos, items, dispatch } = this.props;

        var todoIds = currentProject ? currentProject.sortedTodos : activeSortedTodos,
            todoIdToToggleCheckedStatusFor = todoIds[current.todoIndex];

        var todo : ?Todo = items.find((item: Todo) => item.id === todoIdToToggleCheckedStatusFor);

        if (!todo) {
            return;
        }

        dispatch(
            createUpdateTodoAction(
                todo.id,
                !todo.checked,
                todo.title,
                todo.projectId,
                todo.projectId,
                todo.active,
                todo.active,
                todo.startsAt
            )
        )
    }

    _onEditCurrentTodoShortcutPressed = (event: SyntheticInputEvent<HTMLInputElement>) => {

        // prevent typing 'e' in edit todo form
        event.preventDefault();

        var { currentProject, activeSortedTodos, current } = this.props;

        var todoIds = currentProject ? currentProject.sortedTodos : activeSortedTodos,
            todoIdToEdit = todoIds[current.todoIndex];

        this._refs[todoIdToEdit].edit();
    }

    _onPreviousTodoIndexShortcutPressed = (event: SyntheticInputEvent<HTMLInputElement>) => {
        var { dispatch, current, currentProject, activeSortedTodos } = this.props;

        var todoIds = currentProject ? currentProject.sortedTodos : activeSortedTodos;

        dispatch(
            createActivatePreviousTodoAction(
                determinePreviousTodoIndex(current.todoIndex, todoIds)
            )
        );
    }

    _onNextTodoIndexShortcutPressed = (event: SyntheticInputEvent<HTMLInputElement>) => {
        var { dispatch, current, currentProject, activeSortedTodos } = this.props;

        var todoIds = currentProject ? currentProject.sortedTodos : activeSortedTodos;

        dispatch(
            createActivateNextTodoAction(
                determineNextTodoIndex(current.todoIndex, todoIds)
            )
        );
    }

    _onAddTodoKeyboardShortcutPressed = (event: SyntheticInputEvent<HTMLInputElement>) => {

        // prevent typing in autofocussed first field of add todo form
        event.preventDefault();

        this.setState((currentState: State) : State => {
            return {
                ...currentState,
                showAddTodoModal: true
            };
        })
    }

    _onTodoDelete(id: string): void {
        if (window.confirm('Are you sure?')) {
            this.props.dispatch(
                createDeleteTodoAction(id)
            );
        }
    }

    _renderItem(item: Todo, index: number): React$Element<any> {
        var { current } = this.props;

        var isActive = this._checkIsActiveList() && index === current.todoIndex;

        return (
            <SortableListItem key={ item.id } index={ index } className="todo-list-li">
                <TodoListItem
                    active={ isActive }
                    ref={ (el) => this._refs[item.id] = el }
                    item={ item }
                    projects={ this.props.projects }
                    project={ this._determineCurrentProjectForItem(item) }
                    onChange={ this._onTodoChanged.bind(this, item) }
                    onDelete={ this._onTodoDelete.bind(this, item.id) }
                    onNewProject={ this._onNewProject }
                />
            </SortableListItem>
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

    _onNewProject = (title: string) => {
        var { dispatch } = this.props;

        dispatch(
            createAddProjectAction({
                title,
                abbrevation: title.substring(0, 2).toUpperCase()
            })
        )
    }

    _renderAddTodoModalIfRequired() : ?React$Element<any>{
        if (!this.state.showAddTodoModal) {
            return null;
        }

        var { showOnlyActive, currentProject, projects } = this.props;

        return (
            <Modal onClose={ this._onAddModalClose.bind(this) }>
                <h1>Add todo</h1>
                <TodoForm
                    active={ showOnlyActive }
                    currentTodo={ null }
                    currentProject={ currentProject }
                    projects={ projects }
                    project={ currentProject }
                    onSubmit={ this._onAddFormSubmit.bind(this) }
                    onCancel={ () => this._hideAddModal() }
                    onNewProject={ this._onNewProject }
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

    _filterOutTodosThatShouldNotBeInThisSpecificTodoList(items: TodosReducerState) : TodosReducerState {
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

    _checkIsActiveList() : boolean {
        var { showOnlyActive, currentProject, current } = this.props;

        if (showOnlyActive) {
            return current.list === 'active';
        } else if (currentProject) {
            return current.list === currentProject.id;
        } else {
            return false;
        }
    }

    _onItemSortEnd = (data: OnSortEndData) => {
        var { currentProject, showOnlyActive, dispatch } = this.props;

        dispatch(
            createMoveTodoAction(
                data.oldIndex,
                data.newIndex,
                currentProject ? currentProject.id : null,
                showOnlyActive
            )
        );
    }

    _orderItems(filteredItems: TodosReducerState) : TodosReducerState {
        var { currentProject, showOnlyActive, activeSortedTodos } = this.props;

        if (showOnlyActive) {
            return sortTodosWithSorting(filteredItems, activeSortedTodos);
        } else if (currentProject) {
            return sortTodosWithSorting(filteredItems, currentProject.sortedTodos);
        } else {
            throw new Error('it should not be possible to get to this point');
        }
    }

    render(): React$Element<any> {
        var { items } = this.props;

        var filteredItems : TodosReducerState = this._filterOutTodosThatShouldNotBeInThisSpecificTodoList(items),
            filteredAndOrderedItems : TodosReducerState = this._orderItems(filteredItems);

        var className = createClassName('todo-list', {
            'todo-list--active': this._checkIsActiveList()
        });

        return (
            <div className={ className }>
                { this._renderAddTodoModalIfRequired() }
                <div className="spacer-m">
                    <SortableList
                        className="list-unstyled"
                        onSortEnd={ this._onItemSortEnd }
                        useDragHandle={ true }
                        lockToContainerEdges={ true }
                        helperClass="todo-list-moving-item"
                    >
                        { filteredAndOrderedItems.map((item, index) => {
                            return this._renderItem(item, index);
                        }) }
                    </SortableList>
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
        current: globalState.current,
        activeSortedTodos: globalState.activeSortedTodos
    };
}

var connector: Connector<{}, Props> = connect(_mapGlobalStateToProps);

export default connector(TodoList);
