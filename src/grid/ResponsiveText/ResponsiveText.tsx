/* eslint-disable @typescript-eslint/consistent-indexed-object-style */
import {useScreenSize} from '../../hooks/useScreenSize';

import {getResponsiveText} from './utils';

import type {Breakpoints} from '../../sharedTypes/breakpointTypes';

/**
 * Represents the properties for the `ResponsiveText` component.
 * This interface defines the text content that should be displayed based on different screen sizes.
 * The `xs` property is mandatory as it provides a default text for extra-small screens, while the other properties are optional.
 * By providing values for each screen size, you can ensure that the displayed text is optimized for readability across all devices.
 */
type BreakpointProps = {
    [key in Breakpoints]?: string;
};

/**
 * Renders responsive text based on the current screen size using breakpoint-based props.
 * This component takes a set of props where each key corresponds to a breakpoint (e.g., `xs`, `md`, `lg`)
 * and the value is the text to display at that breakpoint. It uses the current screen size from
 * `useScreenSize` and selects the best matching value using `getResponsiveText`.
 * It supports fallback behavior by cascading down the breakpoint list until a defined value is found.
 * If no matching or fallback value exists, it renders nothing or an empty string.
 *
 * @param props               The component props.
 * @param props.[Breakpoints] Text values for specific breakpoints (`xs`, `sm`, `md`, etc.).
 * @returns The resolved text string for the current screen size.
 *
 * @example
 * ```tsx
 * <ResponsiveText xs="Small" md="Medium" lg="Large" />
 * // On 'md' screens, renders: Medium
 * ```
 */
const ResponsiveText = ({...texts}: BreakpointProps) => {
    const screenSize = useScreenSize();
    const text = getResponsiveText(texts, screenSize);

    return text;
};

ResponsiveText.displayName = 'ResponsiveText';

export {ResponsiveText};