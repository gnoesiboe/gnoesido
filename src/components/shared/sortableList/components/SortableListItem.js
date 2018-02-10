// @flow

import * as React from 'react';
import { SortableElement } from 'react-sortable-hoc';

type Props = {
    children: React.Node,
    index: ?Number
};

var SortableListItem = SortableElement((props: Props) => <li>{ props.children }</li>);

export default SortableListItem;
