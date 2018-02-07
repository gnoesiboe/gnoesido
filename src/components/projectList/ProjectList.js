import React from 'react';
import type { Project } from '../../model/type/Project';
import type { Todo } from '../../model/type/Todo';
import type { GlobalStateType } from '../../store/globalStateType';
import type { Connector } from 'react-redux';
import { connect } from 'react-redux';
import TodoList from './../todoList/TodoList';

type Props = {
    items: Array<Project>,
    dispatch: (action: Action) => void
};

type OwnProps = {
    items: Array<Project>
};

class ProjectList extends React.Component<Props> {

    _renderItem(item: Project) : React$Element<any> {
        return (
            <div className="col-md-3" key={ item.id }>
                <h3><strong>[{ item.abbrevation }]</strong> { item.title }</h3>
                <TodoList
                    currentProject={ item }
                    filter={ (todo: Todo) => todo.projectId === item.id }
                />
            </div>
        );
    }

    render() : ?React$Element<any> {
        var { items } = this.props;

        if (items.length === 0) {
            return null;
        }

        return (
            <div className="row project-list">
                { items.map((item: Project) => this._renderItem(item)) }
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
