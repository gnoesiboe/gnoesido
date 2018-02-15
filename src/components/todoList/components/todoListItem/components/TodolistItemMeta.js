// @flow

import React from 'react';
import { formatDateRelativeToToday } from '../../../../../helper/dateTimeHelper';
import type { Todo } from '../../../../../model/type/Todo';


type Props = {
    todo: Todo
}

export default class TodolistItemMeta extends React.Component<Props> {

    render() : ?React$Element<any> {
        var { todo } = this.props;

        var startsAt = todo.startsAt;

        if (!startsAt) {
            return null;
        }

        return (
            <ul className="list-inline todo-list-item-meta-list">
                <li><i className="glyphicon glyphicon-calendar" /> { formatDateRelativeToToday(startsAt) }</li>
            </ul>
        )
    }
}
