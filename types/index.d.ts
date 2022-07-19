import * as React from 'react';
import {
    ThemeProps,
    ThemedCssFunction,
    DefaultTheme,
} from 'styled-components';

/** Type constants */
const AUTO = 'auto';
const MAX_CONTENT = 'max-content';
const MIN_CONTENT = 'min-content';
const XS = 'xs';
const SM = 'sm';
const MD = 'md';
const LG = 'lg';
const XL = 'xl';
const XXL = 'xxl';

const FLEX_START = 'flex-start';
const FLEX_END = 'flex-end';
const FLEX_CENTER = 'center';
const FLEX_INHERIT = 'inherit';
const FLEX_INITIAL = 'initial';
const FLEX_UNSET = 'unset';
const FLEX_ALIGN_BASELINE = 'baseline';
const FLEX_ALIGN_STRETCH = 'stretch';
const FLEX_JUSTIFY_BETWEEN = 'space-between';
const FLEX_JUSTIFY_AROUND = 'space-around';
const FLEX_JUSTIFY_EVEN = 'space-evenly';

const FLEX_DIR_ROW = 'row';
const FLEX_DIR_COL = 'column';

/** Type definitions */
type tAuto = typeof AUTO;
type tStringSizes = typeof AUTO | typeof MAX_CONTENT | typeof MIN_CONTENT;
type tBreakpoints = typeof XS | typeof SM | typeof MD | typeof LG | typeof XL | typeof XXL;
type tAlign = typeof FLEX_START | typeof FLEX_END | typeof FLEX_CENTER | typeof FLEX_ALIGN_BASELINE | typeof FLEX_ALIGN_STRETCH | typeof FLEX_INHERIT | typeof FLEX_INITIAL | typeof FLEX_UNSET;
type tJustify = typeof FLEX_START | typeof FLEX_END | typeof FLEX_CENTER | typeof FLEX_JUSTIFY_BETWEEN | typeof FLEX_JUSTIFY_AROUND | typeof FLEX_JUSTIFY_EVEN | typeof FLEX_INHERIT | typeof FLEX_INITIAL | typeof FLEX_UNSET;
type tFlexDirection = typeof FLEX_DIR_ROW | typeof FLEX_DIR_COL;

/** Option interfaces */
interface IAlignOptions {
    /** Alignment mode for xs screen size */
    xs?: tAlign;
    /** Alignment mode for sm screen size */
    sm?: tAlign;
    /** Alignment mode for md screen size */
    md?: tAlign;
    /** Alignment mode for lg screen size */
    lg?: tAlign;
    /** Alignment mode for xl screen size */
    xl?: tAlign;
    /** Alignment mode for xxl screen size */
    xxl?: tAlign;
}

interface IDirectionOptions {
    /** Col direction for xs screens */
    xs?: tFlexDirection;
    /** Col direction for sm screens */
    sm?: tFlexDirection;
    /** Col direction for md screens */
    md?: tFlexDirection;
    /** Col direction for lg screens */
    lg?: tFlexDirection;
    /** Col direction for xl screens */
    xl?: tFlexDirection;
    /** Col direction for xxl screens */
    xxl?: tFlexDirection;
}

interface IJustifyOptions {
    /** Justification mode for xs screen size */
    xs?: tJustify;
    /** Justification mode for sm screen size */
    sm?: tJustify;
    /** Justification mode for md screen size */
    md?: tJustify;
    /** Justification mode for lg screen size */
    lg?: tJustify;
    /** Justification mode for xl screen size */
    xl?: tJustify;
    /** Justification mode for xxl screen size */
    xxl?: tJustify;
}

interface IOffsetOptions {
    /** Offset number for xs screens */
    xs?: number;
    /** Offset number for sm screens */
    sm?: number;
    /** Offset number for md screens */
    md?: number;
    /** Offset number for lg screens */
    lg?: number;
    /** Offset number for xl screens */
    xl?: number;
    /** Offset number for xxl screens */
    xxl?: number;
}

interface IOrderOptions {
    /** Order number for xs screens */
    xs?: number;
    /** Order number for sm screens */
    sm?: number;
    /** Order number for md screens */
    md?: number;
    /** Order number for lg screens */
    lg?: number;
    /** Order number for xl screens */
    xl?: number;
    /** Order number for xxl screens */
    xxl?: number;
}

interface IHeightOptions {
    /** Spacer height for xs screens */
    xs?: number;
    /** Spacer height for sm screens */
    sm?: number;
    /** Spacer height for md screens */
    md?: number;
    /** Spacer height for lg screens */
    lg?: number;
    /** Spacer height for xl screens */
    xl?: number;
    /** Spacer height for xxl screens */
    xxl?: number;
}

