import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { PrismAsyncLight as SyntaxHighlighter } from 'react-syntax-highlighter';
import { tomorrowNightBlue } from 'react-syntax-highlighter/dist/esm/styles/hljs';

export default class CodeHighlighter extends Component {
    static propTypes = {
        value: PropTypes.string.isRequired,
        language: PropTypes.string,
    };

    static defaultProps = {
        language: null,
    };
    render() {
        const { language, value } = this.props;
        return (
            <SyntaxHighlighter language={language} style={tomorrowNightBlue}>
                {value}
            </SyntaxHighlighter>
        );
    }
}
