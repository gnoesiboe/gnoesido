// @flow

import type { Action } from '../action/types';
import type { GlobalStateType } from '../store/globalStateType';
import * as localStorageRepository from './../repository/localStorageRepository';

type Next = (action: Action) => void;
type Store = {
    getState: () => GlobalStateType
};

export default (store: Store) => (next: Next) => (action: Action) : any => {
    var response = next(action),
        newState : GlobalStateType = store.getState();

    // @todo get better solution than this
    var id = window.location.pathname.substr(1);

    localStorageRepository.save(id, newState);

    return response;
}
