/* eslint-disable react/boolean-prop-naming */
import React, {forwardRef} from 'react';

import styled, {css} from 'styled-components';

import {DIMENSIONS} from '../defaultConfig';
import {HALF} from '../utils/constants';
import {useDebug} from '../utils/hooks';
import {getConfig, media} from '../utils/lib';
import {calcAlign, calcDirection, calcJustify} from '../utils/styleHelpers';

/**
 * @typedef {object} RowComponentProps
 * @property {React.ReactNode}                    children    Component children.
 * @property {null|FlexAlign|Align}               [align]     Row alignment.
 * @property {React.ElementType}                  [as]        Component type.
 * @property {string}                             [className] An styled components class name for inheritance.
 * @property {FlexDirection|Direction}            [direction] Row direction.
 * @property {FlexJustify|Justify}                [justify]   Row justify.
 * @property {boolean|Array<Screensizes>}         [noWrap]    Whether the row should wrap or not.
 * @property {number|Sizes}                       [order]     Row order.
 * @property {boolean|Array<Screensizes>}         [reverse]   Whether the row should be reversed or not.
 * @property {string}                             [testId]    Cypress test id.
 * @property {React.ForwardedRef<HTMLDivElement>} [ref]       Component ref.
 */

/**
 * @type React.FC<RowComponentProps>
 */
const Row = forwardRef(
    ({
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
    }
);

Row.displayName = 'Row';
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

/**
 * @typedef {object} RowProps
 * @property {FlexAlign|Align}            [align]     One of: 'start', 'end', 'center', 'space-around', 'space-between', 'space-evenly'.
 * @property {FlexDirection|Direction}    [direction] One of: 'row', 'column'.
 * @property {FlexJustify|Justify}        [justify]   One of: 'start', 'end', 'center', 'space-around', 'space-between', 'space-evenly'.
 * @property {boolean|Array<Screensizes>} [noWrap]    If true, the row will not wrap to the next line.
 * @property {number|Sizes}               [order]     Order of the row.
 * @property {React.ElementType}          [as]        Component type.
 * @property {boolean|Array<Screensizes>} [reverse]   Whether the row is reversed.
 */

/**
 * @type {React.FC<StyledComponentProps<'div', RowProps>>}
 */
const RowElement = /** @type {StyledComponentFunction<'div', RowProps>} */ (styled.div)`
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