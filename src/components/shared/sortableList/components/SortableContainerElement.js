// @flow

import * as React from 'react';
import { SortableElement as createSortableElement } from 'react-sortable-hoc';

type Props = {
    children: React.Node,
    index: ?Number
};

var SortableContainerElement = createSortableElement((props: Props) => {
    var { children, ...restOfProps } = props;

    return (
        <div { ...restOfProps }>
            { props.children }
        </div>
    )
});

export default SortableContainerElement;
