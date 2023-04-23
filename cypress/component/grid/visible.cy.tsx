/* eslint-disable @nfq/no-magic-numbers, max-lines-per-function */
import React from 'react';

import Col from '../../../src/grid/Col';
import Visible from '../../../src/grid/Visible';
import {themeConfigs} from '../../fixtures/themes';
import TestWrapper from '../../support/TestWrapper';

const Viewports = {
    lg: [1000, 500],
    md: [770, 500],
    sm: [580, 500],
    xl: [1500, 500],
    xs: [400, 500],
    xxl: [2000, 500]
};

describe('Test Visible component', () => {
    it('Renders only on defined screen sizes', () => {
        cy.mount(
            <TestWrapper theme={{nfqgrid: themeConfigs.differentContainers}}>
                <Visible lg sm xs>
                    <div data-cy="testDiv" />
                </Visible>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('testDiv').should('exist');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('testDiv').should('exist');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('testDiv').should('not.exist');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('testDiv').should('exist');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('testDiv').should('not.exist');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('testDiv').should('not.exist');
    });

    it('Renders only on defined screen sizes but with display prop', () => {
        cy.mount(
            <TestWrapper theme={{nfqgrid: themeConfigs.differentContainers}}>
                <Visible isLoadingHtml lg sm xs>
                    <Col testId="testDiv" xs={2} />
                </Visible>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('testDiv').should('have.css', 'display', 'flex');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('testDiv').should('have.css', 'display', 'flex');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('testDiv').should('have.css', 'display', 'none');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('testDiv').should('have.css', 'display', 'flex');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('testDiv').should('have.css', 'display', 'none');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('testDiv').should('have.css', 'display', 'none');
    });
});