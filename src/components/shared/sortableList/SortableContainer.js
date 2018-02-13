// @flow

import * as React from 'react';
import { SortableContainer as createSortableContainer } from 'react-sortable-hoc';
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

var SortableContainer = createSortableContainer((props: Props) => {
    var { children, ...restOfProps } = props;

    return (
        <div { ...restOfProps }>
            { props.children }
        </div>
    );
});

export default SortableContainer;
