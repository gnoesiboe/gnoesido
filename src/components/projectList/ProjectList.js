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
import { createAddProjectAction, createActivatePreviousAction, createActivateNextAction } from '../../action/actionFactory';
import Equalizer from 'react-equalizer';
import keyboardInputListener from 'mousetrap';
import type { Current } from '../../reducers/currentReducer';
import ProjectListItem from './components/ProjectListItem';
import { determineNextList, determinePreviousList } from '../../helper/activeItemHelper';

type Props = {
    items: Array<Project>,
    current: Current,
    dispatch: (action: Action) => void
};

type OwnProps = {
    items: Array<Project>
};

type State = {
    showAddForm: boolean
}

class ProjectList extends React.Component<Props, State> {

    state : State = {
        showAddForm: false
    }

    componentDidMount() : void {
        this._registerKeyboardListeners();
    }

    componentWillUnmount() : void {
        keyboardInputListener.unbind('left', this._onPreviousKeyboardBindingPressed);
        keyboardInputListener.unbind('right', this._onNextKeyboardBindingPressed);
    }

    _registerKeyboardListeners() : void {
        keyboardInputListener.bind('left', this._onPreviousKeyboardBindingPressed);
        keyboardInputListener.bind('right', this._onNextKeyboardBindingPressed);
    }

    _onPreviousKeyboardBindingPressed = () => {
        var { dispatch, current, items } = this.props;

        dispatch(
            createActivatePreviousAction(
                determinePreviousList(current, items)
            )
        );
    }

    _onNextKeyboardBindingPressed = () => {
        var { dispatch, current, items } = this.props;

        dispatch(
            createActivateNextAction(
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

        if (items.length === 0) {
            return null;
        }

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
