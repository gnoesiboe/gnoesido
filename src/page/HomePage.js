// @flow

import React from 'react';
import uuid from 'uuid';
import * as localStorageRepository from '../repository/localStorageRepository';
import { Redirect, Link } from 'react-router-dom';
import { generatePagePath } from '../routing/urlGenerator';

type Props = {};
type State = {
    redirectId: ?string
};

export default class HomePage extends React.Component<Props, State> {

    state : State = {
        redirectId: null
    };

    _onAddClick = (event: SyntheticInputEvent<HTMLInputElement>) => {
        var id = uuid();

        localStorageRepository.save(id, null);

        this.setState((currentState : State) => {
            return {
                ...currentState,
                redirectId: id
            };
        })
    }

    render() : React$Element<any> {
        var { redirectId } = this.state;

        if (redirectId) {
            return <Redirect to={ generatePagePath(redirectId) } />;
        }

        return (
            <div className="container">
                <h1>Home</h1>
                <ul className="list-unstyled spacer-m">
                    { localStorageRepository.getAllKeys().map((key: string) => {
                        return (
                            <li key={ key }>
                                <Link to={ generatePagePath(key) }>{ key}</Link>
                            </li>
                        );
                    })}
                </ul>
                <a className="btn btn-primary" onClick={ this._onAddClick }>
                    Add new todo page
                </a>
            </div>
        );
    }
}