interface IMaxHeightOptions {
    /** Spacer max height expand for xs screens */
    xs?: number;
    /** Spacer max height expand for sm screens */
    sm?: number;
    /** Spacer max height expand for md screens */
    md?: number;
    /** Spacer max height expand for lg screens */
    lg?: number;
    /** Spacer max height expand for xl screens */
    xl?: number;
    /** Spacer max height expand for xxl screens */
    xxl?: number;
}

interface IMaxWidthOptions {
    /** Spacer max width expand for xs screens */
    xs?: number;
    /** Spacer max width expand for sm screens */
    sm?: number;
    /** Spacer max width expand for md screens */
    md?: number;
    /** Spacer max width expand for lg screens */
    lg?: number;
    /** Spacer max width expand for xl screens */
    xl?: number;
    /** Spacer max width expand for xxl screens */
    xxl?: number;
}

interface IWidthOptions {
    /** Spacer width for xs screens */
    xs?: number;
    /** Spacer width for sm screens */
    sm?: number;
    /** Spacer width for md screens */
    md?: number;
    /** Spacer width for lg screens */
    lg?: number;
    /** Spacer width for xl screens */
    xl?: number;
    /** Spacer width for xxl screens */
    xxl?: number;
}

interface IPaddingOptions {
    /** Extra padding width for xs screens with css unit */
    xs?: string;
    /** Extra padding width for sm screens with css unit */
    sm?: string;
    /** Extra padding width for md screens with css unit */
    md?: string;
    /** Extra padding width for lg screens with css unit */
    lg?: string;
    /** Extra padding width for xl screens with css unit */
    xl?: string;
    /** Extra padding width for xxl screens with css unit */
    xxl?: string;
}

interface IDefaultProps {
    as?: string,
    /** React children */
    children?: React.ReactNode,
    /** Classname property to overwrite styles with styled() */
    className?: string,
    /** TestId for cypress testing. */
    testId?: string
}

interface IConfig {
    /** Defines the base spacing for the Spacer component */
    baseSpacing: number;
    /** The breakpoint sizes in px for the different screen classes */
    breakpoints: Record<tBreakpoints, number>;
    /** The the column number available for the different screen classes */
    columns: Record<tBreakpoints, number>;
    /** The the container width for the different screen classes */
    container: Record<tBreakpoints, number | 'fluid'>;
    /** Debug object to define different colors for the 3 components */
    debug: {
        /** The Debug colors for the Col component */
        col: {
            /** The background color for Col elements in debug mode. */
            background?: string,
            /** The outline color for Col elements in debug mode. */
            outline?: string,
            /** The padding color for Col elements in debug mode. */
            padding?: string
        },
        /** The Debug colors for the Container component */
        container: {
            /** The background color for Container elements in debug mode. */
            background?: string,
            /** The outline color for Container elements in debug mode. */
            outline?: string,
        },
        /** The Debug colors for the Row component */
        row: {
            /** The background color for Row elements in debug mode. */
            background?: string,
            /** The outline color for Row elements in debug mode. */
            outline?: string,
        }
    }
    /** The the gutter width for the different screen classes */
    gutterWidth: Record<tBreakpoints, number>;
    /** The default media type all media queries should use. (Default: only screen) */
    mediaQuery: string;
    /** The outer container padding width for all screen sizes */
    paddingWidth: Record<tBreakpoints, number>;
}

/** Property interfaces */
interface IColProps extends IDefaultProps {
    /** Sets the number of columns the col gets in width on screens xs. (Can also be auto) */
    xs?: number | tStringSizes;
    /** Sets the number of columns the col gets in width on screens sm. (Can also be auto) */
    sm?: number | tStringSizes;
    /** Sets the number of columns the col gets in width on screens md. (Can also be auto) */
    md?: number | tStringSizes;
    /** Sets the number of columns the col gets in width on screens lg. (Can also be auto) */
    lg?: number | tStringSizes;
    /** Sets the number of columns the col gets in width on screens xl. (Can also be auto) */
    xl?: number | tStringSizes;
    /** Sets the number of columns the col gets in width on screens xxl. (Can also be auto) */
    xxl?: number | tStringSizes;
    /** Sets the direction the column children should render ('row' or 'column') */
    direction?: tFlexDirection | IDirectionOptions;
    /** Sets the extra padding added to both sides of the column */
    extraPadding?: string | IPaddingOptions;
    /** Sets the extra padding added to the left side of the column */
    extraPaddingLeft?: string | IPaddingOptions;
    /** Sets the extra padding added to the right side of the column */
    extraPaddingRight?: string | IPaddingOptions;
    /** Sets the number of columns this column should offset to the left */
    offset?: number | IOffsetOptions;
    /** Sets the order this column should be in */
    order?: number | IOrderOptions;
    /** Reverses the direction of the column */
    reverse?: boolean | tBreakpoints[];
    /** Content alignment (like flex alignment). Its direction is dependent on the direction prop. */
    align?: tAlign | IAlignOptions;
    /** Content justification (like flex justification). Its direction is dependent on the direction prop. */
    justify?: tJustify | IJustifyOptions;
    /** Removes the gutter gap in the grid. */
    noGutter?: boolean;
}

