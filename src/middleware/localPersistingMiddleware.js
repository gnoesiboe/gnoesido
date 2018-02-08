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

    localStorageRepository.save(newState);

    return response;
}
