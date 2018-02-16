// @flow

import React from 'react';
import { formatDateRelativeToToday } from '../../../../../helper/dateTimeHelper';
import type { Todo } from '../../../../../model/type/Todo';
import { createToday, createMomentFromDate } from '../../../../../helper/dateTimeHelper';
import createClassName from 'classnames';


type Props = {
    todo: Todo
}

export default class TodolistItemMeta extends React.Component<Props> {

    _renderStartsAt() : ?React$Element<any> {
        var { todo } = this.props;

        var startsAt = createMomentFromDate(todo.startsAt);

        if (!startsAt) {
            return null;
        }

        var today = createToday();

        var className = createClassName('todo-list-item-meta-start', {
            'todo-list-item-meta-start--late': startsAt.isBefore(today, 'day')
        });

        return (
            <li className={ className }>
                <i className="glyphicon glyphicon-calendar" /> { formatDateRelativeToToday(startsAt) }
            </li>
        )
    }

    render() : ?React$Element<any> {
        return (
            <ul className="list-inline todo-list-item-meta-list">
                { this._renderStartsAt() }
            </ul>
        )
    }
}