interface IContainerProps extends IDefaultProps {
    /** Makes the container fluid. (Should always be set if the container has an container as parent already) */
    fluid?: boolean | tBreakpoints[];
}

type IConfigProps = ThemeProps<{nfqgrid: Partial<IConfig>}>;

interface IHiddenProps {
    /** Indicates that past content will only be hidden on the screen xs */
    xs?: boolean;
    /** Indicates that past content will only be hidden on the screen sm */
    sm?: boolean;
    /** Indicates that past content will only be hidden on the screen md */
    md?: boolean;
    /** Indicates that past content will only be hidden on the screen lg */
    lg?: boolean;
    /** Indicates that past content will only be hidden on the screen xl */
    xl?: boolean;
    /** Indicates that past content will only be hidden on the screen xxl */
    xxl?: boolean;
    /** Tells the component to render the html even if hidden */
    isLoadingHtml?: boolean;
}

interface IVisibleProps {
    /** Indicates that past content will only be visible on the screen xs */
    xs?: boolean;
    /** Indicates that past content will only be visible on the screen sm */
    sm?: boolean;
    /** Indicates that past content will only be visible on the screen md */
    md?: boolean;
    /** Indicates that past content will only be visible on the screen lg */
    lg?: boolean;
    /** Indicates that past content will only be visible on the screen xl */
    xl?: boolean;
    /** Indicates that past content will only be visible on the screen xxl */
    xxl?: boolean;
    /** Tells the component to render the html even if hidden */
    isLoadingHtml?: boolean;
}

interface ISpacerProps {
    /** Tells the spacer if it should behave like an inline element (Good for in text spacings) */
    isInline?: boolean | tBreakpoints[];
    /** If used in an flex container this defines the max horizontal spacing size. Wants an multiplication factor thats used with baseSpacing */
    maxX?: number | IMaxWidthOptions;
    /** If used in an flex container this defines the max vertical spacing size. Wants an multiplication factor thats used with baseSpacing */
    maxY?: number | IMaxHeightOptions;
    /** Defines the horizontal spacing size. (In an flexbox it defines the base) Wants an multiplication factor thats used with baseSpacing */
    x?: number | IWidthOptions;
    /** Defines the horizontal spacing size. (In an flexbox it defines the base) Wants an multiplication factor thats used with baseSpacing */
    y?: number | IHeightOptions;
}

interface IRowProps extends IDefaultProps {
    /** Content alignment (like flex alignment). Its direction is dependent on the direction prop. */
    align?: tAlign | IAlignOptions;
    /** Sets the direction the row children should render ('row' or 'column') */
    direction?: tFlexDirection | IDirectionOptions;
    /** Content alignment (like flex alignment). Its direction is dependent on the direction prop. */
    justify?: tJustify | IJustifyOptions;
    /** Sets the order this row should be in its parent container */
    order?: number | IOrderOptions;
    /** Defines if the row will wrap or not */
    noWrap?: boolean | tBreakpoints[];
    /** Reverses the direction of the row */
    reverse?: boolean | tBreakpoints[];
}

interface IScreenClassRenderProps {
    /** The function that will be rendered receiving the current screen as a parameter */
    render: (screen: tBreakpoints) => React.ReactNode;
}

export const ScreenClassContext: React.ContextType<tBreakpoints>;

export function getConfig(theme: IConfigProps): IConfig;
export function media(theme: IConfigProps, screenSize: tBreakpoints): ThemedCssFunction<DefaultTheme>;
export function useConfig(): IConfigProps;
export function useScreenClass(): tBreakpoints;

export class Col extends React.Component<IColProps, any>{};
export class Container extends React.Component<IContainerProps, any>{};
export class Hidden extends React.Component<IHiddenProps, any>{};
export class Row extends React.Component<IRowProps, any>{};
export class ScreenBadge extends React.Component<any, any>{};
export class ScreenClassProvider extends React.Component<any, any>{};
export class ScreenClassRender extends React.Component<IScreenClassRenderProps, any>{};
export class Spacer extends React.Component<ISpacerProps>{};
export class Visible extends React.Component<IVisibleProps>{};