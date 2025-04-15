/* eslint-disable promise/always-return, promise/prefer-await-to-then, promise/catch-or-return, max-lines, max-len, max-lines-per-function */
import React from 'react';

import {createConfig} from '../../../src/config/config';
import {useScreenSize} from '../../../src/hooks/useScreenSize';
import {themeConfigs} from '../../fixtures/themes';
import {Viewports} from '../../fixtures/viewports';
import TestWrapper from '../../support/TestWrapper';

describe('Test useScreenSize hook', () => {
    it('Is a function', () => {
        expect(useScreenSize, 'useScreenSize').to.be.a('function');
    });

    it('should return xs on small mobile viewport', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.mountHook(useScreenSize).then(({MockComponent, values}) => {
            cy.wrap(values).as('values');
            cy.mount(
                <TestWrapper theme={globalCss}>
                    <MockComponent />
                </TestWrapper>
            );
        }).then(() => {
            cy.get('@values').should('have.property', 'current', 'xs');
        });
    });

    it('should return sm on mobile viewport', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.differentContainers);

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.mountHook(useScreenSize).then(({MockComponent, values}) => {
            cy.wrap(values).as('values');
            cy.mount(
                <TestWrapper theme={globalCss}>
                    <MockComponent />
                </TestWrapper>
            );
        }).then(() => {
            cy.get('@values').should('have.property', 'current', 'sm');
        });
    });

    it('should return md on tablet viewport', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.differentContainers);

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.mountHook(useScreenSize).then(({MockComponent, values}) => {
            cy.wrap(values).as('values');
            cy.mount(
                <TestWrapper theme={globalCss}>
                    <MockComponent />
                </TestWrapper>
            );
        }).then(() => {
            cy.get('@values').should('have.property', 'current', 'md');
        });
    });

    it('should return lg on laptop viewport', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.differentContainers);

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.mountHook(useScreenSize).then(({MockComponent, values}) => {
            cy.wrap(values).as('values');
            cy.mount(
                <TestWrapper theme={globalCss}>
                    <MockComponent />
                </TestWrapper>
            );
        }).then(() => {
            cy.get('@values').should('have.property', 'current', 'lg');
        });
    });

    it('should return xl on desktop viewport', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.differentContainers);

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.mountHook(useScreenSize).then(({MockComponent, values}) => {
            cy.wrap(values).as('values');
            cy.mount(
                <TestWrapper theme={globalCss}>
                    <MockComponent />
                </TestWrapper>
            );
        }).then(() => {
            cy.get('@values').should('have.property', 'current', 'xl');
        });
    });

    it('should return xxl on big viewport', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.differentContainers);

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.mountHook(useScreenSize).then(({MockComponent, values}) => {
            cy.wrap(values).as('values');
            cy.mount(
                <TestWrapper theme={globalCss}>
                    <MockComponent />
                </TestWrapper>
            );
        }).then(() => {
            cy.get('@values').should('have.property', 'current', 'xxl');
        });
    });

    it('should change screenSize on viewport changes', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.differentContainers);

        cy.mountHook(useScreenSize)
            .then(({MockComponent, values}) => {
                cy.wrap(values).as('values');
                cy.mount(
                    <TestWrapper theme={globalCss}>
                        <MockComponent />
                    </TestWrapper>
                );
            })
            .then(() => {
                cy.viewport(Viewports.xs[0], Viewports.xs[1]);
                cy.get('@values').should('have.property', 'current', 'xs');
            })
            .then(() => {
                cy.viewport(Viewports.sm[0], Viewports.sm[1]);
                cy.get('@values').should('have.property', 'current', 'sm');
            })
            .then(() => {
                cy.viewport(Viewports.md[0], Viewports.md[1]);
                cy.get('@values').should('have.property', 'current', 'md');
            })
            .then(() => {
                cy.viewport(Viewports.lg[0], Viewports.lg[1]);
                cy.get('@values').should('have.property', 'current', 'lg');
            })
            .then(() => {
                cy.viewport(Viewports.xl[0], Viewports.xl[1]);
                cy.get('@values').should('have.property', 'current', 'xl');
            })
            .then(() => {
                cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
                cy.get('@values').should('have.property', 'current', 'xxl');
            });
    });
});