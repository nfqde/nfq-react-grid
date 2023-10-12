/* eslint-disable @nfq/no-magic-numbers, max-lines-per-function */
import React from 'react';

import ResponsiveText from '../../../src/grid/ResponsiveText';
import {themeConfigs} from '../../fixtures/themes';
import {Viewports} from '../../fixtures/viewports';
import TestWrapper from '../../support/TestWrapper';

describe('Test ResponsiveText component', () => {
    it('Renders the right text for the right screensize', () => {
        cy.mount(
            <TestWrapper theme={{nfqgrid: themeConfigs.differentContainers}}>
                <div data-cy="testDiv">
                    <ResponsiveText
                        lg="Large Screen Text"
                        md="Medium Screen Text"
                        sm="Small Screen Text"
                        xl="Extra Large Screen Text"
                        xs="Extra Small Screen Text"
                        xxl="Extra Extra Large Screen Text"
                    />
                </div>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('testDiv').should('contain', 'Extra Small Screen Text');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('testDiv').should('contain', 'Small Screen Text');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('testDiv').should('contain', 'Medium Screen Text');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('testDiv').should('contain', 'Large Screen Text');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('testDiv').should('contain', 'Extra Large Screen Text');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('testDiv').should('contain', 'Extra Extra Large Screen Text');
    });

    it('Renders the right text for the right screensize mobile first', () => {
        cy.mount(
            <TestWrapper theme={{nfqgrid: themeConfigs.differentContainers}}>
                <div data-cy="testDiv">
                    <ResponsiveText
                        lg="Large Screen Text"
                        xs="Extra Small Screen Text"
                    />
                </div>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('testDiv').should('contain', 'Extra Small Screen Text');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('testDiv').should('contain', 'Extra Small Screen Text');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('testDiv').should('contain', 'Extra Small Screen Text');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('testDiv').should('contain', 'Large Screen Text');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('testDiv').should('contain', 'Large Screen Text');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('testDiv').should('contain', 'Large Screen Text');
    });
});