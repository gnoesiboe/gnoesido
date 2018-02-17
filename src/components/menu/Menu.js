// @flow

import React from 'react';
import { scaleRotate as ReactMenu } from 'react-burger-menu';
import { generateHomePath } from '../../routing/urlGenerator';
import { Link } from 'react-router-dom';

var styles: Object = {
    bmBurgerButton: {
        position: 'fixed',
        width: '25px',
        height: '25px',
        left: '20px',
        top: '20px'
    },
    bmBurgerBars: {
        background: '#373a47'
    },
    bmCrossButton: {
        height: '24px',
        width: '24px'
    },
    bmCross: {
        background: '#bdc3c7'
    },
    bmMenu: {
        background: '#373a47',
        padding: '2.5em 1.5em 0',
        fontSize: '1.15em'
    },
    bmMorphShape: {
        fill: '#373a47'
    },
    bmItemList: {
        color: '#b8b7ad',
        padding: '0.8em'
    },
    bmOverlay: {
        background: 'rgba(0, 0, 0, 0.3)'
    }
};

type Props = {
    [string]: any
};

type State = {
    menuOpen: boolean
}

export default class Menu extends React.Component<Props, State> {

    state: State = {
        menuOpen: false
    }

    _onMenuStateChange(state : { menuOpen: boolean }) {
        this.setState((currentState: State) => {
            return {
                ...currentState,
                menuOpen: state.menuOpen
            }
        })
    }

    render(): React$Element<any> {
        return (
            <ReactMenu
                isOpen={ this.state.menuOpen }
                styles={ styles }
                { ...this.props }
            >
                <Link className="menu-item" key="home" to={ generateHomePath() }>Home</Link>
            </ReactMenu>
        );
    }
}
