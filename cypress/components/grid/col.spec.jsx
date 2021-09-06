/* eslint-disable max-lines */
/* eslint-disable @nfq/no-magic-numbers, max-lines-per-function */
import React from 'react';

import {mount} from '@cypress/react';
import styled from 'styled-components';

import Col from '../../../src/grid/Col';
import Container from '../../../src/grid/Container';
import Row from '../../../src/grid/Row';
import {
    ColSizesBig,
    ColSizesSingle,
    ConfigOffsets,
    MobileFirstOffsets,
    ScreenSizeOffsets
} from '../../fixtures/colData';
import {containerSizes, defaultTheme} from '../../fixtures/themes';
import {Viewports} from '../../fixtures/viewports';
import TestWrapper from '../../support/TestWrapper';

describe('Test Col component', () => {
    it('Renders', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row>
                        <Col testId="ColId">&nbsp;</Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.getCy('ColId').should('exist');
    });

    it('Renders as a div', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row>
                        <Col testId="ColId">&nbsp;</Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.getCy('ColId').should('be.htmlElement', 'div');
    });

    it('Renders as the as prop dictates', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row>
                        <Col as="article" testId="ColId">&nbsp;</Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.getCy('ColId').should('be.htmlElement', 'article');
    });

    it('Is overwritable with styled-components', () => {
        const NewCol = styled(Col)`
            background-color: rgb(255, 192, 203);
        `;

        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row>
                        <NewCol testId="ColId">&nbsp;</NewCol>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.getCy('ColId').should('have.css', 'background-color', 'rgb(255, 192, 203)');
    });

    it('Defines paddings like gutterWidth config', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row>
                        <Col testId="ColId">&nbsp;</Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', `${defaultTheme.nfqgrid.gutterWidth.xs / 2}px`);
        cy.getCy('ColId').should('have.css', 'padding-right', `${defaultTheme.nfqgrid.gutterWidth.xs / 2}px`);

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', `${defaultTheme.nfqgrid.gutterWidth.sm / 2}px`);
        cy.getCy('ColId').should('have.css', 'padding-right', `${defaultTheme.nfqgrid.gutterWidth.sm / 2}px`);

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', `${defaultTheme.nfqgrid.gutterWidth.md / 2}px`);
        cy.getCy('ColId').should('have.css', 'padding-right', `${defaultTheme.nfqgrid.gutterWidth.md / 2}px`);

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', `${defaultTheme.nfqgrid.gutterWidth.lg / 2}px`);
        cy.getCy('ColId').should('have.css', 'padding-right', `${defaultTheme.nfqgrid.gutterWidth.lg / 2}px`);

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', `${defaultTheme.nfqgrid.gutterWidth.xl / 2}px`);
        cy.getCy('ColId').should('have.css', 'padding-right', `${defaultTheme.nfqgrid.gutterWidth.xl / 2}px`);

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', `${defaultTheme.nfqgrid.gutterWidth.xxl / 2}px`);
        cy.getCy('ColId').should('have.css', 'padding-right', `${defaultTheme.nfqgrid.gutterWidth.xxl / 2}px`);
    });

    it('Renders without gutter', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row>
                        <Col testId="ColId" noGutter>&nbsp;</Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '0px');
        cy.getCy('ColId').should('have.css', 'padding-right', '0px');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '0px');
        cy.getCy('ColId').should('have.css', 'padding-right', '0px');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '0px');
        cy.getCy('ColId').should('have.css', 'padding-right', '0px');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '0px');
        cy.getCy('ColId').should('have.css', 'padding-right', '0px');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '0px');
        cy.getCy('ColId').should('have.css', 'padding-right', '0px');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '0px');
        cy.getCy('ColId').should('have.css', 'padding-right', '0px');
    });

    it('Calculates sizes for all screens', () => {
        mount(
            <TestWrapper theme={containerSizes}>
                <Container>
                    <Row>
                        <Col lg={1} md={1} sm={1} testId="ColId" xl={1} xs={1} xxl={1}>&nbsp;</Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').invoke('outerWidth', false).should('be.eq', ColSizesSingle.xs);

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').invoke('outerWidth', false).should('be.eq', ColSizesSingle.sm);

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').invoke('outerWidth', false).should('be.eq', ColSizesSingle.md);

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').invoke('outerWidth', false).should('be.eq', ColSizesSingle.lg);

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').invoke('outerWidth', false).should('be.eq', ColSizesSingle.xl);

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').invoke('outerWidth', false).should('be.eq', ColSizesSingle.xxl);
    });

    it('Sizes are mobile first', () => {
        mount(
            <TestWrapper theme={containerSizes}>
                <Container>
                    <Row>
                        <Col testId="ColId" xs={1}>&nbsp;</Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').invoke('outerWidth', false).should('be.eq', ColSizesSingle.xs);

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').invoke('outerWidth', false).should('be.eq', ColSizesSingle.sm);

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').invoke('outerWidth', false).should('be.eq', ColSizesSingle.md);

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').invoke('outerWidth', false).should('be.eq', ColSizesSingle.lg);

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').invoke('outerWidth', false).should('be.eq', ColSizesSingle.xl);

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').invoke('outerWidth', false).should('be.eq', ColSizesSingle.xxl);
    });

    it('Sizes fallback to 100% if there are more columns as max', () => {
        mount(
            <TestWrapper theme={containerSizes}>
                <Container>
                    <Row>
                        <Col testId="ColId" xs={10}>&nbsp;</Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').invoke('outerWidth', false).should('be.eq', ColSizesBig.xs);

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').invoke('outerWidth', false).should('be.eq', ColSizesBig.sm);

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').invoke('outerWidth', false).should('be.eq', ColSizesBig.md);

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').invoke('outerWidth', false).should('be.eq', ColSizesBig.lg);

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').invoke('outerWidth', false).should('be.eq', ColSizesBig.xl);

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').invoke('outerWidth', false).should('be.eq', ColSizesBig.xxl);
    });

    it('Renders with default direction', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row>
                        <Col testId="ColId">&nbsp;</Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column');
    });

    it('Changes direction for all sizes', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row>
                        <Col direction="row" testId="ColId">&nbsp;</Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'row');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'row');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'row');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'row');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'row');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'row');
    });

    it('Changes direction like config', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row>
                        <Col
                            direction={{
                                md: 'column',
                                xs: 'row'
                            }}
                            testId="ColId"
                        >
                            &nbsp;
                        </Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'row');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'row');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column');
    });

    it('Changes direction to reverse for all sizes', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row>
                        <Col testId="ColId" reverse>&nbsp;</Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column-reverse');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column-reverse');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column-reverse');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column-reverse');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column-reverse');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column-reverse');
    });

    it('Changes direction to reverse like config', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row>
                        <Col reverse={['md', 'xl']} testId="ColId">&nbsp;</Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column-reverse');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column-reverse');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column');
    });

    it('Changes direction and reverse like config', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row>
                        <Col
                            direction={{
                                md: 'column',
                                xs: 'row'
                            }}
                            reverse={['sm', 'md', 'xl']}
                            testId="ColId"
                        >
                            &nbsp;
                        </Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'row');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'row-reverse');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column-reverse');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column-reverse');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').should('have.css', 'flex-direction', 'column');
    });

    it('Calculates offset from mobile first', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row>
                        <Col offset={1} testId="ColId">
                            &nbsp;
                        </Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').should('have.css', 'margin-left', `${MobileFirstOffsets.xs}px`);

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').should('have.css', 'margin-left', `${MobileFirstOffsets.sm}px`);

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').should('have.css', 'margin-left', `${MobileFirstOffsets.md}px`);

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').should('have.css', 'margin-left', `${MobileFirstOffsets.lg}px`);

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').should('have.css', 'margin-left', `${MobileFirstOffsets.xl}px`);

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').should('have.css', 'margin-left', `${MobileFirstOffsets.xxl}px`);
    });

    it('Calculates offset for screen sizes', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row>
                        <Col offset={{xs: 1}} testId="ColId">
                            &nbsp;
                        </Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').should('have.css', 'margin-left', `${ScreenSizeOffsets.xs}px`);

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').should('have.css', 'margin-left', `${ScreenSizeOffsets.sm}px`);

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').should('have.css', 'margin-left', `${ScreenSizeOffsets.md}px`);

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').should('have.css', 'margin-left', `${ScreenSizeOffsets.lg}px`);

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').should('have.css', 'margin-left', `${ScreenSizeOffsets.xl}px`);

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').should('have.css', 'margin-left', `${ScreenSizeOffsets.xxl}px`);
    });

    it('Calculates offset for screen sizes after config', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row>
                        <Col
                            offset={{
                                lg: 4,
                                xs: 1
                            }}
                            testId="ColId"
                        >
                            &nbsp;
                        </Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').should('have.css', 'margin-left', `${ConfigOffsets.xs}px`);

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').should('have.css', 'margin-left', `${ConfigOffsets.sm}px`);

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').should('have.css', 'margin-left', `${ConfigOffsets.md}px`);

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').should('have.css', 'margin-left', `${ConfigOffsets.lg}px`);

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').should('have.css', 'margin-left', `${ConfigOffsets.xl}px`);

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').should('have.css', 'margin-left', `${ConfigOffsets.xxl}px`);
    });

    it('Renders with default order', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row>
                        <Col testId="ColId1">
                                &nbsp;
                        </Col>
                    </Row>
                    <Row>
                        <Col testId="ColId2">
                                &nbsp;
                        </Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId1').should('have.css', 'order', '0');
        cy.getCy('ColId2').should('have.css', 'order', '0');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId1').should('have.css', 'order', '0');
        cy.getCy('ColId2').should('have.css', 'order', '0');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId1').should('have.css', 'order', '0');
        cy.getCy('ColId2').should('have.css', 'order', '0');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId1').should('have.css', 'order', '0');
        cy.getCy('ColId2').should('have.css', 'order', '0');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId1').should('have.css', 'order', '0');
        cy.getCy('ColId2').should('have.css', 'order', '0');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId1').should('have.css', 'order', '0');
        cy.getCy('ColId2').should('have.css', 'order', '0');
    });

    it('Changes order for all sizes', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row>
                        <Col order={2} testId="ColId1">
                                &nbsp;
                        </Col>
                    </Row>
                    <Row>
                        <Col order={1} testId="ColId2">
                                &nbsp;
                        </Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId1').should('have.css', 'order', '2');
        cy.getCy('ColId2').should('have.css', 'order', '1');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId1').should('have.css', 'order', '2');
        cy.getCy('ColId2').should('have.css', 'order', '1');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId1').should('have.css', 'order', '2');
        cy.getCy('ColId2').should('have.css', 'order', '1');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId1').should('have.css', 'order', '2');
        cy.getCy('ColId2').should('have.css', 'order', '1');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId1').should('have.css', 'order', '2');
        cy.getCy('ColId2').should('have.css', 'order', '1');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId1').should('have.css', 'order', '2');
        cy.getCy('ColId2').should('have.css', 'order', '1');
    });

    it('Changes order like config', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row>
                        <Col
                            order={{
                                lg: 1,
                                xs: 2
                            }}
                            testId="ColId1"
                        >
                                &nbsp;
                        </Col>
                    </Row>
                    <Row>
                        <Col
                            order={{
                                lg: 2,
                                xs: 1
                            }}
                            testId="ColId2"
                        >
                                &nbsp;
                        </Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId1').should('have.css', 'order', '2');
        cy.getCy('ColId2').should('have.css', 'order', '1');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId1').should('have.css', 'order', '2');
        cy.getCy('ColId2').should('have.css', 'order', '1');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId1').should('have.css', 'order', '2');
        cy.getCy('ColId2').should('have.css', 'order', '1');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId1').should('have.css', 'order', '1');
        cy.getCy('ColId2').should('have.css', 'order', '2');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId1').should('have.css', 'order', '1');
        cy.getCy('ColId2').should('have.css', 'order', '2');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId1').should('have.css', 'order', '1');
        cy.getCy('ColId2').should('have.css', 'order', '2');
    });

    it('Renders with default align', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row>
                        <Col testId="ColId">
                            &nbsp;
                        </Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').should('have.css', 'align-items', 'normal');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').should('have.css', 'align-items', 'normal');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').should('have.css', 'align-items', 'normal');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').should('have.css', 'align-items', 'normal');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').should('have.css', 'align-items', 'normal');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').should('have.css', 'align-items', 'normal');
    });

    it('Changes align for all sizes', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row>
                        <Col align="center" testId="ColId">
                            &nbsp;
                        </Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').should('have.css', 'align-items', 'center');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').should('have.css', 'align-items', 'center');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').should('have.css', 'align-items', 'center');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').should('have.css', 'align-items', 'center');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').should('have.css', 'align-items', 'center');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').should('have.css', 'align-items', 'center');
    });

    it('Changes align like config', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row>
                        <Col
                            align={{
                                lg: 'baseline',
                                md: 'center',
                                sm: 'stretch',
                                xl: 'flex-end',
                                xs: 'flex-start',
                                xxl: 'unset'
                            }}
                            testId="ColId"
                        >
                            &nbsp;
                        </Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').should('have.css', 'align-items', 'flex-start');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').should('have.css', 'align-items', 'stretch');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').should('have.css', 'align-items', 'center');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').should('have.css', 'align-items', 'baseline');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').should('have.css', 'align-items', 'flex-end');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').should('have.css', 'align-items', 'normal');
    });

    it('Renders with default justify', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row>
                        <Col testId="ColId">
                            &nbsp;
                        </Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').should('have.css', 'justify-content', 'normal');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').should('have.css', 'justify-content', 'normal');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').should('have.css', 'justify-content', 'normal');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').should('have.css', 'justify-content', 'normal');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').should('have.css', 'justify-content', 'normal');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').should('have.css', 'justify-content', 'normal');
    });

    it('Changes justify for all sizes', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row>
                        <Col justify="center" testId="ColId">
                            &nbsp;
                        </Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').should('have.css', 'justify-content', 'center');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').should('have.css', 'justify-content', 'center');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').should('have.css', 'justify-content', 'center');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').should('have.css', 'justify-content', 'center');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').should('have.css', 'justify-content', 'center');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').should('have.css', 'justify-content', 'center');
    });

    it('Changes justify like config', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row>
                        <Col
                            justify={{
                                lg: 'space-evenly',
                                md: 'space-around',
                                sm: 'space-between',
                                xl: 'flex-end',
                                xs: 'flex-start',
                                xxl: 'center'
                            }}
                            testId="ColId"
                        >
                            &nbsp;
                        </Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').should('have.css', 'justify-content', 'flex-start');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').should('have.css', 'justify-content', 'space-between');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').should('have.css', 'justify-content', 'space-around');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').should('have.css', 'justify-content', 'space-evenly');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').should('have.css', 'justify-content', 'flex-end');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').should('have.css', 'justify-content', 'center');
    });

    it('Renders debug mode if Strg+D is pressed', () => {
        mount(
            <TestWrapper theme={containerSizes}>
                <Container>
                    <Row>
                        <Col testId="ColId">&nbsp;</Col>
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.get('body').type('{ctrl}D');

        cy.getCy('ColId').should('have.class', 'debug');
        cy.getCy('ColId').should('have.css', 'background-clip', 'content-box, padding-box');
        cy.getCy('ColId').should('have.css', 'outline', 'rgb(255, 255, 255) solid 1px');
    });
});