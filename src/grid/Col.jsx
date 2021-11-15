/* eslint-disable react/boolean-prop-naming */
import React, {forwardRef} from 'react';

import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import {DIMENSIONS} from '../defaultConfig';
import {HALF} from '../utils/constants';
import {useDebug} from '../utils/hooks';
import {getConfig, media} from '../utils/lib';
import {calcAlign, calcDirection, calcJustify, calcOffset, calcSizes} from '../utils/styleHelpers';

/**
 * Col
 *
 * @component
 * @augments {Component<Props, State>}
 * @extends {Component}
 */
const Col = forwardRef(({
    align,
    as,
    children,
    className,
    direction,
    justify,
    lg,
    md,
    noGutter,
    offset,
    order,
    reverse,
    sm,
    testId,
    xl,
    xs,
    xxl,
    ...eventHandler
}, ref) => {
    const classNames = [className, useDebug()];

    return (
        <ColElement
            ref={ref}
            align={align}
            as={as}
            className={classNames.join(' ')}
            data-cy={testId}
            direction={direction}
            justify={justify}
            lg={lg}
            md={md}
            noGutter={noGutter}
            offset={offset}
            order={order}
            reverse={reverse}
            sm={sm}
            xl={xl}
            xs={xs}
            xxl={xxl}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...eventHandler}
        >
            {children}
        </ColElement>
    );
});

Col.displayName = 'Col';
Col.propTypes = {
    align: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    as: PropTypes.string,
    children: PropTypes.node,
    className: PropTypes.string,
    direction: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    justify: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
    lg: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    md: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    noGutter: PropTypes.bool,
    offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
    order: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
    reverse: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
    sm: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    testId: PropTypes.string,
    xl: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    xs: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    xxl: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
};
Col.defaultProps = {
    align: null,
    as: null,
    children: null,
    className: null,
    direction: 'column',
    justify: null,
    lg: null,
    md: null,
    noGutter: false,
    offset: null,
    order: null,
    reverse: false,
    sm: null,
    testId: null,
    xl: null,
    xs: null,
    xxl: null
};

export default Col;

const ColElement = styled.div`
    box-sizing: border-box;
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    max-width: 100%;

    ${({noGutter, theme}) => !noGutter && css`
        ${DIMENSIONS.map(screenSize => typeof getConfig(theme).breakpoints[String(screenSize)] === 'number' && media(theme, screenSize)`
            padding-right: ${getConfig(theme).gutterWidth[String(screenSize)] / HALF}px;
            padding-left: ${getConfig(theme).gutterWidth[String(screenSize)] / HALF}px;
        `)}
    `}

    ${({theme, ...sizes}) => css`
        ${calcSizes(theme, sizes)}
    `}

    ${({offset, theme}) => offset && css`
        ${calcOffset(theme, offset)}
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

    ${({direction, reverse, theme}) => css`
        ${calcDirection(theme, direction, reverse, 'column')}
    `}

    ${({align, theme}) => align && css`
        ${calcAlign(theme, align)}
    `}

    ${({justify, theme}) => justify && css`
        ${calcJustify(theme, justify)}
    `}

    ${({theme}) => process.env.NODE_ENV !== 'production' && css`
        &.debug {
            background-clip: content-box, padding-box;
            background-image:
                linear-gradient(to bottom, ${getConfig(theme).debug.col.background} 0%, ${getConfig(theme).debug.col.background} 100%),
                linear-gradient(to bottom, ${getConfig(theme).debug.col.padding} 0%, ${getConfig(theme).debug.col.padding} 100%);
            outline: ${getConfig(theme).debug.col.outline} solid 1px;
        }
    `}
`;