/* eslint-disable promise/always-return, promise/prefer-await-to-then, promise/catch-or-return, max-lines, max-len, max-lines-per-function */
import React from 'react';

import {ThemeProvider} from 'styled-components';

import {useSkeletonStore} from '../../../../src/utils/hooks/useSkeletonStore';
import {themeConfigs} from '../../../fixtures/themes';
import {Viewports} from '../../../fixtures/viewports';

describe('Test useSkeletonStore hook', () => {
    it('Is a function', () => {
        expect(useSkeletonStore, 'useSkeletonStore').to.be.a('function');
    });

    it('should return store functions', () => {
        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.mountHook(useSkeletonStore).then(({MockComponent, values}) => {
            cy.wrap(values).as('values');
            cy.mount(
                <ThemeProvider theme={{nfqgrid: themeConfigs.differentContainers}}>
                    <MockComponent />
                </ThemeProvider>
            );
        }).then(() => {
            cy.get('@values').its('current').its('get').should('be.a', 'function');
            cy.get('@values').its('current').its('register').should('be.a', 'function');
            cy.get('@values').its('current').its('subscribe').should('be.a', 'function');
            cy.get('@values').its('current').its('unregister').should('be.a', 'function');
        });
    });
});