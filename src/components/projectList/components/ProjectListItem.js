// @flow

import React from 'react';
import TodoList from '../../todoList/TodoList';
import type { Project } from '../../../model/type/Project';

type Props = {
    item: Project
};

export default class ProjectListItem extends React.Component<Props> {

    render() : React$Element<any> {
        var { item } = this.props;

        return (
            <div className="col-lg-4 col-md-6 spacer-l">
                <h3><strong>[{ item.abbrevation }]</strong> { item.title }</h3>
                <TodoList
                    currentProject={ item }
                    showOnlyActive={ false }
                />
            </div>
        );
    }
}
