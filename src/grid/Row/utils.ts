import {configCache} from '../../utils/cache';

import type {FlexGap, GapObject} from '../../sharedTypes/componentTypes';

interface CalcGapProps {
    $hasNoGap?: FlexGap | GapObject;
}

/**
 * Calculates the flex gap CSS string for a given theme and gap configuration.
 *
 * The function calculates the gap based on the `columnGap` and `rowGap` properties of the theme and the gap
 * configuration provided. It generates CSS rules for each screen size defined in the theme, based on the gap
 * configuration, and returns a string for each size.
 *
 * @param props           The styled-components props object.
 * @param props.$hasNoGap The gap configuration object or boolean value that specifies if the gap should be disabled.
 * @param props.theme     The styled-components theme.
 *
 * @returns An array that contains the flex gap css strings for each screen size for the given configuration.
 */
export const calcGap = ({$hasNoGap = false}: CalcGapProps) => {
    const {breakpointOrder} = configCache.get('breakpointConfig')!;

    if (typeof $hasNoGap === 'boolean' || typeof $hasNoGap === 'string') {
        // eslint-disable-next-line no-param-reassign
        $hasNoGap = {xs: $hasNoGap};
    }

    let lastGapConfig: FlexGap;
    let lastColumnGapVar: string;
    let lastRowGap: string;
    const mediaQuery = breakpointOrder.map(screenSize => {
        // eslint-disable-next-line security/detect-object-injection
        const gapConfig = $hasNoGap[screenSize];

        if (gapConfig !== undefined) {
            lastGapConfig = gapConfig;
        }

        const columnGapVar = `--column-gap: ${((gapConfig ?? lastGapConfig) === 'no-column' || (gapConfig ?? lastGapConfig) === true) ? '0px' : 'var(--nfq-grid-column-gap)'};`;
        const columnGap = 'column-gap: var(--column-gap);';
        const rowGap = `row-gap: ${((gapConfig ?? lastGapConfig) === 'no-row' || (gapConfig ?? lastGapConfig) === true) ? '0px' : 'var(--nfq-grid-column-gap)'};`;

        if (lastColumnGapVar !== columnGapVar || lastRowGap !== rowGap) {
            lastColumnGapVar = columnGapVar;
            lastRowGap = rowGap;

            return `
                ${columnGapVar}
                ${columnGap}
                ${rowGap}
            `;
        }

        return null;
    });

    return mediaQuery;
};