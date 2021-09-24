/* eslint-disable max-lines */
/* eslint-disable @nfq/no-magic-numbers, max-lines-per-function */
import React from 'react';

import {mount} from '@cypress/react';
import styled from 'styled-components';

import Container from '../../../src/grid/Container';
import Row from '../../../src/grid/Row';
import {defaultTheme} from '../../fixtures/themes';
import {Viewports} from '../../fixtures/viewports';
import TestWrapper from '../../support/TestWrapper';

describe('Test Row component', () => {
    it('Renders', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row testId="RowId">
                        &nbsp;
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.getCy('RowId').should('exist');
    });

    it('Renders as a div', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row testId="RowId">
                        &nbsp;
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.getCy('RowId').should('be.htmlElement', 'div');
    });

    it('Renders as the as prop dictates', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row as="header" testId="RowId">
                        &nbsp;
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.getCy('RowId').should('be.htmlElement', 'header');
    });

    it('Is overwritable with styled-components', () => {
        const NewRow = styled(Row)`
            background-color: rgb(255, 192, 203);
        `;

        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <NewRow testId="RowId">
                        &nbsp;
                    </NewRow>
                </Container>
            </TestWrapper>
        );

        cy.getCy('RowId').should('have.css', 'background-color', 'rgb(255, 192, 203)');
    });

    it('Defines margins like gutterWidth config', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row testId="RowId">
                        &nbsp;
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('RowId').should('have.css', 'margin-left', `-${defaultTheme.nfqgrid.gutterWidth.xs / 2}px`);
        cy.getCy('RowId').should('have.css', 'margin-right', `-${defaultTheme.nfqgrid.gutterWidth.xs / 2}px`);

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('RowId').should('have.css', 'margin-left', `-${defaultTheme.nfqgrid.gutterWidth.sm / 2}px`);
        cy.getCy('RowId').should('have.css', 'margin-right', `-${defaultTheme.nfqgrid.gutterWidth.sm / 2}px`);

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('RowId').should('have.css', 'margin-left', `-${defaultTheme.nfqgrid.gutterWidth.md / 2}px`);
        cy.getCy('RowId').should('have.css', 'margin-right', `-${defaultTheme.nfqgrid.gutterWidth.md / 2}px`);

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('RowId').should('have.css', 'margin-left', `-${defaultTheme.nfqgrid.gutterWidth.lg / 2}px`);
        cy.getCy('RowId').should('have.css', 'margin-right', `-${defaultTheme.nfqgrid.gutterWidth.lg / 2}px`);

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('RowId').should('have.css', 'margin-left', `-${defaultTheme.nfqgrid.gutterWidth.xl / 2}px`);
        cy.getCy('RowId').should('have.css', 'margin-right', `-${defaultTheme.nfqgrid.gutterWidth.xl / 2}px`);

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('RowId').should('have.css', 'margin-left', `-${defaultTheme.nfqgrid.gutterWidth.xxl / 2}px`);
        cy.getCy('RowId').should('have.css', 'margin-right', `-${defaultTheme.nfqgrid.gutterWidth.xxl / 2}px`);
    });

    it('Renders with default direction', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row testId="RowId">
                        &nbsp;
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'row');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'row');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'row');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'row');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'row');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'row');
    });

    it('Changes direction for all sizes', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row direction="column" testId="RowId">
                        &nbsp;
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'column');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'column');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'column');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'column');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'column');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'column');
    });

    it('Changes direction like config', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row
                        direction={{
                            md: 'column',
                            xs: 'row'
                        }}
                        testId="RowId"
                    >
                        &nbsp;
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'row');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'row');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'column');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'column');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'column');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'column');
    });

    it('Changes direction to reverse for all sizes', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row testId="RowId" reverse>
                        &nbsp;
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'row-reverse');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'row-reverse');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'row-reverse');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'row-reverse');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'row-reverse');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'row-reverse');
    });

    it('Changes direction to reverse like config', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row
                        direction={{xl: 'column'}}
                        reverse={['md', 'xl']}
                        testId="RowId"
                    >
                        &nbsp;
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'row');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'row');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'row-reverse');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'row');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'column-reverse');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('RowId').should('have.css', 'flex-direction', 'column');
    });

    it('Changes flex wrap like default sizes', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row
                        direction={{
                            lg: 'column',
                            md: 'row',
                            sm: 'column',
                            xs: 'row'
                        }}
                        reverse={['md', 'lg']}
                        testId="RowId"
                    >
                        &nbsp;
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('RowId').should('have.css', 'flex-wrap', 'wrap');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('RowId').should('have.css', 'flex-wrap', 'nowrap');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('RowId').should('have.css', 'flex-wrap', 'wrap-reverse');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('RowId').should('have.css', 'flex-wrap', 'nowrap');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('RowId').should('have.css', 'flex-wrap', 'nowrap');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('RowId').should('have.css', 'flex-wrap', 'nowrap');
    });

    it('Changes changes flex-wrap to nowrap for all sizes', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row
                        reverse={['md', 'xl']}
                        testId="RowId"
                        noWrap
                    >
                        &nbsp;
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('RowId').should('have.css', 'flex-wrap', 'nowrap');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('RowId').should('have.css', 'flex-wrap', 'nowrap');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('RowId').should('have.css', 'flex-wrap', 'nowrap');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('RowId').should('have.css', 'flex-wrap', 'nowrap');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('RowId').should('have.css', 'flex-wrap', 'nowrap');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('RowId').should('have.css', 'flex-wrap', 'nowrap');
    });

    it('Changes changes flex-wrap to nowrap like config', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row
                        noWrap={['sm', 'lg', 'xl']}
                        reverse={['md', 'xl']}
                        testId="RowId"
                    >
                        &nbsp;
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('RowId').should('have.css', 'flex-wrap', 'wrap');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('RowId').should('have.css', 'flex-wrap', 'nowrap');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('RowId').should('have.css', 'flex-wrap', 'wrap-reverse');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('RowId').should('have.css', 'flex-wrap', 'nowrap');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('RowId').should('have.css', 'flex-wrap', 'nowrap');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('RowId').should('have.css', 'flex-wrap', 'wrap');
    });

    it('Renders with default order', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row testId="RowId1">
                        &nbsp;
                    </Row>
                    <Row testId="RowId2">
                        &nbsp;
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('RowId1').should('have.css', 'order', '0');
        cy.getCy('RowId2').should('have.css', 'order', '0');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('RowId1').should('have.css', 'order', '0');
        cy.getCy('RowId2').should('have.css', 'order', '0');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('RowId1').should('have.css', 'order', '0');
        cy.getCy('RowId2').should('have.css', 'order', '0');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('RowId1').should('have.css', 'order', '0');
        cy.getCy('RowId2').should('have.css', 'order', '0');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('RowId1').should('have.css', 'order', '0');
        cy.getCy('RowId2').should('have.css', 'order', '0');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('RowId1').should('have.css', 'order', '0');
        cy.getCy('RowId2').should('have.css', 'order', '0');
    });

    it('Changes order for all sizes', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row order={2} testId="RowId1">
                        &nbsp;
                    </Row>
                    <Row order={1} testId="RowId2">
                        &nbsp;
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('RowId1').should('have.css', 'order', '2');
        cy.getCy('RowId2').should('have.css', 'order', '1');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('RowId1').should('have.css', 'order', '2');
        cy.getCy('RowId2').should('have.css', 'order', '1');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('RowId1').should('have.css', 'order', '2');
        cy.getCy('RowId2').should('have.css', 'order', '1');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('RowId1').should('have.css', 'order', '2');
        cy.getCy('RowId2').should('have.css', 'order', '1');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('RowId1').should('have.css', 'order', '2');
        cy.getCy('RowId2').should('have.css', 'order', '1');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('RowId1').should('have.css', 'order', '2');
        cy.getCy('RowId2').should('have.css', 'order', '1');
    });

    it('Changes order like config', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row
                        order={{
                            lg: 1,
                            xs: 2
                        }}
                        testId="RowId1"
                    >
                        &nbsp;
                    </Row>
                    <Row
                        order={{
                            lg: 2,
                            xs: 1
                        }}
                        testId="RowId2"
                    >
                        &nbsp;
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('RowId1').should('have.css', 'order', '2');
        cy.getCy('RowId2').should('have.css', 'order', '1');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('RowId1').should('have.css', 'order', '2');
        cy.getCy('RowId2').should('have.css', 'order', '1');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('RowId1').should('have.css', 'order', '2');
        cy.getCy('RowId2').should('have.css', 'order', '1');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('RowId1').should('have.css', 'order', '1');
        cy.getCy('RowId2').should('have.css', 'order', '2');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('RowId1').should('have.css', 'order', '1');
        cy.getCy('RowId2').should('have.css', 'order', '2');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('RowId1').should('have.css', 'order', '1');
        cy.getCy('RowId2').should('have.css', 'order', '2');
    });

    it('Renders with default align', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row testId="RowId">
                        &nbsp;
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('RowId').should('have.css', 'align-items', 'normal');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('RowId').should('have.css', 'align-items', 'normal');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('RowId').should('have.css', 'align-items', 'normal');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('RowId').should('have.css', 'align-items', 'normal');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('RowId').should('have.css', 'align-items', 'normal');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('RowId').should('have.css', 'align-items', 'normal');
    });

    it('Changes align for all sizes', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row align="center" testId="RowId">
                        &nbsp;
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('RowId').should('have.css', 'align-items', 'center');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('RowId').should('have.css', 'align-items', 'center');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('RowId').should('have.css', 'align-items', 'center');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('RowId').should('have.css', 'align-items', 'center');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('RowId').should('have.css', 'align-items', 'center');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('RowId').should('have.css', 'align-items', 'center');
    });

    it('Changes align like config', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row
                        align={{
                            lg: 'baseline',
                            md: 'center',
                            sm: 'stretch',
                            xl: 'flex-end',
                            xs: 'flex-start',
                            xxl: 'unset'
                        }}
                        testId="RowId"
                    >
                        &nbsp;
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('RowId').should('have.css', 'align-items', 'flex-start');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('RowId').should('have.css', 'align-items', 'stretch');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('RowId').should('have.css', 'align-items', 'center');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('RowId').should('have.css', 'align-items', 'baseline');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('RowId').should('have.css', 'align-items', 'flex-end');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('RowId').should('have.css', 'align-items', 'normal');
    });

    it('Renders with default justify', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row testId="RowId">
                        &nbsp;
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('RowId').should('have.css', 'justify-content', 'normal');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('RowId').should('have.css', 'justify-content', 'normal');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('RowId').should('have.css', 'justify-content', 'normal');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('RowId').should('have.css', 'justify-content', 'normal');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('RowId').should('have.css', 'justify-content', 'normal');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('RowId').should('have.css', 'justify-content', 'normal');
    });

    it('Changes justify for all sizes', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row justify="center" testId="RowId">
                        &nbsp;
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('RowId').should('have.css', 'justify-content', 'center');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('RowId').should('have.css', 'justify-content', 'center');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('RowId').should('have.css', 'justify-content', 'center');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('RowId').should('have.css', 'justify-content', 'center');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('RowId').should('have.css', 'justify-content', 'center');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('RowId').should('have.css', 'justify-content', 'center');
    });

    it('Changes justify like config', () => {
        mount(
            <TestWrapper theme={defaultTheme}>
                <Container>
                    <Row
                        justify={{
                            lg: 'space-evenly',
                            md: 'space-around',
                            sm: 'space-between',
                            xl: 'flex-end',
                            xs: 'flex-start',
                            xxl: 'center'
                        }}
                        testId="RowId"
                    >
                        &nbsp;
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('RowId').should('have.css', 'justify-content', 'flex-start');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('RowId').should('have.css', 'justify-content', 'space-between');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('RowId').should('have.css', 'justify-content', 'space-around');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('RowId').should('have.css', 'justify-content', 'space-evenly');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('RowId').should('have.css', 'justify-content', 'flex-end');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('RowId').should('have.css', 'justify-content', 'center');
    });

    it('Renders debug mode if Strg+D is pressed', () => {
        mount(
            <TestWrapper theme={containerSizes}>
                <Container>
                    <Row testId="RowId">
                        &nbsp;
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.get('body').type('{ctrl}D');

        cy.getCy('RowId').should('have.class', 'debug');
        cy.getCy('RowId').should('have.css', 'outline', 'rgb(255, 255, 255) solid 1px');
    });

    it('Deactivates debug mode if Strg+D is pressed twice', () => {
        mount(
            <TestWrapper theme={containerSizes}>
                <Container>
                    <Row testId="RowId">
                        &nbsp;
                    </Row>
                </Container>
            </TestWrapper>
        );

        cy.get('body').type('{ctrl}D');

        cy.getCy('RowId').should('have.class', 'debug');
        cy.getCy('RowId').should('have.css', 'outline', 'rgb(255, 255, 255) solid 1px');

        cy.get('body').type('{ctrl}D');

        cy.getCy('RowId').should('not.have.class', 'debug');
    });
});