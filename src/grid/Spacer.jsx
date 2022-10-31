import React, {useEffect, useReducer, useRef} from 'react';

import styled, {css} from 'styled-components';

import {useDebug, useObserver} from '../utils/hooks';
import {getConfig} from '../utils/lib';
import {calcFlex, calcHeight, calcInline, calcMaxHeight, calcMaxWidth, calcWidth} from '../utils/styleHelpers';

/**
 * Spacer component.
 *
 * @param {object}                 props          Component props.
 * @param {boolean|Array<boolean>} props.isInline Whether the spacer is inline or not.
 * @param {number|Sizes}           props.maxX     Maximum width.
 * @param {number|Sizes}           props.maxY     Maximum height.
 * @param {string}                 props.testId   Cypress test id.
 * @param {number|Sizes}           props.x        Width.
 * @param {number|Sizes}           props.y        Height.
 *
 * @returns {React.ReactNode} Component.
 */
const Spacer = ({isInline, maxX, maxY, testId, x, y}) => {
    const spacer = useRef(null);
    const [direction, handleFlexDirection] = useReducer(oldDirection => {
        // eslint-disable-next-line react-hooks-ssr/react-hooks-global-ssr
        if (window.getComputedStyle(spacer.current.parentElement)) {
            if (spacer.current) {
                const {flexDirection} = window.getComputedStyle(spacer.current.parentElement);
                const newDirection = ['column', 'column-reverse'].includes(flexDirection) ? 'Y' : 'X';

                if (oldDirection !== newDirection) {
                    return newDirection;
                }
            }
        }

        return oldDirection;
    }, 'X');
    const className = useDebug();

    useObserver(spacer, handleFlexDirection);

    useEffect(() => {
        handleFlexDirection();
        window.addEventListener('resize', handleFlexDirection);

        return () => window.removeEventListener('resize', handleFlexDirection);
    }, []);

    return (
        <SpacerElement
            ref={spacer}
            aria-hidden="true"
            className={className}
            data-cy={testId}
            direction={direction}
            isInline={isInline}
            maxX={maxX}
            maxY={maxY}
            x={x}
            y={y}
        />
    );
};

Spacer.displayName = 'Spacer';
Spacer.defaultProps = {
    isInline: false,
    maxX: null,
    maxY: null,
    testId: null,
    x: null,
    y: null
};

export default Spacer;

/**
 * @typedef {object} SpacerProps
 * @property {boolean|Array<boolean>} [isInline]  Whether the spacer is inline.
 * @property {number|Sizes}           [maxX]      Maximum width.
 * @property {number|Sizes}           [maxY]      Maximum height.
 * @property {('X'|'Y')}              [direction] The cypress test id.
 * @property {number|Sizes}           [x]         Width.
 * @property {number|Sizes}           [y]         Height.
 */

const SpacerElement = /** @type {import('styled-components').ThemedStyledFunction<'span', SpacerProps>} */ (styled.span)`
    flex: 1 1 0px;

    ${({isInline, theme}) => css`
        ${calcInline(theme, isInline)}
    `}

    ${({direction, theme, x, y}) => css`
        ${calcFlex(theme, direction, x, y)}
    `}

    ${({theme, y}) => ((typeof y === 'number' || typeof y === 'object') && y !== null) && css`
        ${calcHeight(theme, y)}
    `}

    ${({maxY, theme}) => ((typeof maxY === 'number' || typeof maxY === 'object') && maxY !== null) && css`
        ${calcMaxHeight(theme, maxY)}
    `}

    ${({maxX, theme}) => ((typeof maxX === 'number' || typeof maxX === 'object') && maxX !== null) && css`
        ${calcMaxWidth(theme, maxX)}
    `}

    ${({theme, x}) => ((typeof x === 'number' || typeof x === 'object') && x !== null) && css`
        ${calcWidth(theme, x)}
    `}

    ${({theme}) => process.env.NODE_ENV !== 'production' && css`
        &.debug {
            background-color: ${getConfig(theme).debug.spacer.background};
            outline: ${getConfig(theme).debug.spacer.outline} solid 1px;
        }
    `}
`;