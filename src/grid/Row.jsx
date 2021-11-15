/* eslint-disable react/boolean-prop-naming */
import React, {forwardRef} from 'react';

import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import {DIMENSIONS} from '../defaultConfig';
import {HALF} from '../utils/constants';
import {useDebug} from '../utils/hooks';
import {getConfig, media} from '../utils/lib';
import {calcAlign, calcDirection, calcJustify} from '../utils/styleHelpers';

/**
 * Row
 *
 * @component
 * @augments {Component<Props, State>}
 * @extends {Component}
 */
const Row = forwardRef(({
    align,
    as,
    children,
    className,
    direction,
    justify,
    noWrap,
    order,
    reverse,
    testId,
    ...eventHandler
}, ref) => {
    const classNames = [className, useDebug()];

    return (
        <RowElement
            ref={ref}
            align={align}
            as={as}
            className={classNames.join(' ')}
            data-cy={testId}
            direction={direction}
            justify={justify}
            noWrap={noWrap}
            order={order}
            reverse={reverse}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...eventHandler}
        >
            {children}
        </RowElement>
    );
});

Row.displayName = 'Row';
Row.propTypes = {
    children: PropTypes.node.isRequired,
    align: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    as: PropTypes.string,
    className: PropTypes.string,
    direction: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    justify: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    noWrap: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
    order: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    reverse: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
    /** TestID for cypress testing  */
    testId: PropTypes.string
};
Row.defaultProps = {
    align: null,
    as: null,
    className: null,
    direction: 'row',
    justify: null,
    noWrap: null,
    order: null,
    reverse: false,
    testId: null
};

export default Row;

const RowElement = styled.div`
    box-sizing: border-box;
    display: flex;
    flex: 1 1 auto;
    flex-wrap: wrap;

    ${({theme}) => css`
        ${DIMENSIONS.map(screenSize => getConfig(theme).container[String(screenSize)] && media(theme, screenSize)`
            margin-left: -${getConfig(theme).gutterWidth[String(screenSize)] / HALF}px;
            margin-right: -${getConfig(theme).gutterWidth[String(screenSize)] / HALF}px;
        `)}
    `}


    ${({direction, noWrap, reverse, theme}) => css`
        ${calcDirection(theme, direction, reverse, 'row', noWrap)}
    `}

    ${({order, theme}) => order !== null && css`
        ${DIMENSIONS.map(screenSize => typeof getConfig(theme).breakpoints[String(screenSize)] === 'number' && media(theme, screenSize)`
            ${typeof order === 'object'
        // eslint-disable-next-line indent
                ? typeof order[String(screenSize)] !== 'undefined' && `order: ${order[String(screenSize)]};`
        // eslint-disable-next-line indent
                : `order: ${order};`}
        `)}
    `}

    ${({align, theme}) => align && css`
        ${calcAlign(theme, align)}
    `}

    ${({justify, theme}) => justify && css`
        ${calcJustify(theme, justify)}
    `}

    ${({theme}) => process.env.NODE_ENV !== 'production' && css`
        &.debug {
            background-color: ${getConfig(theme).debug.row.background};
            outline: ${getConfig(theme).debug.row.outline} solid 1px;
        }
    `}
`;