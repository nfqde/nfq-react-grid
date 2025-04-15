/* eslint-disable no-undefined */
import type {ElementType} from 'react';
import React, {forwardRef} from 'react';

import styled from '@emotion/styled';

import {mergeMediaQueries} from '../../utils/styling';
import {useDebug} from '../hooks/useDebug';
import {calcAlignment} from '../util/calcAlignment';
import {calcDirection} from '../util/calcDirection';
import {debugCss} from '../util/debugCss';

import {calcOffset, calcPadding, calcSizes} from './utils';

import type {Breakpoints} from '../../sharedTypes/breakpointTypes';
import type {
    AlignObject,
    DirectionObject,
    FlexAlign,
    FlexDirection,
    FlexJustify,
    JustifyObject,
    MouseEventHandler,
    OffsetObject,
    OrderObject,
    Padding,
    PaddingObject,
    SizesObject,
    StringSizes,
    WithChildren
} from '../../sharedTypes/componentTypes';

// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
type BreakpointProps = {
    [key in Breakpoints]?: StringSizes | number;
};

interface ComponentProps extends BreakpointProps {
    /** Defines the content alignment of the column. It takes a `AlignObject` or a `FlexAlign` type value. Its direction is dependent on the `direction` prop. */
    align?: AlignObject | FlexAlign;
    /** Sets the html element type of the column. If you overwrite its styles with styled() it has to be forwardedAs. */
    as?: ElementType;
    /** Classname property to overwrite styles with styled(). */
    className?: string;
    /** Sets the direction the column children should render ('row' or 'column'). It takes a `DirectionObject` or a `FlexDirection` type value. */
    direction?: DirectionObject | FlexDirection;
    /** Reverses the direction of the column. It takes an array of `Breakpoints` or a `boolean` value. */
    isReverse?: Breakpoints[] | boolean;
    /** Defines the content justification of the column. It takes a `FlexJustify` or a `JustifyObject` type value. Its direction is dependent on the `direction` prop. */
    justify?: FlexJustify | JustifyObject;
    /** Sets the number of columns this column should offset to the left. It takes an `OffsetObject` or a `number` value. */
    offset?: OffsetObject | number;
    /** Sets the order this column should be in. It takes an `OrderObject` or a `number` value. */
    order?: OrderObject | number;
     /** Sets the padding added to both sides of the column. It takes a `Padding` or a `PaddingObject` type value. */
    padding?: Padding | PaddingObject;
    /** Sets the padding added to the left side of the column (Gets overwritten by padding). It takes a `Padding` or a `PaddingObject` type value. */
    paddingLeft?: Padding | PaddingObject;
    /** Sets the padding added to the right side of the column (Gets overwritten by padding). It takes a `Padding` or a `PaddingObject` type value. */
    paddingRight?: Padding | PaddingObject;
    /** TestId for cypress testing. */
    testId?: string;
}

