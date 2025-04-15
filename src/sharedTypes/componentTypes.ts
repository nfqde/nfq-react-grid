import type {MouseEvent, ReactNode, UIEvent} from 'react';

import type {Breakpoints} from './breakpointTypes';

export type WithChildren<T = object> = T & {
    /** The react elements children. Has to be an ReactNode. */
    children?: ReactNode;
};

export type SkeletonStore = {
    default: {
        count: number;
        id: string;
    }[];
    [key: string]: {
        count: number;
        id: string;
    }[];
};

export type FlexAlign = 'baseline' | 'center' | 'flex-end' | 'flex-start' | 'inherit' | 'initial' | 'stretch' | 'unset';
export type FlexJustify = 'center' | 'flex-end' | 'flex-start' | 'inherit' | 'initial' | 'space-around'
    | 'space-between' | 'space-evenly' | 'unset';
export type FlexDirection = 'column' | 'row';
export type FlexGap = boolean | 'no-column' | 'no-row';
export type PaddingExt = 'em' | 'px' | 'rem' | 'vh' | 'vw';
export type StringSizes = 'auto' | 'max-content' | 'min-content';
export type Padding = `${number}${PaddingExt}`;
// eslint-disable-next-line @typescript-eslint/consistent-indexed-object-style
export type CombineToObject<K extends number | string | symbol, T> = {
    [P in K]?: T;
};

export type AlignObject = CombineToObject<Breakpoints, FlexAlign>;
export type BreakpointObject = CombineToObject<Breakpoints, boolean>;
export type DirectionObject = CombineToObject<Breakpoints, FlexDirection>;
export type GapObject = CombineToObject<Breakpoints, FlexGap>;
export type JustifyObject = CombineToObject<Breakpoints, FlexJustify>;
export type PaddingObject = CombineToObject<Breakpoints, Padding>;
export type OffsetObject = CombineToObject<Breakpoints, number>;
export type OrderObject = CombineToObject<Breakpoints, number>;
export type SpacerObject = CombineToObject<Breakpoints, number>;
export type SizesObject = CombineToObject<Breakpoints, StringSizes | number>;

export type MouseEventHandler = {
    /** A function that will be invoked when the user clicks the element with the mouse. */
    onClick?(event: MouseEvent<HTMLElement>): void;
    /** A function that will be invoked when the user right-clicks the element with the mouse. */
    onContextMenu?(event: MouseEvent<HTMLElement>): void;
    /** A function that will be invoked when the user double-clicks the element with the mouse. */
    onDoubleClick?(event: MouseEvent<HTMLElement>): void;
    /** A function that will be invoked when the user starts dragging the element with the mouse. */
    onDrag?(event: MouseEvent<HTMLElement>): void;
    /** A function that will be invoked when the user stops dragging the element with the mouse. */
    onDragEnd?(event: MouseEvent<HTMLElement>): void;
    /** A function that will be invoked when the user drags another element over this element. */
    onDragEnter?(event: MouseEvent<HTMLElement>): void;
    /** A function that will be invoked when the user stops dragging another element over this element. */
    onDragLeave?(event: MouseEvent<HTMLElement>): void;
    /** A function that will be invoked when the user is dragging another element over this element. */
    onDragOver?(event: MouseEvent<HTMLElement>): void;
    /** A function that will be invoked when the user is dropping another element on this element. */
    onDrop?(event: MouseEvent<HTMLElement>): void;
    /** A function that will be invoked when the user presses a mouse button over the element. */
    onMouseDown?(event: MouseEvent<HTMLElement>): void;
    /** A function that will be invoked when the mouse cursor enters the element. */
    onMouseEnter?(event: MouseEvent<HTMLElement>): void;
    /** A function that will be invoked when the mouse cursor leaves the element. */
    onMouseLeave?(event: MouseEvent<HTMLElement>): void;
    /** A function that will be invoked when the mouse cursor moves over the element. */
    onMouseMove?(event: MouseEvent<HTMLElement>): void;
    /** A function that will be invoked when the mouse cursor moves out of the element. */
    onMouseOut?(event: MouseEvent<HTMLElement>): void;
    /** A function that will be invoked when the mouse cursor moves over the element. */
    onMouseOver?(event: MouseEvent<HTMLElement>): void;
    /** A function that will be invoked when the user releases a mouse button over the element. */
    onMouseUp?(event: MouseEvent<HTMLElement>): void;
    /** A function that will be invoked when the user scrolls inside this element. */
    onScroll?(event: UIEvent<HTMLElement>): void;
};