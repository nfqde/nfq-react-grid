import type {Breakpoints, SmartBreakpoints, UserConfig} from '../sharedTypes/breakpointTypes';
import type {IsFullyOptional} from '../sharedTypes/helperTypes';
import type {PartialExceptFirstFromTuple} from '../sharedTypes/tupleTypes';

/**
 * Represents an RGB color string in the format `rgb(255, 255, 255)`.
 */
type RGB = `rgb(${number}, ${number}, ${number})`;
/**
 * Represents an RGBA color string in the format `rgba(255, 255, 255, 1)`.
 */
type RGBA = `rgba(${number}, ${number}, ${number}, ${number})`;
/**
 * Represents a HEX color string, such as `#ffffff` or `#fff`.
 */
type HEX = `#${string}`;
/**
 * A union type representing any valid CSS color string in HEX, RGB, or RGBA format.
 */
type Color = HEX | RGB | RGBA;

/**
 * Defines a single skeleton loading animation style variant.
 * It includes customization for animation behavior, border radius, and color scheme.
 * The color properties allow customization of the base color, highlight, and base highlight for shimmer effects.
 */
type SkeletonVariant = {
    /**
     * Configuration for the skeleton animation.
     */
    animation: {
        /**
         * Delay in milliseconds before the animation starts.
         */
        delay: number;
        /**
         * Direction in which the skeleton animation should play. Can be 'ltr' (left-to-right) or 'rtl' (right-to-left).
         */
        direction: 'normal' | 'reverse';
        /**
         * Duration of the skeleton animation cycle in milliseconds.
         */
        duration: number;
    };
    /**
     * The border radius in pixels applied to the skeleton element.
     */
    borderRadius: number;
    /**
     * The color palette used by the skeleton loader.
     */
    colors: {
        /**
         * The base background color of the skeleton.
         */
        base: Color;
        /**
         * A lighter version of the base color used for shimmer highlight.
         */
        baseHighlight: Color;
        /**
         * The active shimmer or highlight color.
         */
        highlight: Color;
    };
};

/**
 * Defines responsive breakpoint values, allowing optional or required breakpoints based on utility types.
 * This type helps define whether a `breakpoints` property should be optional or required
 * based on whether all values of `SmartBreakpoints` are optional.
 */
type BreakpointsProp<
    BreakpointsTuple extends string[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
> = IsFullyOptional<SmartBreakpoints<BreakpointsTuple>> extends true
    ? {breakpoints?: SmartBreakpoints<BreakpointsTuple>}
    : {breakpoints: SmartBreakpoints<BreakpointsTuple>};

/**
 * The base configuration for layout and visual design system settings.
 * This interface defines the core layout values like column configurations, container widths,
 * and optional debug visualizations. It also supports skeleton loading styles with multiple variants.
 */
interface ConfigBase<
    SkeletonStyles extends string,
    BreakpointsTuple extends string[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
> {
    /**
     * The base spacing unit used across layout elements.
     */
    baseSpacing?: number;
    /**
     * The horizontal spacing between columns for each breakpoint.
     */
    columnGap?: PartialExceptFirstFromTuple<BreakpointsTuple, Breakpoints>;
    /**
     * Number of columns defined per breakpoint.
     */
    columns?: PartialExceptFirstFromTuple<BreakpointsTuple, Breakpoints>;
    /**
     * The width of the container per breakpoint, can be a fixed number or `fluid`.
     */
    container: Record<Breakpoints, number | 'fluid'>;
    /**
     * Padding inside containers per breakpoint.
     */
    containerPadding?: PartialExceptFirstFromTuple<BreakpointsTuple, Breakpoints>;
    /**
     * Debug settings to visually outline various grid components in the UI.
     */
    debug?: {
        /**
         * Debug styles for individual columns.
         */
        col?: {
            /**
             * Debug styles for the background color of columns.
             */
            background?: Color;
            /**
             * Debug styles for the outline color of columns.
             */
            outline?: Color;
            /**
             * Debug styles for the padding color of columns.
             */
            padding?: Color;
        };
        /**
         * Debug styles for the container element.
         */
        container?: {
            /**
             * Debug styles for the background color of the container.
             */
            background?: Color;
            /**
             * Debug styles for the outline color of the container.
             */
            outline?: Color;
            /**
             * Debug styles for the padding color of the container.
             */
            padding?: Color;
        };
        /**
         * Debug styles for rows in the grid layout.
         */
        row?: {
            /**
             * Debug styles for the background color of rows.
             */
            background?: Color;
            /**
             * Debug styles for the outline color of rows.
             */
            outline?: Color;
            /**
             * Debug styles for the padding color of rows.
             */
            padding?: Color;
        };
        /**
         * Debug styles for spacer elements.
         */
        spacer?: {
            /**
             * Debug styles for the background color of spacers.
             */
            background?: Color;
            /**
             * Debug styles for the outline color of spacers.
             */
            outline?: Color;
            /**
             * Debug styles for the padding color of spacers.
             */
            padding?: Color;
        };
    };
    /**
     * A set of skeleton loading styles, allowing per-theme customization.
     */
    skeleton?: Record<SkeletonStyles, SkeletonVariant>;
    /**
     * The default skeleton style key to use (e.g., 'light' or 'dark').
     */
    skeletonDefault?: SkeletonStyles;
}

/**
 * The complete configuration type for the layout system.
 * Combines base configuration with breakpoint-specific settings.
 * It offers strong typing for responsive values, skeleton styles, debugging helpers, and layout spacing.
 */
export type Config<
    SkeletonStyles extends string,
    BreakpointsTuple extends string[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']
> = ConfigBase<SkeletonStyles, BreakpointsTuple> & BreakpointsProp<BreakpointsTuple>;

type ExtractConfig<T> = T extends {UserConfig: {Config: infer B}} ? B : Required<Config<'dark' | 'light'>>;

export type ExtractedConfig = ExtractConfig<UserConfig>;