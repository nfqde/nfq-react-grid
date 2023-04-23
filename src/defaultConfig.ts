import type {Breakpoints} from './sharedTypes';

type MediaLogic = 'not' | 'only';
type MediaDevice = 'print' | 'screen';
type RGB = `rgb(${number}, ${number}, ${number})`;
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
type HEX = `#${string}`;
type Color = HEX | RGB | RGBA;

export interface Config {
    /** Defines the base spacing for the Spacer component. */
    baseSpacing?: number;
    /** The breakpoint sizes in px for the different screen classes. */
    breakpoints?: Record<Breakpoints, number>;
    /** The the gutter width for the different screen classes. */
    columnGap?: Partial<Record<Breakpoints, number>>;
    /** The the column number available for the different screen classes. */
    columns?: Partial<Record<Breakpoints, number>>;
    /** The the container width for the different screen classes. */
    container?: Partial<Record<Breakpoints, number | 'fluid'>>;
    /** The outer container padding width for all screen sizes. */
    containerPadding?: Partial<Record<Breakpoints, number>>;
    /** Debug object to define different colors for the 3 components. */
    debug?: {
        /** The Debug colors for the Col component. */
        col?: {
            /** The background color for Col elements in debug mode. */
            background?: Color;
            /** The outline color for Col elements in debug mode. */
            outline?: Color;
            /** The padding color for Col elements in debug mode. */
            padding?: Color;
        };
        /** The Debug colors for the Container component. */
        container?: {
            /** The background color for Container elements in debug mode. */
            background?: Color;
            /** The outline color for Container elements in debug mode. */
            outline?: Color;
            /** The padding color for Col elements in debug mode. */
            padding?: Color;
        };
        /** The Debug colors for the Row component. */
        row?: {
            /** The background color for Row elements in debug mode. */
            background?: Color;
            /** The outline color for Row elements in debug mode. */
            outline?: Color;
            /** The padding color for Col elements in debug mode. */
            padding?: Color;
        };
        /** The Debug colors for the Row component. */
        spacer?: {
            /** The background color for Row elements in debug mode. */
            background?: Color;
            /** The outline color for Row elements in debug mode. */
            outline?: Color;
            /** The padding color for Col elements in debug mode. */
            padding?: Color;
        };
    };
    /** The default media type all media queries should use. (Default: only screen). */
    mediaQuery?: MediaDevice | `${MediaLogic} ${MediaDevice}, ${MediaDevice}` | `${MediaLogic} ${MediaDevice}`;
}

export const CONF_KEY = 'nfqgrid';
export const DIMENSIONS: Breakpoints[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
export const DEFAULT_CONF: Config = {
    baseSpacing: 0.5,
    breakpoints: {
        lg: 992,
        md: 769,
        sm: 576,
        xl: 1200,
        xs: 0,
        xxl: 1600
    },
    columnGap: {
        lg: 20,
        md: 20,
        sm: 20,
        xl: 20,
        xs: 20,
        xxl: 20
    },
    columns: {
        lg: 12,
        md: 12,
        sm: 12,
        xl: 12,
        xs: 12,
        xxl: 12
    },
    container: {
        lg: 1440,
        md: 'fluid',
        sm: 'fluid',
        xl: 1440,
        xs: 'fluid',
        xxl: 1440
    },
    containerPadding: {
        lg: 10,
        md: 10,
        sm: 10,
        xl: 10,
        xs: 10,
        xxl: 10
    },
    debug: {
        col: {
            background: '#9a67cb',
            outline: '#ffffff',
            padding: '#c2cf8a'
        },
        container: {
            background: '#5901ad40',
            outline: '#ffffff',
            padding: '#c2cf8a'
        },
        row: {
            background: '#5901ad40',
            outline: '#ffffff',
            padding: '#c2cf8a'
        },
        spacer: {
            background: '#f9cc9d',
            outline: '#ffffff',
            padding: '#c2cf8a'
        }
    },
    mediaQuery: 'only screen'
};