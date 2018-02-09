// @flow

import React from 'react';
import type { Project } from '../../model/type/Project';
import type { GlobalStateType } from '../../store/globalStateType';
import type { Connector } from 'react-redux';
import { connect } from 'react-redux';
import TodoList from './../todoList/TodoList';
import Modal from '../shared/Modal';
import ProjectForm from './components/ProjectForm';
import type { ProjectFormData } from './components/ProjectForm';
import type { Action } from '../../action/types';
import { createAddProjectAction } from '../../action/actionFactory';

type Props = {
    items: Array<Project>,
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

    _renderItem(item: Project) : React$Element<any> {
        return (
            <div className="col-lg-4 col-md-6" key={ item.id }>
                <h3><strong>[{ item.abbrevation }]</strong> { item.title }</h3>
                <TodoList
                    currentProject={ item }
                    showOnlyActive={ false }
                />
            </div>
        );
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
            <div className="row project-list">
                { this._renderAddFormModalIfRequired() }
                { items.map((item: Project) => this._renderItem(item)) }
                <button className="btn btn-default project-list--add-button" onClick={ this._onAddClick.bind(this) }>
                    <i className="glyphicon glyphicon-plus" /> Add project
                </button>
            </div>
        );
    }
}

function _mapGlobalStateToProps(globalState: GlobalStateType) : OwnProps {
    return {
        items: globalState.projects
    }
}

var connector: Connector<{}, Props> = connect(_mapGlobalStateToProps);

export default connector(ProjectList);
