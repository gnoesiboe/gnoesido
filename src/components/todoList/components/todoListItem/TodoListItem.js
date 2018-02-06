// @flow

import React from 'react';
import type { Todo } from '../../../../model/type/Todo';

export type OnChangeCallback = (checked: boolean, title: string) => void;

type Props = {
    item: Todo,
    onChange: OnChangeCallback
};

type State = {
    editTitle: boolean
};

type ChangeSet = {
    title: string,
    checked: boolean
};

class TodoListItem extends React.Component<Props, State> {

    state: State = {
        editTitle: false
    }

    _titleInputEl: ?HTMLInputElement

    _onInputChange(event: SyntheticInputEvent<HTMLInputElement>): void {
        var target = event.target,
            newValue = target.type === 'checkbox' ? target.checked : target.value,
            name = target.name;

        var { item } = this.props;

        var normalizedValues : ChangeSet = {
            checked: item.checked,
            title: item.title,
            [name]: newValue
        };

        this.props.onChange(
            normalizedValues.checked,
            normalizedValues.title
        );
    }

    _onTitleEditClick(event: SyntheticInputEvent<HTMLInputElement>): void {
        event.preventDefault();
        event.stopPropagation();

        this.setState((currentState: State) => {
            return {
                ...currentState,
                editTitle: true
            }
        });
    }

    _onTitleInputBlur(event: SyntheticInputEvent<HTMLInputElement>): void {
        this.setState((currentState: State) => {
            return {
                ...currentState,
                editTitle: false
            }
        });
    }

    _onTitleInputKeyPress(event: SyntheticInputEvent<HTMLInputElement>): void {
        if (event.key === 'Enter' && this._titleInputEl) {
            this._titleInputEl.blur();
        }
    }

    _renderTitle(): React$Element<any> | string {
        var { item } = this.props;
        var { editTitle } = this.state;

        if (editTitle) {
            return (
                <input
                    autoFocus={ true }
                    type="text"
                    name="title"
                    onKeyPress={ this._onTitleInputKeyPress.bind(this) }
                    onChange={ this._onInputChange.bind(this) }
                    onBlur={ this._onTitleInputBlur.bind(this) }
                    value={ item.title }
                    className="form-control"
                    ref={ (el) => this._titleInputEl = el }
                />
            );
        }

        return (
            <div>
                { item.title }&nbsp;
                <a href="" onClick={ this._onTitleEditClick.bind(this) } className="form-control-static">
                    <i className="glyphicon glyphicon-pencil" />
                </a>
            </div>
        );
    }

    render(): React$Element<any> {
        var { item } = this.props;

        return (
            <div className="todo-list-item">
                <form className="form" onSubmit={ (event: SyntheticInputEvent<HTMLInputElement>) : void => event.preventDefault() }>
                    <div className="checkbox">
                        <input
                            name="checked"
                            onChange={ this._onInputChange.bind(this) }
                            type="checkbox"
                            checked={ item.checked }
                        />
                        { this._renderTitle() }
                    </div>
                </form>
            </div>
        );
    }
}

export default TodoListItem;