/**
 * Col component that creates a grid column.
 *
 * The Col component is used to create a grid column. It provides a wide range of properties to control column
 * behavior and layout. The Col component uses Flexbox properties to achieve column layouts. It is important to note
 * that the Col component is designed to be used within a Row component to create a grid system.
 *
 * @param props              The props for the Col component.
 * @param props.align        Defines the content alignment of the column. It takes a `AlignObject` or a `FlexAlign` type value. Its direction is dependent on the `direction` prop.
 * @param props.as           Sets the html element type of the column. If you overwrite its styles with styled() it has to be forwardedAs.
 * @param props.children     The child elements to be rendered within the column.
 * @param props.className    Classname property to overwrite styles with styled().
 * @param props.direction    Sets the direction the column children should render ('row' or 'column'). It takes a `DirectionObject` or a `FlexDirection` type value.
 * @param props.isReverse    Reverses the direction of the column. It takes an array of `Breakpoints` or a `boolean` value.
 * @param props.justify      Defines the content justification of the column. It takes a `FlexJustify` or a `JustifyObject` type value. Its direction is dependent on the `direction` prop.
 * @param props.lg           Sets the number of columns the col takes in width on screens lg. (Can also be auto, max-content, min-content).
 * @param props.md           Sets the number of columns the col takes in width on screens md. (Can also be auto, max-content, min-content).
 * @param props.offset       Sets the number of columns this column should offset to the left. It takes an `OffsetObject` or a `number` value.
 * @param props.order        Sets the order this column should be in. It takes an `OrderObject` or a `number` value.
 * @param props.padding      Sets the padding added to both sides of the column. It takes a `Padding` or a `PaddingObject` type value.
 * @param props.paddingLeft  Sets the padding added to the left side of the column (Gets overwritten by padding.). It takes a `Padding` or a `PaddingObject` type value.
 * @param props.paddingRight Sets the padding added to the right side of the column (Gets overwritten by padding.). It takes a `Padding` or a `PaddingObject` type value.
 * @param props.sm           Sets the number of columns the col takes in width on screens sm. (Can also be auto, max-content, min-content).
 * @param props.testId       TestId for cypress testing.
 * @param props.xl           Sets the number of columns the col takes in width on screens xl. (Can also be auto, max-content, min-content).
 * @param props.xs           Sets the number of columns the col takes in width on screens xs. (Can also be auto, max-content, min-content).
 * @param props.xxl          Sets the number of columns the col takes in width on screens xxl. (Can also be auto, max-content, min-content).
 *
 * @returns The Col component.
 * @example
 * ```tsx
 * import {Col, Row} from '@nfq/react-grid';
 *
 * const App = () => (
 *     <Row>
 *         <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1}>
 *             <div>Column 1</div>
 *         </Col>
 *         <Col xs={12} sm={6} md={4} lg={3} xl={2} xxl={1}>
 *             <div>Column 2</div>
 *         </Col>
 *     </Row>
 * );
 * ```
 */
const Col = forwardRef<HTMLDivElement, WithChildren<ComponentProps & MouseEventHandler>>(({
    align,
    as,
    children,
    className,
    direction = 'column',
    isReverse,
    justify,
    offset,
    onClick,
    onContextMenu,
    onDoubleClick,
    onDrag,
    onDragEnd,
    onDragEnter,
    onDragLeave,
    onDragOver,
    onDrop,
    onMouseDown,
    onMouseEnter,
    onMouseLeave,
    onMouseMove,
    onMouseOut,
    onMouseOver,
    onMouseUp,
    onScroll,
    order,
    padding,
    paddingLeft,
    paddingRight,
    testId,
    ...sizes
}, ref) => {
    const classNames = [className, useDebug()];
    const handler = {
        onClick,
        onContextMenu,
        onDoubleClick,
        onDrag,
        onDragEnd,
        onDragEnter,
        onDragLeave,
        onDragOver,
        onDrop,
        onMouseDown,
        onMouseEnter,
        onMouseLeave,
        onMouseMove,
        onMouseOut,
        onMouseOver,
        onMouseUp,
        onScroll
    };

    return (
        <ColElement
            ref={ref}
            $align={align}
            $direction={direction}
            $isReverse={isReverse}
            $justify={justify}
            $offset={offset}
            $order={order}
            $padding={padding}
            $paddingLeft={paddingLeft}
            $paddingRight={paddingRight}
            $sizes={sizes}
            as={as}
            className={classNames.join(' ')}
            data-cy={testId}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...handler}
        >
            {children}
        </ColElement>
    );
});

Col.displayName = 'Col';

export {Col};

interface ColElementProps {
    $align?: AlignObject | FlexAlign;
    $direction?: DirectionObject | FlexDirection;
    $isReverse?: Breakpoints[] | boolean;
    $justify?: FlexJustify | JustifyObject;
    $offset?: OffsetObject | number;
    $order?: OrderObject | number;
    $padding?: Padding | PaddingObject;
    $paddingLeft?: Padding | PaddingObject;
    $paddingRight?: Padding | PaddingObject;
    $sizes: SizesObject;
}

/* eslint-disable indent */
const ColElement = styled.div<ColElementProps>`
    box-sizing: border-box;
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    max-width: 100%;

    ${mergeMediaQueries<ColElementProps>(
        calcPadding,
        calcSizes,
        calcOffset,
        calcAlignment('$order'),
        calcDirection('column'),
        calcAlignment('$align'),
        calcAlignment('$justify')
    )}
    ${debugCss('col')}
`;
/* eslint-enable indent */