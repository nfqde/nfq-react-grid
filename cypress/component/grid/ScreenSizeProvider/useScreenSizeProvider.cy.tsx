/* eslint-disable promise/always-return, promise/prefer-await-to-then, promise/catch-or-return, max-lines, max-len, max-lines-per-function */
import React from 'react';

import {createConfig} from '../../../../src/config/config';
import {useScreenSizeProvider} from '../../../../src/grid/ScreenSizeProvider/useScreenSizeProvider';
import {themeConfigs} from '../../../fixtures/themes';
import TestWrapper from '../../../support/TestWrapper';


describe('Test useScreenSizeProvider hook', () => {
    it('Is a function', () => {
        expect(useScreenSizeProvider, 'useConfig').to.be.a('function');
    });

    it('Returns initial screenSize and skeletonStore', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mountHook(useScreenSizeProvider).then(({MockComponent, values}) => {
            cy.wrap(values).as('values');

            cy.mount(
                <TestWrapper theme={globalCss}>
                    <MockComponent />
                </TestWrapper>
            );
        }).then(() => {
            cy.get('@values').its('current').should('have.property', 'screenSize', 'xs');
            cy.get('@values').its('current').its('skeletonStore').should('have.keys', ['get', 'register', 'subscribe', 'unregister']);
        });
    });

    it('updates screenSize on window resize (if getScreenSize is dynamic)', () => {
        cy.viewport(800, 800);
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mountHook(useScreenSizeProvider).then(({MockComponent, values}) => {
            cy.wrap(values).as('values');

            cy.mount(
                <TestWrapper theme={globalCss}>
                    <MockComponent />
                </TestWrapper>
            );
        }).then(() => {
            cy.get('@values').its('current').should('have.property', 'screenSize', 'md');
            cy.viewport(1200, 800);
        }).then(() => {
            cy.get('@values').its('current').should('have.property', 'screenSize', 'xl');
        });
    });
});