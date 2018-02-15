// @flow

import React from 'react';
import type { Project } from '../../model/type/Project';
import type { GlobalStateType } from '../../store/globalStateType';
import type { Connector } from 'react-redux';
import { connect } from 'react-redux';
import Modal from '../shared/Modal';
import ProjectForm from './components/ProjectForm';
import type { ProjectFormData } from './components/ProjectForm';
import type { Action } from '../../action/types';
import {
    createAddProjectAction,
    createActivatePreviousProjectAction,
    createActivateNextProjectAction,
    createDeleteProjectAction,
    createMoveProjectAction,
    createActivateTodosThatStartTodayAction
} from '../../action/actionFactory';
import keyboardInputListener from 'mousetrap';
import type { Current } from '../../reducers/currentReducer';
import ProjectListItem from './components/ProjectListItem';
import { determineNextList, determinePreviousList } from '../../helper/activeItemHelper';
import type { ProjectsReducerState } from '../../reducers/projectsReducer';
import SortableContainer from '../shared/sortableList/SortableContainer';
import SortableContainerElement from '../shared/sortableList/components/SortableContainerElement';
import type { OnSortEndData } from '../shared/sortableList/SortableList';
import type { MoveProjectAction } from '../../action/types';
import * as windowVisibilityHelper from './../../helper/windowVisibilityHelper';
import type { TodosReducerState } from '../../reducers/todosReducer';
import { filterOutIdsOfAllTodosThatShouldBeActivatedToday } from '../../model/filter/todoFilters';
import { NotificationManager } from 'react-notifications';

type Props = {
    items: ProjectsReducerState,
    todos: TodosReducerState,
    current: Current,
    dispatch: (action: Action | MoveProjectAction) => void
};

type OwnProps = {
    items: ProjectsReducerState,
    todos: TodosReducerState
};

type State = {
    showAddForm: boolean
}

class ProjectList extends React.Component<Props, State> {

    state : State = {
        showAddForm: false
    }

    _windowVisibilityChangeListenerId : ?string = null

    componentDidMount() : void {
        keyboardInputListener.bind('p', this._onPreviousProjectKeyboardBindingPressed);
        keyboardInputListener.bind('n', this._onNextProjectKeyboardBindingPressed);

        this._windowVisibilityChangeListenerId = windowVisibilityHelper.registerListener(this._onWindowVisibilityChange);
        windowVisibilityHelper.startListening();
    }

    _onWindowVisibilityChange = () : void => {
        var { dispatch, todos } = this.props;

        var ids = filterOutIdsOfAllTodosThatShouldBeActivatedToday(todos);

        if (ids.length > 0) {
            dispatch(
                createActivateTodosThatStartTodayAction(ids)
            );

            NotificationManager.success(`${ids.length} todo(s) were activated because they start today`);
        }
    }

    componentWillUnmount() : void {
        keyboardInputListener.unbind('p', this._onPreviousProjectKeyboardBindingPressed);
        keyboardInputListener.unbind('n', this._onNextProjectKeyboardBindingPressed);

        if (this._windowVisibilityChangeListenerId) {
            windowVisibilityHelper.unregisterListener(this._windowVisibilityChangeListenerId);
        }

        windowVisibilityHelper.stopListening();
    }

    _onPreviousProjectKeyboardBindingPressed = () => {
        var { dispatch, current, items } = this.props;

        dispatch(
            createActivatePreviousProjectAction(
                determinePreviousList(current, items)
            )
        );
    }

    _onNextProjectKeyboardBindingPressed = () => {
        var { dispatch, current, items } = this.props;

        dispatch(
            createActivateNextProjectAction(
                determineNextList(current, items)
            )
        )
    }

    _onAddClick(event: SyntheticInputEvent<HTMLInputElement>) : void {
        this._showAddFormModal();
    }

    _showAddFormModal() {
        this.setState((currentState: State) => {
            return {
                ...currentState,
                showAddForm: true
            };
        });
    }

    _hideAddFormModal(callback: ?() => void = null) {
        this.setState((currentState: State) => {
            return {
                ...currentState,
                showAddForm: false
            };
        }, () => {
            if (callback) {
                callback();
            }
        });
    }

    _onAddModalClose() {
        this._hideAddFormModal();
    }

    _onAddFormSubmit(data : ProjectFormData) : void {
        var callback = () => {
            this.props.dispatch(
                createAddProjectAction(data)
            );
        };

        this._hideAddFormModal(callback);
    }

    _renderAddFormModalIfRequired() : ?React$Element<any> {
        if (!this.state.showAddForm) {
            return null;
        }

        return (
            <Modal onClose={ this._onAddModalClose.bind(this) }>
                <h1>Add project</h1>
                <ProjectForm
                    onSubmit={ this._onAddFormSubmit.bind(this) }
                />
            </Modal>
        );
    }

    _onProjectDelete = (projectId: string) => {
        if (!window.confirm('Are you sure?')) {
            return;
        }

        var { dispatch } = this.props;

        dispatch(
            createDeleteProjectAction(projectId)
        );
    }

    _onItemSortEnd = (data: OnSortEndData) => {
        var { dispatch } = this.props;

        dispatch(
            createMoveProjectAction(data.oldIndex, data.newIndex)
        );
    }

    _renderListItem(item: Project, index: number) : React$Element<any> {
        return (
            <SortableContainerElement
                key={ item.id }
                index={ index }
                className="col-lg-4 col-md-6"
            >
                <ProjectListItem
                    item={ item}

                    onDelete={ this._onProjectDelete }
                />
            </SortableContainerElement>
        );
    }

    render() : ?React$Element<any> {
        var { items } = this.props;

        return (
            <div className="project-list">
                { this._renderAddFormModalIfRequired() }
                <SortableContainer
                    className="row"
                    onSortEnd={ this._onItemSortEnd }
                    useDragHandle={ true }
                    helperClass="project-list-moving-item"
                    lockToContainerEdges={ true }
                    axis="xy"
                >
                    { items.map((item: Project, index) => this._renderListItem(item, index)) }
                </SortableContainer>
                <div className="row">
                    <button className="btn btn-default btn-lg project-list--add-button" onClick={ this._onAddClick.bind(this) }>
                        <i className="glyphicon glyphicon-plus" /> Add project
                    </button>
                </div>
            </div>
        );
    }
}

function _mapGlobalStateToProps(globalState: GlobalStateType) : OwnProps {
    return {
        items: globalState.projects,
        current: globalState.current,
        todos: globalState.todos
    };
}

var connector: Connector<{}, Props> = connect(_mapGlobalStateToProps);

export default connector(ProjectList);
