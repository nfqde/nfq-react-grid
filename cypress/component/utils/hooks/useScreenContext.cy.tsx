/* eslint-disable promise/always-return, promise/prefer-await-to-then, promise/catch-or-return, max-lines, max-len, max-lines-per-function */
import React from 'react';

import {ThemeProvider} from 'styled-components';

import {useScreenContext} from '../../../../src/utils/hooks/useScreenContext';
import {themeConfigs} from '../../../fixtures/themes';
import {Viewports} from '../../../fixtures/viewports';

describe('Test useScreenContext hook', () => {
    it('Is a function', () => {
        expect(useScreenContext, 'useScreenContext').to.be.a('function');
    });

    it('should return all values', () => {
        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.mountHook(useScreenContext).then(({MockComponent, values}) => {
            cy.wrap(values).as('values');
            cy.mount(
                <ThemeProvider theme={{nfqgrid: themeConfigs.differentContainers}}>
                    <MockComponent />
                </ThemeProvider>
            );
        }).then(() => {
            cy.get('@values').its('current').should('have.property', 'screenSize', 'xs');
            cy.get('@values').its('current').should('have.property', 'skeletonStore');
        });
    });
});