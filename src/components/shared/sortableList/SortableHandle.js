// @flow

import * as React from 'react';
import { SortableHandle } from 'react-sortable-hoc';

type Props = {
    children: React.Node
}

var SortableListItemHandle = SortableHandle((props: Props) => {
    var { children, ...restOfProps } = props;

    return (
        <span { ...restOfProps }>
            { children }
        </span>
    );
});

export default SortableListItemHandle;
