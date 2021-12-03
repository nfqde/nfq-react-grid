/* eslint-disable @nfq/no-magic-numbers, max-lines-per-function */
import React from 'react';

import {mount} from '@cypress/react';
import styled from 'styled-components';

import Col from '../../../src/grid/Col';
import Container from '../../../src/grid/Container';
import Row from '../../../src/grid/Row';
import Spacer from '../../../src/grid/Spacer';
import {containerSizes, defaultTheme} from '../../fixtures/themes';
import {Viewports} from '../../fixtures/viewports';
import TestWrapper from '../../support/TestWrapper';

describe('Test Spacer component', () => {
    it('Renders', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Spacer testId="SpacerId" />
            </TestWrapper>
        );

        cy.getCy('SpacerId').should('exist');
    });

    it('Renders as a span', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Spacer testId="SpacerId" />
            </TestWrapper>
        );

        cy.getCy('SpacerId').should('be.htmlElement', 'span');
    });

    it('Renders the height spacing given', () => {
        mount(
            <TestWrapper theme={containerSizes}>
                <Spacer testId="SpacerId" y={5} />
            </TestWrapper>
        );

        cy.getCy('SpacerId').invoke('outerHeight', false).should('be.eq', 25);
    });

    it('Renders the height spacing given for each screen size', () => {
        mount(
            <TestWrapper theme={containerSizes}>
                <Spacer
                    testId="SpacerId"
                    y={{
                        lg: 8,
                        xs: 5,
                        xxl: 7
                    }}
                />
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('SpacerId').invoke('outerHeight', false).should('be.eq', 25);

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('SpacerId').invoke('outerHeight', false).should('be.eq', 25);

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('SpacerId').invoke('outerHeight', false).should('be.eq', 25);

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('SpacerId').invoke('outerHeight', false).should('be.eq', 40);

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('SpacerId').invoke('outerHeight', false).should('be.eq', 40);

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('SpacerId').invoke('outerHeight', false).should('be.eq', 35);
    });

    it('Renders the width spacing given', () => {
        mount(
            <TestWrapper theme={containerSizes}>
                <Spacer testId="SpacerId" x={5} />
            </TestWrapper>
        );

        cy.getCy('SpacerId').invoke('outerWidth', false).should('be.eq', 25);
    });

    it('Renders the width spacing given for each screen size', () => {
        mount(
            <TestWrapper theme={containerSizes}>
                <Spacer
                    testId="SpacerId"
                    x={{
                        lg: 8,
                        xs: 5,
                        xxl: 7
                    }}
                />
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('SpacerId').invoke('outerWidth', false).should('be.eq', 25);

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('SpacerId').invoke('outerWidth', false).should('be.eq', 25);

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('SpacerId').invoke('outerWidth', false).should('be.eq', 25);

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('SpacerId').invoke('outerWidth', false).should('be.eq', 40);

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('SpacerId').invoke('outerWidth', false).should('be.eq', 40);

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('SpacerId').invoke('outerWidth', false).should('be.eq', 35);
    });

    it('Renders full available width if in flex', () => {
        mount(
            <TestWrapper theme={containerSizes}>
                <Container>
                    <Row>
                        <Col direction="row">
                            <Spacer testId="SpacerId" x={5} />
                        </Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.getCy('SpacerId').invoke('outerWidth', false).should('be.eq', 480);
    });

    it('Renders only maxX in flex', () => {
        mount(
            <TestWrapper theme={containerSizes}>
                <Container>
                    <Row>
                        <Col direction="row">
                            <Spacer maxX={8} testId="SpacerId" x={5} />
                        </Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.getCy('SpacerId').invoke('outerWidth', false).should('be.eq', 40);
    });

    it('Renders at least x if no space', () => {
        mount(
            <TestWrapper theme={containerSizes}>
                <Container>
                    <Row noWrap>
                        <Col xs={12}>&nbsp;</Col>
                        <Spacer maxX={8} testId="SpacerId" x={5} />
                        <Col>&nbsp;</Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.getCy('SpacerId').invoke('outerWidth', false).should('be.eq', 25);
    });

    it('Renders full available height if in flex', () => {
        const FullContainer = styled(Container)`
            height: 100%;
        `;
        const FullRow = styled(Row)`
            height: 100%;
        `;

        mount(
            <TestWrapper height={500} theme={containerSizes}>
                <FullContainer>
                    <FullRow align="stretch" direction="column">
                        <Spacer testId="SpacerId" y={5} />
                    </FullRow>
                </FullContainer>
            </TestWrapper>
        );

        cy.getCy('SpacerId').invoke('outerHeight', false).should('be.eq', 500);
    });

    it('Renders only maxY in flex', () => {
        const FullContainer = styled(Container)`
            height: 100%;
        `;
        const FullRow = styled(Row)`
            height: 100%;
        `;

        mount(
            <TestWrapper height={500} theme={containerSizes}>
                <FullContainer>
                    <FullRow align="stretch" direction="column">
                        <Spacer maxY={8} testId="SpacerId" y={5} />
                    </FullRow>
                </FullContainer>
            </TestWrapper>
        );

        cy.getCy('SpacerId').invoke('outerHeight', false).should('be.eq', 40);
    });

    it('Renders at least y if no space', () => {
        const FullContainer = styled(Container)`
            height: 100%;
        `;
        const FullRow = styled(Row)`
            height: 100%;
        `;
        const FullCol = styled(Col)`
            height: 500px;
        `;

        mount(
            <TestWrapper height={500} theme={containerSizes}>
                <FullContainer>
                    <FullRow align="stretch" direction="column">
                        <FullCol>&nbsp;</FullCol>
                        <Spacer maxY={8} testId="SpacerId" y={5} />
                    </FullRow>
                </FullContainer>
            </TestWrapper>
        );

        cy.getCy('SpacerId').invoke('outerHeight', false).should('be.eq', 25);
    });

    it('Renders inline for text spacing', () => {
        mount(
            <TestWrapper height={500} theme={containerSizes}>
                <Container>
                    <Row>
                        <Col>
                            <div>Text<Spacer maxX={8} testId="SpacerId" x={8} isInline />Spacing</div>
                        </Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.getCy('SpacerId').should('have.css', 'display', 'inline-block');
    });

    it('Renders debug mode if Strg+D is pressed', () => {
        mount(
            <TestWrapper height={500} theme={containerSizes}>
                <Container>
                    <Row>
                        <Col>
                            <div>Text<Spacer maxX={8} testId="SpacerId" x={8} isInline />Spacing</div>
                        </Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.get('body').type('{ctrl}D');

        cy.getCy('SpacerId').should('have.class', 'debug');
        cy.getCy('SpacerId').should('have.css', 'outline', 'rgb(255, 255, 255) solid 1px');
    });

    it('Deactivates debug mode if Strg+D is pressed twice', () => {
        mount(
            <TestWrapper height={500} theme={containerSizes}>
                <Container>
                    <Row>
                        <Col>
                            <div>Text<Spacer maxX={8} testId="SpacerId" x={8} isInline />Spacing</div>
                        </Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.get('body').type('{ctrl}D');

        cy.getCy('SpacerId').should('have.class', 'debug');
        cy.getCy('SpacerId').should('have.css', 'outline', 'rgb(255, 255, 255) solid 1px');

        cy.get('body').type('{ctrl}D');

        cy.getCy('SpacerId').should('not.have.class', 'debug');
    });
});