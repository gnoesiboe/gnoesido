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
                <h1>@_GNoesiDO</h1>
                <h2>My pages:</h2>
                <ul className="list-group spacer-l">
                    { localStorageRepository.getAllKeys().map((key: string) => (
                        <li className="list-group-item" key={ key }>
                            <Link to={ generatePagePath(key) }>{ key}</Link>
                        </li>
                    )) }
                </ul>
                <a className="btn btn-primary btn-lg" onClick={ this._onAddClick }>
                    <i className="glyphicon glyphicon-plus" /> Add todo page
                </a>
            </div>
        );
    }
}
