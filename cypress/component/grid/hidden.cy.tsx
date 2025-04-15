/* eslint-disable @nfq/no-magic-numbers, max-lines-per-function */
import React from 'react';

import {createConfig} from '../../../src/config/config';
import {Col} from '../../../src/grid/Col';
import {Hidden} from '../../../src/grid/Hidden';
import {themeConfigs} from '../../fixtures/themes';
import {Viewports} from '../../fixtures/viewports';
import TestWrapper from '../../support/TestWrapper';

describe('Test Hidden component', () => {
    it('Renders only on defined screen sizes', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.differentContainers);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Hidden lg sm xs>
                    <div data-cy="testDiv" />
                </Hidden>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('testDiv').should('not.exist');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('testDiv').should('not.exist');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('testDiv').should('exist');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('testDiv').should('not.exist');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('testDiv').should('exist');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('testDiv').should('exist');
    });

    it('Renders only on defined screen sizes but with display prop', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.differentContainers);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Hidden isLoadingHtml lg sm xs xxl>
                    <Col testId="testDiv" xs={2} />
                </Hidden>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('testDiv').should('have.css', 'display', 'none');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('testDiv').should('have.css', 'display', 'none');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('testDiv').should('have.css', 'display', 'flex');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('testDiv').should('have.css', 'display', 'none');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('testDiv').should('have.css', 'display', 'flex');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('testDiv').should('have.css', 'display', 'none');
    });
});