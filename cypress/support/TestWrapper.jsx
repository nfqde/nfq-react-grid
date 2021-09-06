import React, {Component} from 'react';

import PropTypes from 'prop-types';
import styled, {createGlobalStyle, ThemeProvider} from 'styled-components';

import ScreenClassProvider from '../../src/utils/ScreenClassProvider';

const GlobalStyle = createGlobalStyle`
    *,
    &::before,
    &::after {
        box-sizing: border-box;
    }

    * {
        -webkit-tap-highlight-color: transparent;
    }

    html {
        font-size: 10px;
    }

    html, body {
        margin: 0;
        padding: 0;
        scroll-behavior: smooth;
        height: 100%;
    }
`;

/**
 * TestWrapper
 *
 * @class TestWrapper
 * @augments {Component<Props, State>}
 * @extends {Component}
 */
class TestWrapper extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        theme: PropTypes.object.isRequired,
        bgColor: PropTypes.string,
        height: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        testId: PropTypes.string,
        width: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }

    static defaultProps = {
        bgColor: '#ffffff',
        height: '100%',
        testId: null,
        width: '100%'
    }

    /**
     * Renders the Component.
     *
     * @returns {JSX} Component.
     * @memberof TestWrapper
     */
    render() {
        const {bgColor, children, height, testId, theme, width} = this.props;

        return (
            <TestWrapperElement bgColor={bgColor} data-cy={testId} height={height} width={width}>
                <ThemeProvider theme={theme}>
                    <ScreenClassProvider>
                        <GlobalStyle />
                        {children}
                    </ScreenClassProvider>
                </ThemeProvider>
            </TestWrapperElement>
        );
    }
}

export default TestWrapper;

const TestWrapperElement = styled.div`
    background-color: ${({bgColor}) => bgColor};
    height: ${({height}) => ((Number.isInteger(height)) ? `${height}px` : height)};
    width: ${({width}) => ((Number.isInteger(width)) ? `${width}px` : width)};
`;