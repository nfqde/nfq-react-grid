/* eslint-disable @nfq/no-magic-numbers, max-lines-per-function, max-len */
import React from 'react';

import styled from 'styled-components';

import Container from '../../../src/grid/Container';
import {themeConfigs} from '../../fixtures/themes';
import {Viewports} from '../../fixtures/viewports';
import TestWrapper from '../../support/TestWrapper';

describe('Test Container component', () => {
    it('Renders', () => {
        cy.mount(
            <TestWrapper theme={{nfqgrid: themeConfigs.defaultTheme}}>
                <Container testId="ContainerId">
                    &nbsp;
                </Container>
            </TestWrapper>
        );

        cy.getCy('ContainerId').should('exist');
    });

    it('Renders as a div', () => {
        cy.mount(
            <TestWrapper theme={{nfqgrid: themeConfigs.defaultTheme}}>
                <Container testId="ContainerId">
                    &nbsp;
                </Container>
            </TestWrapper>
        );

        cy.getCy('ContainerId').should('be.htmlElement', 'div');
    });

    it('Renders as the as prop dictates', () => {
        cy.mount(
            <TestWrapper theme={{nfqgrid: themeConfigs.defaultTheme}}>
                <Container as="section" testId="ContainerId">
                    &nbsp;
                </Container>
            </TestWrapper>
        );

        cy.getCy('ContainerId').should('be.htmlElement', 'section');
    });

    it('Is overwritable with styled-components', () => {
        const NewContainer = styled(Container)`
            background-color: rgb(255, 192, 203);
        `;

        cy.mount(
            <TestWrapper theme={{nfqgrid: themeConfigs.defaultTheme}}>
                <NewContainer testId="ContainerId">
                    &nbsp;
                </NewContainer>
            </TestWrapper>
        );

        cy.getCy('ContainerId').should('have.css', 'background-color', 'rgb(255, 192, 203)');
    });

    it('Renders the right widths for screen sizes', () => {
        cy.mount(
            <TestWrapper theme={{nfqgrid: themeConfigs.differentContainers}}>
                <Container testId="ContainerId">&nbsp;</Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ContainerId').invoke('outerWidth', false).should('be.eq', Viewports.xs[0]);

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ContainerId').invoke('outerWidth', false).should('be.eq', themeConfigs.differentContainers.container.sm!);

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ContainerId').invoke('outerWidth', false).should('be.eq', themeConfigs.differentContainers.container.md!);

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ContainerId').invoke('outerWidth', false).should('be.eq', themeConfigs.differentContainers.container.lg!);

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ContainerId').invoke('outerWidth', false).should('be.eq', themeConfigs.differentContainers.container.xl!);

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ContainerId').invoke('outerWidth', false).should('be.eq', themeConfigs.differentContainers.container.xxl!);
    });

    it('Renders width 100% if fluid is true', () => {
        cy.mount(
            <TestWrapper theme={{nfqgrid: themeConfigs.differentContainers}}>
                <Container testId="ContainerId" isFluid>
                    &nbsp;
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ContainerId').invoke('outerWidth', false).should('be.eq', Viewports.xs[0]);

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ContainerId').invoke('outerWidth', false).should('be.eq', Viewports.sm[0]);

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ContainerId').invoke('outerWidth', false).should('be.eq', Viewports.md[0]);

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ContainerId').invoke('outerWidth', false).should('be.eq', Viewports.lg[0]);

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ContainerId').invoke('outerWidth', false).should('be.eq', Viewports.xl[0]);

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ContainerId').invoke('outerWidth', false).should('be.eq', Viewports.xxl[0]);
    });

    it('Renders width 100% if fluid is set for the breakpoint.', () => {
        cy.mount(
            <TestWrapper theme={{nfqgrid: themeConfigs.differentContainers}}>
                <Container isFluid={['sm', 'lg', 'xxl']} testId="ContainerId">
                    &nbsp;
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ContainerId').invoke('outerWidth', false).should('be.eq', Viewports.xs[0]);

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ContainerId').invoke('outerWidth', false).should('be.eq', Viewports.sm[0]);

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ContainerId').invoke('outerWidth', false).should('be.eq', themeConfigs.differentContainers.container.md!);

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ContainerId').invoke('outerWidth', false).should('be.eq', Viewports.lg[0]);

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ContainerId').invoke('outerWidth', false).should('be.eq', themeConfigs.differentContainers.container.xl!);

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ContainerId').invoke('outerWidth', false).should('be.eq', Viewports.xxl[0]);
    });

    it('Renders debug mode if Strg+D is pressed', () => {
        cy.mount(
            <TestWrapper theme={{nfqgrid: themeConfigs.differentContainers}}>
                <Container testId="ContainerId">
                    &nbsp;
                </Container>
            </TestWrapper>
        );

        cy.get('body').type('{ctrl}D');

        cy.getCy('ContainerId').should('have.class', 'debug');
        cy.getCy('ContainerId').should('have.css', 'outline', 'rgb(255, 255, 255) solid 1px');
    });

    it('Deactivates debug mode if Strg+D is pressed twice', () => {
        cy.mount(
            <TestWrapper theme={{nfqgrid: themeConfigs.differentContainers}}>
                <Container testId="ContainerId">
                    &nbsp;
                </Container>
            </TestWrapper>
        );

        cy.get('body').type('{ctrl}D');

        cy.getCy('ContainerId').should('have.class', 'debug');
        cy.getCy('ContainerId').should('have.css', 'outline', 'rgb(255, 255, 255) solid 1px');

        cy.get('body').type('{ctrl}D');

        cy.getCy('ContainerId').should('not.have.class', 'debug');
    });
});