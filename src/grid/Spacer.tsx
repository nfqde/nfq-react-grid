/* eslint-disable no-undefined */
import React from 'react';

import styled from 'styled-components';

import {useDebug} from '../utils/hooks/useDebug';
import {
    calcSpacerInline,
    calcSpacerMaxValues,
    calcSpacerMeasures,
    debugCss,
    mergeMediaQueries
} from '../utils/styleHelpers';

import type {Breakpoints, SpacerObject} from '../sharedTypes';

interface ComponentProps {
    /** Whether the spacer should behave like an inline element. If true, the spacer will behave like a regular inline element and not create a new line. If false, the spacer will behave like a block element and create a new line. It takes an array of `Breakpoints` or a `boolean` value. */
    isInline?: Breakpoints[] | boolean;
    /** Whether the spacer should not stretch. If true, the spacer will not stretch to fill its container if its an flex container. If false, the spacer will stretch to fill its container. It takes an array of `Breakpoints` or a `boolean` value. */
    isNotStretching?: Breakpoints[] | boolean;
    /** The maximum horizontal spacing size in a flex container. This is a multiplication factor that is used with the `baseSpacing` property of the theme to calculate the maximum horizontal spacing value. It takes an `SpacerObject` or a `number` value. */
    maxX?: SpacerObject | number;
    /** The maximum vertical spacing size in a flex container. This is a multiplication factor that is used with the `baseSpacing` property of the theme to calculate the maximum vertical spacing value. It takes an `SpacerObject` or a `number` value. */
    maxY?: SpacerObject | number;
    /** TestId for cypress testing. */
    testId?: string;
    /** The horizontal spacing size. In a flex container, this defines the base horizontal spacing value and is a multiplication factor that is used with the `baseSpacing` property of the theme to calculate the horizontal spacing value. In a non-flex container, this defines the actual horizontal spacing value in pixels. It takes an `SpacerObject` or a `number` value. */
    x?: SpacerObject | number;
    /** The vertical spacing size. In a flex container, this defines the base vertical spacing value and is a multiplication factor that is used with the `baseSpacing` property of the theme to calculate the vertical spacing value. In a non-flex container, this defines the actual vertical spacing value in pixels. It takes an `SpacerObject` or a `number` value. */
    y?: SpacerObject | number;
}

/**
 * Spacer component used for creating spacing between elements.
 *
 * @param props                 The props for the Row component.
 * @param props.isInline        Whether the spacer should behave like an inline element. If true, the spacer will behave like a regular inline element and not create a new line. If false, the spacer will behave like a block element and create a new line. It takes an array of `Breakpoints` or a `boolean` value.
 * @param props.isNotStretching Whether the spacer should not stretch. If true, the spacer will not stretch to fill its container if its an flex container. If false, the spacer will stretch to fill its container. It takes an array of `Breakpoints` or a `boolean` value.
 * @param props.maxX            The maximum horizontal spacing size in a flex container. This is a multiplication factor that is used with the `baseSpacing` property of the theme to calculate the maximum horizontal spacing value. It takes an `SpacerObject` or a `number` value.
 * @param props.maxY            The maximum vertical spacing size in a flex container. This is a multiplication factor that is used with the `baseSpacing` property of the theme to calculate the maximum vertical spacing value. It takes an `SpacerObject` or a `number` value.
 * @param props.testId          TestId for cypress testing.
 * @param props.x               The horizontal spacing size. In a flex container, this defines the base horizontal spacing value and is a multiplication factor that is used with the `baseSpacing` property of the theme to calculate the horizontal spacing value. In a non-flex container, this defines the actual horizontal spacing value in pixels. It takes an `SpacerObject` or a `number` value.
 * @param props.y               The vertical spacing size. In a flex container, this defines the base vertical spacing value and is a multiplication factor that is used with the `baseSpacing` property of the theme to calculate the vertical spacing value. In a non-flex container, this defines the actual vertical spacing value in pixels. It takes an `SpacerObject` or a `number` value.
 *
 * @returns The Spacer component.
 * @example
 * ```tsx
 * import {Spacer} from '@nfq/react-grid';
 *
 * const MyComponent = () => (
 *     <>
 *         <div></div>
 *         <Spacer y={2} /> // 2 * baseSpacing
 *         <div></div>
 *     </>
 * );
 * ```
 */
const Spacer = ({isInline = false, isNotStretching = false, maxX, maxY, testId = 'Spacer', x, y}: ComponentProps) => {
    const className = useDebug();

    return (
        <SpacerElement
            $isInline={isInline}
            $isNotStretching={isNotStretching}
            $maxX={maxX}
            $maxY={maxY}
            $x={x}
            $y={y}
            aria-hidden="true"
            className={className}
            data-cy={testId}
        />
    );
};

Spacer.displayName = 'Spacer';
Spacer.defaultProps = {
    isInline: false,
    isNotStretching: false,
    maxX: undefined,
    maxY: undefined,
    testId: null,
    x: undefined,
    y: undefined
};

export default Spacer;

interface SpacerElementProps {
    $isInline: Breakpoints[] | boolean;
    $isNotStretching: Breakpoints[] | boolean;
    $maxX?: SpacerObject | number;
    $maxY?: SpacerObject | number;
    $x?: SpacerObject | number;
    $y?: SpacerObject | number;
}

/* eslint-disable indent */
const SpacerElement = styled.span<SpacerElementProps>`
    flex: 1 1 0rem;

    ${mergeMediaQueries<SpacerElementProps>(
        calcSpacerInline,
        calcSpacerMeasures('height'),
        calcSpacerMeasures('min-height'),
        calcSpacerMeasures('width'),
        calcSpacerMeasures('min-width'),
        calcSpacerMaxValues('max-height'),
        calcSpacerMaxValues('max-width')
    )};
    ${debugCss('spacer')}
`;
/* eslint-enable indent */