import React from 'react';

import styled, {createGlobalStyle, ThemeProvider} from 'styled-components';

import ScreenSizeProvider from '../../src/grid/ScreenSizeProvider';

import type {Theme, WithChildren} from '../../src/sharedTypes';

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

interface ComponentProps {
    bgColor: string;
    height: number | string;
    /** The test id. */
    testId: string;
    theme: Theme;
    width: number | string;
}

/**
 * Test.
 *
 * @param props          Component props.
 * @param props.testId   The test id.
 * @param props.bgColor  The background color.
 * @param props.children The children.
 * @param props.height   The height.
 * @param props.theme    The theme.
 * @param props.width    The width.
 * @returns The component.
 */
const Test = ({bgColor, children, height, testId, theme, width}: WithChildren<ComponentProps>) => (
    <TestWrapperElement $bgColor={bgColor} $height={height} $width={width} data-cy={testId}>
        <ThemeProvider theme={theme}>
            <ScreenSizeProvider>
                <GlobalStyle />
                {children}
            </ScreenSizeProvider>
        </ThemeProvider>
    </TestWrapperElement>
);

Test.displayName = 'Test';
Test.defaultProps = {
    bgColor: '#ffffff',
    height: '100%',
    testId: null,
    width: '100%'
};

export default Test;

interface TestWrapperProps {
    $bgColor: string;
    $height: number | string;
    $width: number | string;
}

const TestWrapperElement = styled.div<TestWrapperProps>`
    background-color: ${({$bgColor}) => $bgColor};
    height: ${({$height}) => ((Number.isInteger($height)) ? `${$height}px` : $height)};
    width: ${({$width}) => ((Number.isInteger($width)) ? `${$width}px` : $width)};
`;