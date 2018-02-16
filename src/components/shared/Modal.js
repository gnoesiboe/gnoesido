// @flow

import * as React from 'react';
import 'react-responsive-modal/lib/react-responsive-modal.css';
import ReactModal from 'react-responsive-modal/lib/css';

type Props = {
    children: React.Node,
    onClose: () => void
};

export default function Modal(props: Props) : React$Element<any> {
    var styles = {
        modal: {
            minWidth: '300px'
        }
    }

    return (
        <ReactModal open={ true } onClose={ props.onClose } styles={ styles }>
            <div className="modal--content">
                { props.children }
            </div>
        </ReactModal>
    );
}
