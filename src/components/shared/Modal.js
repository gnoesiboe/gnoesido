// @flow

import * as React from 'react';
import ReactModal from 'react-modal';

type Props = {
    children: React.Node,
    onClose: () => void
};

export default function Modal(props: Props) : React$Element<any> {

    // @todo make responsive
    var styles = {
        overlay: {
            backgroundColor: 'rgba(0, 0, 0, 0.2)'
        },
        content: {
            right: '200px',
            left: '200px',
            top: '200px',
            bottom: '200px'
        }
    };

    return (
        <ReactModal
            isOpen={ true }
            ariaHideApp={ false }
            style={ styles }
            onRequestClose={ props.onClose }
        >
            <button className="pull-right btn-link" onClick={ props.onClose }>
                <i className="glyphicon glyphicon-remove" />
            </button>
            { props.children }
        </ReactModal>
    );
}
