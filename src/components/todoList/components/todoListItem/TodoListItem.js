// @flow

import React from 'react';
import type { Todo } from '../../../../model/type/Todo';

export type OnChangeCallback = (checked: boolean, title: string) => void;

type Props = {
    item: Todo,
    onChange: OnChangeCallback
};

type State = {
    checked: boolean,
    title: string
}

class TodoListItem extends React.Component<Props, State> {

    constructor(props: Props) {
        super(props);

        this.state = {
            checked: props.item.checked,
            title: props.item.title
        };
    }

    _onInputChange(event: SyntheticInputEvent<HTMLInputElement>) {
        var target = event.target,
            newValue = target.type === 'checkbox' ? target.checked : target.value,
            name = target.name;

        this.setState({
            [name]: newValue
        });

        if (target.type === 'checkbox') {
            this._triggerChange();
        }
    }

    _triggerChange() : void {
        var { checked, title } = this.state;

        this.props.onChange(checked, title);
    }

    _onSubmit(event: SyntheticEvent<HTMLElement>) : void {
        event.preventDefault();

        this._triggerChange();
    }

    render(): React$Element<any> {
        var { checked, title } = this.state;

        return (
            <div className="todo-list-item">
                <form className="form" onSubmit={ this._onSubmit.bind(this) }>
                    <div className="checkbox">
                        <label>
                            <input
                                name="checked"
                                onChange={ this._onInputChange.bind(this) }
                                type="checkbox"
                                checked={ checked }
                            />
                            <input
                                type="text"
                                name="title"
                                onChange={ this._onInputChange.bind(this) }
                                value={ title }
                            />
                        </label>
                    </div>
                </form>
            </div>
        );
    }
}

export default TodoListItem;
