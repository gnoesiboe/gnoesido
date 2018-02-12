// @flow

import * as React from 'react';
import ReactMarkdown from 'react-markdown';

type Props = {
    source: string
}

export default class InlineMarkdown extends React.Component<Props> {

    _renderRoot(props : { children: React.Node }) : React.Node {
        // prevent <div> wrapping of HTML (is block ellement)

        return props.children;
    }

    _renderParagraph(props : { children: React.Node }) : React$Element<any> {
        // prevent <p> wrapping of paragraph (is block ellement)

        return (
            <span className="markdown markdown-inline">
                { props.children }
            </span>
        );
    }

    _renderLink(props : { children: React.Node, href: string }) : React$Element<any> {
        return (
            <a href={ props.href } target="_blank">
                { props.children }
            </a>
        );
    }

    render() : React$Element<any> {
        var disallowedTypes = [
            'break', 'thematicBreak', 'blockquote', 'image', 'imageReference', 'table',
            'tableHead', 'tableBody', 'tableRow', 'list', 'listItem', 'definition',
            'heading', 'html'
        ];

        var renderers = {
            root: this._renderRoot,
            paragraph: this._renderParagraph,
            link: this._renderLink
        };

        return (
            <ReactMarkdown
                source={ this.props.source }
                disallowedTypes={ disallowedTypes }
                renderers={ renderers }
            />
        )
    }
}
