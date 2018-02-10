// @flow

import * as React from 'react';
import { SortableContainer } from 'react-sortable-hoc';
import SortableListItem from './components/SortableListItem';

export type OnSortEndData = {
    oldIndex: number,
    newIndex: number,
    collection: number
};

type OnSortEndCallback = (data: OnSortEndData) => void;

type Props = {
    children: Array<SortableListItem>,
    onSortEnd: OnSortEndCallback
};

var SortableList = SortableContainer((props: Props) => {
    var { children, ...restOfProps } = props;

    return (
        <ul { ...restOfProps }>
            { props.children }
        </ul>
    );
});

export default SortableList;
