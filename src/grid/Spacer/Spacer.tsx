/* eslint-disable no-undefined */
import React from 'react';

import styled from '@emotion/styled';

import {mergeMediaQueries} from '../../utils/styling';
import {useDebug} from '../hooks/useDebug';
import {debugCss} from '../util/debugCss';

import {calcSpacerInline, calcSpacerMaxValues, calcSpacerMeasures} from './utils';

import type {Breakpoints} from '../../sharedTypes/breakpointTypes';
import type {SpacerObject} from '../../sharedTypes/componentTypes';

/**
 * Props for the `<Spacer />` component in `@nfq/react-grid`.
 * This interface defines a flexible API for applying horizontal and vertical spacing
 * within both flex and non-flex containers. Spacing can be defined responsively using
 * breakpoint-specific values or single numbers, and behavior such as stretching or
 * inline/block layout can also be configured per breakpoint.
 */
interface ComponentProps {
    /**
     * Whether the spacer should behave like an inline element.
     * If `true`, the spacer behaves like an inline element and does not create a new line.
     * If `false`, the spacer behaves like a block element and will push to a new line.
     * Can also be passed as an array of `Breakpoints` to apply the behavior conditionally.
     */
    isInline?: Breakpoints[] | boolean;
    /**
     * Whether the spacer should not stretch to fill its parent container.
     * If `true`, the spacer does not stretch in a flex layout.
     * If `false`, it stretches to occupy the full available space.
     * Can be defined as a `boolean` or as a list of `Breakpoints`.
     */
    isNotStretching?: Breakpoints[] | boolean;
    /**
     * The maximum horizontal spacing value in a flex container.
     * Acts as a multiplier of the `baseSpacing` defined in the theme configuration.
     * Can be provided as a static number or a responsive `SpacerObject`.
     */
    maxX?: SpacerObject | number;
    /**
     * The maximum vertical spacing value in a flex container.
     * Acts as a multiplier of the `baseSpacing` defined in the theme configuration.
     * Can be provided as a static number or a responsive `SpacerObject`.
     */
    maxY?: SpacerObject | number;
    /**
     * A test identifier for use with Cypress or other testing frameworks.
     * This value will be applied as a `data-cy` attribute on the rendered spacer element.
     */
    testId?: string;
    /**
     * The horizontal spacing size.
     * In flex containers, this value is a multiplier of the theme’s `baseSpacing`.
     * In non-flex containers, it is interpreted as a raw pixel value.
     * Can be defined as a static number or a responsive `SpacerObject`.
     */
    x?: SpacerObject | number;
    /**
     * The vertical spacing size.
     * In flex containers, this value is a multiplier of the theme’s `baseSpacing`.
     * In non-flex containers, it is interpreted as a raw pixel value.
     * Can be defined as a static number or a responsive `SpacerObject`.
     */
    y?: SpacerObject | number;
}

/**
 * Renders a flexible spacing element for layout control in both flex and non-flex containers.
 * The `Spacer` component from `@nfq/react-grid` allows you to insert horizontal and/or vertical space
 * between layout elements. It supports responsive spacing via `SpacerObject`, base spacing multipliers,
 * and flexible layout behaviors such as inline rendering or stretch prevention.
 * Spacing is applied using custom CSS variables, and the component is visually hidden (`aria-hidden`)
 * but plays a structural role in layout spacing. A `data-cy` attribute is applied for test targeting.
 *
 * @param props                 The component props.
 * @param props.isInline        Controls whether the spacer is rendered inline or as a block.
 * @param props.isNotStretching Prevents stretching in flex layouts if set to `true`.
 * @param props.maxX            Maximum horizontal spacing (multiplier or object).
 * @param props.maxY            Maximum vertical spacing (multiplier or object).
 * @param props.testId          Test identifier applied as `data-cy`. Defaults to `'Spacer'`.
 * @param props.x               Horizontal spacing value (multiplier or object).
 * @param props.y               Vertical spacing value (multiplier or object).
 * @returns A layout spacer element that applies the configured spacing rules.
 *
 * @example
 * ```tsx
 * <Spacer x={2} y={1} />
 *
 * <Spacer
 *   isInline
 *   isNotStretching={['xs', 'md']}
 *   maxX={{ xs: 1, lg: 3 }}
 *   x={{ xs: 1, md: 2 }}
 * />
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

export {Spacer};

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
    --nfq-grid-spacer-max-x-calc: calc(var(--nfq-grid-spacer-max-x) * var(--nfq-grid-base-spacing));
    --nfq-grid-spacer-max-y-calc: calc(var(--nfq-grid-spacer-max-y) * var(--nfq-grid-base-spacing));
    flex: 1 1 0rem;
    height: calc(var(--nfq-grid-spacer-y) * var(--nfq-grid-base-spacing));
    max-height: var(--nfq-grid-spacer-max-y-calc, initial);
    max-width: var(--nfq-grid-spacer-max-x-calc, initial);
    min-height: calc(var(--nfq-grid-spacer-y) * var(--nfq-grid-base-spacing));
    min-width: calc(var(--nfq-grid-spacer-x) * var(--nfq-grid-base-spacing));
    width: calc(var(--nfq-grid-spacer-x) * var(--nfq-grid-base-spacing));

    ${mergeMediaQueries<SpacerElementProps>(
        calcSpacerInline,
        calcSpacerMeasures('x'),
        calcSpacerMeasures('y'),
        calcSpacerMaxValues('y'),
        calcSpacerMaxValues('x')
    )};
    ${debugCss('spacer')}
`;
/* eslint-enable indent */