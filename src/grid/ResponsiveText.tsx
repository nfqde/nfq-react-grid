import {useScreenSize} from '../utils/hooks/useScreenSize';
import {getResponsiveText} from '../utils/lib';

/**
 * Represents the properties for the `ResponsiveText` component.
 * This interface defines the text content that should be displayed based on different screen sizes.
 * The `xs` property is mandatory as it provides a default text for extra-small screens, while the other properties are optional.
 * By providing values for each screen size, you can ensure that the displayed text is optimized for readability across all devices.
 */
interface ComponentProps {
    /**
     * The text to display on large screens.
     */
    lg?: string | null;
    /**
     * The text to display on medium screens.
     */
    md?: string | null;
    /**
     * The text to display on small screens.
     */
    sm?: string | null;
    /**
     * The text to display on extra-large screens.
     */
    xl?: string | null;
    /**
     * The text to display on extra-small screens. This property is mandatory.
     */
    xs: string;
    /**
     * The text to display on extra-extra-large screens.
     */
    xxl?: string | null;
}

/**
 * A responsive text component that displays different text based on the current screen size.
 * This component is designed to provide flexibility in displaying text that is tailored to different screen sizes,
 * ensuring that the content is optimized for readability and user experience across all devices.
 *
 * @param props     The component props.
 * @param props.lg  The text to display on large screens.
 * @param props.md  The text to display on medium screens.
 * @param props.sm  The text to display on small screens.
 * @param props.xl  The text to display on extra-large screens.
 * @param props.xs  The text to display on extra-small screens. This is Mandatory as it is the default text.
 * @param props.xxl The text to display on extra-extra-large screens.
 * @returns The appropriate text based on the current screen size.
 *
 * @example
 * ```tsx
 * <ResponsiveText
 *     xs="Extra Small Screen Text"
 *     sm="Small Screen Text"
 *     md="Medium Screen Text"
 *     lg="Large Screen Text"
 *     xl="Extra Large Screen Text"
 *     xxl="Extra Extra Large Screen Text"
 * />
 * ```
 */
const ResponsiveText = ({lg = null, md = null, sm = null, xl = null, xs, xxl = null}: ComponentProps) => {
    const screenSize = useScreenSize();
    const text = getResponsiveText({lg, md, sm, xl, xs, xxl}, screenSize);

    return text;
};

ResponsiveText.displayName = 'ResponsiveText';

export default ResponsiveText;