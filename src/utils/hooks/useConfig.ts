import {useMemo} from 'react';

import {useTheme} from 'styled-components';

import {getConfig} from '../lib';

import type {Theme} from 'src/sharedTypes';

/**
 * Returns the complete grid configuration object based on the current theme.
 *
 * @returns The complete grid configuration object.
 * @example
 * import {useConfig} from '@nfq/react-grid';
 *
 * const MyComponent = () => {
 *     const config = useConfig();
 *
 *     return (
 *         <div>
 *             <p>Grid columns: {config.columns}</p>
 *             <p>Grid gutter: {config.gutter}</p>
 *         </div>
 *     );
 * };
 */
export const useConfig = () => {
    const theme = useTheme();

    return useMemo(() => getConfig(theme as Theme), [theme]);
};