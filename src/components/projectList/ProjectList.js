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
import { createAddProjectAction, createActivatePreviousProjectAction, createActivateNextProjectAction } from '../../action/actionFactory';
import Equalizer from 'react-equalizer';
import keyboardInputListener from 'mousetrap';
import type { Current } from '../../reducers/currentReducer';
import ProjectListItem from './components/ProjectListItem';
import { determineNextList, determinePreviousList } from '../../helper/activeItemHelper';
import type { ProjectsReducerState } from '../../reducers/projectsReducer';

type Props = {
    items: ProjectsReducerState,
    current: Current,
    dispatch: (action: Action) => void
};

type OwnProps = {
    items: ProjectsReducerState
};

type State = {
    showAddForm: boolean
}

class ProjectList extends React.Component<Props, State> {

    state : State = {
        showAddForm: false
    }

    componentDidMount() : void {
        keyboardInputListener.bind('p', this._onPreviousProjectKeyboardBindingPressed);
        keyboardInputListener.bind('n', this._onNextProjectKeyboardBindingPressed);
    }

    componentWillUnmount() : void {
        keyboardInputListener.unbind('p', this._onPreviousProjectKeyboardBindingPressed);
        keyboardInputListener.unbind('n', this._onNextProjectKeyboardBindingPressed);
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

    render() : ?React$Element<any> {
        var { items } = this.props;

        return (
            <div className="project-list">
                { this._renderAddFormModalIfRequired() }
                <div className="row">
                    <Equalizer>
                        { items.map((item: Project) => (
                            <ProjectListItem item={ item} key={ item.id } />
                        )) }
                    </Equalizer>
                </div>
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
        current: globalState.current
    };
}

var connector: Connector<{}, Props> = connect(_mapGlobalStateToProps);

export default connector(ProjectList);
