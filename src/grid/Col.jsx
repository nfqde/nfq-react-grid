/* eslint-disable react/boolean-prop-naming */
import React, {forwardRef} from 'react';

import styled, {css} from 'styled-components';

import {DIMENSIONS} from '../defaultConfig';
import {useDebug} from '../utils/hooks';
import {getConfig, media} from '../utils/lib';
import {
    calcAlign,
    calcDirection,
    calcJustify,
    calcOffset,
    calcPaddingLeft,
    calcPaddingRight,
    calcSizes
} from '../utils/styleHelpers';

/**
 * @typedef {object} ColComponentProps
 * @property {React.ReactNode}                    children            Component children.
 * @property {null|FlexAlign|Align}               [align]             Col alignment.
 * @property {React.ElementType}                  [as]                Component type.
 * @property {string}                             [className]         An styled components class name for inheritance.
 * @property {FlexDirection|Direction}            [direction]         Col direction.
 * @property {string|ExtraPadding}                [extraPadding]      Extra padding.
 * @property {string|ExtraPadding}                [extraPaddingLeft]  Extra padding left.
 * @property {string|ExtraPadding}                [extraPaddingRight] Extra padding right.
 * @property {FlexJustify|Justify}                [justify]           Col justify.
 * @property {number}                             [lg]                Col lg size.
 * @property {number}                             [md]                Col md size.
 * @property {boolean|Array<Screensizes>}         [noGutter]          Col no gutter.
 * @property {number|Offset}                      [offset]            Col offset.
 * @property {number|Sizes}                       [order]             Col order.
 * @property {boolean|Array<Screensizes>}         [reverse]           Whether the Col should be reversed or not.
 * @property {number}                             [sm]                Col sm size.
 * @property {string}                             [testId]            Cypress test id.
 * @property {number}                             [xl]                Col xl size.
 * @property {number}                             [xs]                Col xs size.
 * @property {number}                             [xxl]               Col xxl size.
 * @property {React.ForwardedRef<HTMLDivElement>} [ref]               Component ref.
 */

/**
 * @type React.FC<ColComponentProps>
 */
const Col = forwardRef(({
    align,
    as,
    children,
    className,
    direction,
    extraPadding,
    extraPaddingLeft,
    extraPaddingRight,
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
            extraPadding={extraPadding}
            extraPaddingLeft={extraPaddingLeft}
            extraPaddingRight={extraPaddingRight}
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
Col.defaultProps = {
    align: null,
    as: null,
    children: null,
    className: null,
    direction: 'column',
    extraPadding: null,
    extraPaddingLeft: null,
    extraPaddingRight: null,
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

/**
 * @typedef {object} ColProps
 * @property {null|FlexAlign|Align}               [align]             Col alignment.
 * @property {React.ElementType}                  [as]                Component type.
 * @property {string}                             [className]         An styled components class name for inheritance.
 * @property {FlexDirection|Direction}            [direction]         Col direction.
 * @property {string|ExtraPadding}                [extraPadding]      Extra padding.
 * @property {string|ExtraPadding}                [extraPaddingLeft]  Extra padding left.
 * @property {string|ExtraPadding}                [extraPaddingRight] Extra padding right.
 * @property {FlexJustify|Justify}                [justify]           Col justify.
 * @property {number}                             [lg]                Col lg size.
 * @property {number}                             [md]                Col md size.
 * @property {boolean|Array<Screensizes>}         [noGutter]          Col no gutter.
 * @property {number|Offset}                      [offset]            Col offset.
 * @property {number|Sizes}                       [order]             Col order.
 * @property {boolean|Array<Screensizes>}         [reverse]           Whether the Col should be reversed or not.
 * @property {number}                             [sm]                Col sm size.
 * @property {number}                             [xl]                Col xl size.
 * @property {number}                             [xs]                Col xs size.
 * @property {number}                             [xxl]               Col xxl size.
 * @property {React.ForwardedRef<HTMLDivElement>} [ref]               Component ref.
 */

/**
 * @type {React.FC<StyledComponentProps<'div', ColProps>>}
 */
const ColElement = /** @type {StyledComponentFunction<'div', ColProps>} */ (styled.div)`
    box-sizing: border-box;
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    max-width: 100%;

    ${({extraPadding, extraPaddingLeft, extraPaddingRight, noGutter, theme}) => !noGutter && css`
        ${calcPaddingLeft(theme, extraPadding, extraPaddingLeft)}
        ${calcPaddingRight(theme, extraPadding, extraPaddingRight)}
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