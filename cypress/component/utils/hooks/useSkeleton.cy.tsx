/* eslint-disable promise/always-return, promise/prefer-await-to-then, promise/catch-or-return, max-lines, max-len, max-lines-per-function */
import React from 'react';

import {ThemeProvider} from 'styled-components';

import ScreenSizeProvider from '../../../../src/grid/ScreenSizeProvider';
import {useSkeleton} from '../../../../src/utils/hooks/useSkeleton';
import {themeConfigs} from '../../../fixtures/themes';
import {Viewports} from '../../../fixtures/viewports';

describe('Test useSkeleton hook', () => {
    it('Is a function', () => {
        expect(useSkeleton, 'useSkeleton').to.be.a('function');
    });

    it('should return default variant', () => {
        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.mountHook(() => useSkeleton(1, 'group', undefined)).then(({MockComponent, values}) => {
            cy.wrap(values).as('values');
            cy.mount(
                <ThemeProvider theme={{nfqgrid: themeConfigs.differentContainers}}>
                    <ScreenSizeProvider>
                        <MockComponent />
                    </ScreenSizeProvider>
                </ThemeProvider>
            );
        }).then(() => {
            cy.get('@values').should('have.property', 'current', 'dark');
        });
    });

    it('should return override variant', () => {
        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.mountHook(() => useSkeleton(1, 'group', 'light')).then(({MockComponent, values}) => {
            cy.wrap(values).as('values');
            cy.mount(
                <ThemeProvider theme={{nfqgrid: themeConfigs.differentContainers}}>
                    <ScreenSizeProvider>
                        <MockComponent />
                    </ScreenSizeProvider>
                </ThemeProvider>
            );
        }).then(() => {
            cy.get('@values').should('have.property', 'current', 'light');
        });
    });
});