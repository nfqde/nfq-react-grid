/* eslint-disable @nfq/no-magic-numbers, max-lines-per-function */
import React from 'react';

import {mount} from '@cypress/react';

import Hidden from '../../../src/utils/Hidden';
import {containerSizes} from '../../fixtures/themes';
import {Viewports} from '../../fixtures/viewports';
import TestWrapper from '../../support/TestWrapper';

describe('Test Hidden component', () => {
    it('Renders only on defined screen sizes', () => {
        mount(
            <TestWrapper theme={containerSizes}>
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
        mount(
            <TestWrapper theme={containerSizes}>
                <Hidden isLoadingHtml lg sm xs>
                    <div data-cy="testDiv" />
                </Hidden>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('testDiv').parent().should('have.css', 'display', 'none');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('testDiv').parent().should('have.css', 'display', 'none');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('testDiv').parent().should('have.css', 'display', 'block');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('testDiv').parent().should('have.css', 'display', 'none');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('testDiv').parent().should('have.css', 'display', 'block');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('testDiv').parent().should('have.css', 'display', 'block');
    });
});