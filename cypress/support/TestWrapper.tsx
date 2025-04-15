import React from 'react';

import {css, Global, type SerializedStyles, ThemeProvider} from '@emotion/react';
import styled from '@emotion/styled';

import {ScreenSizeProvider} from '../../src/grid/ScreenSizeProvider';

import type {WithChildren} from '../../src/sharedTypes/componentTypes';

interface ComponentProps {
    bgColor: string;
    height: number | string;
    /** The test id. */
    testId: string;
    theme: SerializedStyles;
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
const Test = ({bgColor, children, height, testId, theme, width}: WithChildren<ComponentProps>) => {
    const GlobalStyle = css`
        ${theme}

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
            height: 100%;
            margin: 0;
            padding: 0;
            scroll-behavior: smooth;
        }
    `;

    return (
        <TestWrapperElement $bgColor={bgColor} $height={height} $width={width} data-cy={testId}>
            <Global styles={GlobalStyle} />
            <ThemeProvider theme={theme}>
                <ScreenSizeProvider>
                    {children}
                </ScreenSizeProvider>
            </ThemeProvider>
        </TestWrapperElement>
    );
};

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