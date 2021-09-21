import React, {useEffect, useRef, useState} from 'react';

import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import {useDebug, useObserver} from '../utils/hooks';
import {getConfig} from '../utils/lib';
import {calcFlex, calcHeight, calcInline, calcMaxHeight, calcMaxWidth, calcWidth} from '../utils/spacerHelpers';

/**
 * Spacer
 *
 * @augments {Component<Props, State>}
 *
 * @returns {JSX} Component.
 */
const Spacer = ({inline, maxX, maxY, testId, x, y}) => {
    const [direction, setDirection] = useState('X');
    const directionRef = useRef();
    const spacer = useRef(null);
    const className = useDebug();

    directionRef.current = direction;

    /**
     * Calculates the actual flex direction.
     */
    const findFlexDirection = () => {
        if (window.getComputedStyle(spacer.current.parentElement)) {
            const oldDirection = directionRef.current;

            if (spacer.current) {
                const {flexDirection} = window.getComputedStyle(spacer.current.parentElement);
                const newDirection = ['column', 'column-reverse'].includes(flexDirection) ? 'Y' : 'X';

                if (oldDirection !== newDirection) {
                    setDirection({newDirection});
                }
            }
        }
    };

    useObserver(spacer, findFlexDirection);

    useEffect(() => {
        findFlexDirection();
        window.addEventListener('resize', findFlexDirection);

        return () => window.removeEventListener('resize', findFlexDirection);
    }, []);

    return (
        <SpacerElement
            ref={spacer}
            className={className}
            data-cy={testId}
            direction={direction}
            inline={inline}
            maxX={maxX}
            maxY={maxY}
            x={x}
            y={y}
        />
    );
};

Spacer.displayName = 'Spacer';
Spacer.propTypes = {
    inline: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
    maxX: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    maxY: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    /** TestID for cypress testing  */
    testId: PropTypes.string,
    x: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    y: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
};
Spacer.defaultProps = {
    inline: false,
    maxX: null,
    maxY: null,
    testId: null,
    x: null,
    y: null
};

export default Spacer;

const SpacerElement = styled.span`
    flex: 1 1 0px;

    ${({inline, theme}) => css`
        ${calcInline(inline, theme)}
    `}

    ${({direction, theme, x, y}) => css`
        ${calcFlex(direction, theme, x, y)}
    `}

    ${({theme, y}) => ((typeof y === 'number' || typeof y === 'object') && y !== null) && css`
        ${calcHeight(theme, y)}
    `}

    ${({maxY, theme}) => ((typeof maxY === 'number' || typeof maxY === 'object') && maxY !== null) && css`
        ${calcMaxHeight(maxY, theme)}
    `}

    ${({maxX, theme}) => ((typeof maxX === 'number' || typeof maxX === 'object') && maxX !== null) && css`
        ${calcMaxWidth(maxX, theme)}
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