/* eslint-disable no-undefined */
import type {ElementType} from 'react';
import React, {forwardRef} from 'react';

import styled from 'styled-components';

import {useDebug} from '../utils/hooks/useDebug';
import {
    calcAlignmentProps,
    calcDirection,
    calcGap,
    debugCss,
    mergeMediaQueries
} from '../utils/styleHelpers';

import type {
    AlignObject,
    Breakpoints,
    DirectionObject,
    FlexAlign,
    FlexDirection,
    FlexGap,
    FlexJustify,
    GapObject,
    JustifyObject,
    MouseEventHandler,
    OrderObject,
    WithChildren
} from '../sharedTypes';

interface ComponentProps {
    /** Defines the content alignment of the row. It takes a `AlignObject` or a `FlexAlign` type value. Its direction is dependent on the `direction` prop. */
    align?: AlignObject | FlexAlign;
    /** Sets the html element type of the row. If you overwrite its styles with styled() it has to be forwardedAs. */
    as?: ElementType;
    /** Classname property to overwrite styles with styled(). */
    className?: string;
    /** Sets the direction the row children should render ('row' or 'column'). It takes a `DirectionObject` or a `FlexDirection` type value. */
    direction?: DirectionObject | FlexDirection;
    /** Removes the gap between columns in the grid. Can be also no-column and no-row which deactivates the gap for either direction. It takes a `FlexGap` or a `GapObject` type value. */
    hasNoGap?: FlexGap | GapObject;
    /** Defines if the row will wrap or not. It takes an array of `Breakpoints` or a `boolean` value. */
    hasNoWrap?: Breakpoints[] | boolean;
    /** Reverses the direction of the row. It takes an array of `Breakpoints` or a `boolean` value. */
    isReverse?: Breakpoints[] | boolean;
    /** Defines the content justification of the row. It takes a `FlexJustify` or a `JustifyObject` type value. Its direction is dependent on the `direction` prop. */
    justify?: FlexJustify | JustifyObject;
    /** Sets the order this row should be in. It takes an `OrderObject` or a `number` value. */
    order?: OrderObject | number;
    /** TestId for cypress testing. */
    testId?: string;
}

/**
 * Row component that creates a grid row.
 *
 * This component creates a row within a grid system. It can accept multiple props to configure the row's layout.
 *
 * @param props           The props for the Row component.
 * @param props.align     Defines the content alignment of the row. It takes a `AlignObject` or a `FlexAlign` type value. Its direction is dependent on the `direction` prop.
 * @param props.as        Sets the html element type of the row. If you overwrite its styles with styled() it has to be forwardedAs.
 * @param props.children  The child elements to be rendered within the row.
 * @param props.className Classname property to overwrite styles with styled().
 * @param props.direction Sets the direction the row children should render ('row' or 'column'). It takes a `DirectionObject` or a `FlexDirection` type value.
 * @param props.hasNoGap  Removes the gap between columns in the grid. Can be also no-column and no-row which deactivates the gap for either direction. It takes a `FlexGap` or a `GapObject` type value.
 * @param props.hasNoWrap Defines if the row will wrap or not. It takes an array of `Breakpoints` or a `boolean` value.
 * @param props.isReverse Reverses the direction of the row. It takes an array of `Breakpoints` or a `boolean` value.
 * @param props.justify   Defines the content justification of the row. It takes a `FlexJustify` or a `JustifyObject` type value. Its direction is dependent on the `direction` prop.
 * @param props.order     Sets the order this row should be in. It takes an `OrderObject` or a `number` value.
 * @param props.testId    TestId for cypress testing.
 *
 * @returns The Row component.
 * @example
 * ```tsx
 * import {Col, Row} from '@nfq/react-grid';
 *
 * const App = () => (
 *     <Row hasNoGap>
 *         <Col>
 *             <div>Column 1</div>
 *         </Col>
 *         <Col>
 *             <div>Column 2</div>
 *         </Col>
 *     </Row>
 * );
 * ```
 */
const Row = forwardRef<HTMLDivElement, WithChildren<ComponentProps & MouseEventHandler>>(({
    align,
    as,
    children,
    className,
    direction,
    hasNoGap,
    hasNoWrap,
    isReverse,
    justify,
    order,
    testId,
    ...handler
}, ref) => {
    const classNames = [className, useDebug()];

    return (
        <RowElement
            ref={ref}
            $align={align}
            $direction={direction}
            $hasNoGap={hasNoGap}
            $hasNoWrap={hasNoWrap}
            $isReverse={isReverse}
            $justify={justify}
            $order={order}
            as={as}
            className={classNames.join(' ')}
            data-cy={testId}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...handler}
        >
            {children}
        </RowElement>
    );
});

Row.displayName = 'Row';
Row.defaultProps = {
    align: undefined,
    as: undefined,
    children: undefined,
    className: undefined,
    direction: 'row',
    hasNoGap: false,
    hasNoWrap: false,
    isReverse: false,
    justify: undefined,
    order: undefined,
    testId: undefined
};

export default Row;

interface RowElementProps {
    $align?: AlignObject | FlexAlign;
    $direction?: DirectionObject | FlexDirection;
    $hasNoGap?: FlexGap | GapObject;
    $hasNoWrap?: Breakpoints[] | boolean;
    $isReverse?: Breakpoints[] | boolean;
    $justify?: FlexJustify | JustifyObject;
    $order?: OrderObject | number;
}

/* eslint-disable indent */
const RowElement = styled.div<RowElementProps>`
    box-sizing: border-box;
    display: flex;
    flex: 1 1 auto;
    flex-wrap: wrap;

    ${mergeMediaQueries<RowElementProps>(
        calcGap,
        calcDirection('row'),
        calcAlignmentProps('$order'),
        calcAlignmentProps('$align'),
        calcAlignmentProps('$justify')
    )}
    ${debugCss('row')}
`;
/* eslint-enable indent */