import {useContext} from 'react';

import {ScreenSizeContext} from '../../grid/ScreenSizeProvider';

import type {Breakpoints} from '../../sharedTypes';

/**
 * Returns the current viewport screen size in breakpoints.
 *
 * @returns The current screen size.
 * @example
 * import {useScreenSize} from '@nfq/react-grid';
 *
 * const MyComponent = () => {
 *     const screenSize = useScreenSize();
 *
 *     return (
 *         <div>
 *             {screenSize === 'sm' && <p>Small screen size.</p>}
 *             {screenSize === 'md' && <p>Medium screen size.</p>}
 *             {screenSize === 'lg' && <p>Large screen size.</p>}
 *         </div>
 *     );
 * };
 */
export const useScreenSize = () => {
    const context = useContext(ScreenSizeContext);

    return context.screenSize as Breakpoints;
};