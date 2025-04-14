/* eslint-disable max-lines, @nfq/no-magic-numbers, max-lines-per-function */
import React from 'react';

import styled from '@emotion/styled';

import {createConfig} from '../../../../src/config/config';
import {Col} from '../../../../src/grid/Col';
import {
    ColSizesBig,
    ColSizesSingle,
    ConfigOffsets,
    MobileFirstOffsets,
    ScreenSizeOffsets
} from '../../../fixtures/colData';
import {themeConfigs} from '../../../fixtures/themes';
import {Viewports} from '../../../fixtures/viewports';
import TestWrapper from '../../../support/TestWrapper';

describe('Test Col component', () => {
    it('Renders', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col testId="ColId">&nbsp;</Col>
            </TestWrapper>
        );

        cy.getCy('ColId').should('exist');
    });

    it('Renders as a div', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col testId="ColId">&nbsp;</Col>
            </TestWrapper>
        );

        cy.getCy('ColId').should('be.htmlElement', 'div');
    });

    it('Renders as the as prop dictates', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col as="article" testId="ColId">&nbsp;</Col>
            </TestWrapper>
        );

        cy.getCy('ColId').should('be.htmlElement', 'article');
    });

    it('Is overwritable with styled-components', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const NewCol = styled(Col)`
            background-color: rgb(255, 192, 203);
        `;

        cy.mount(
            <TestWrapper theme={globalCss}>
                <NewCol testId="ColId">&nbsp;</NewCol>
            </TestWrapper>
        );

        cy.getCy('ColId').should('have.css', 'background-color', 'rgb(255, 192, 203)');
    });

    it('Defines padding', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col padding="20px" testId="ColId">&nbsp;</Col>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '20px');
        cy.getCy('ColId').should('have.css', 'padding-right', '20px');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '20px');
        cy.getCy('ColId').should('have.css', 'padding-right', '20px');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '20px');
        cy.getCy('ColId').should('have.css', 'padding-right', '20px');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '20px');
        cy.getCy('ColId').should('have.css', 'padding-right', '20px');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '20px');
        cy.getCy('ColId').should('have.css', 'padding-right', '20px');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '20px');
        cy.getCy('ColId').should('have.css', 'padding-right', '20px');
    });

    it('Defines padding in different screensizes', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col
                    padding={{
                        lg: '40px',
                        xs: '20px'
                    }}
                    testId="ColId"
                >
                    &nbsp;
                </Col>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '20px');
        cy.getCy('ColId').should('have.css', 'padding-right', '20px');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '20px');
        cy.getCy('ColId').should('have.css', 'padding-right', '20px');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '20px');
        cy.getCy('ColId').should('have.css', 'padding-right', '20px');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '40px');
        cy.getCy('ColId').should('have.css', 'padding-right', '40px');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '40px');
        cy.getCy('ColId').should('have.css', 'padding-right', '40px');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '40px');
        cy.getCy('ColId').should('have.css', 'padding-right', '40px');
    });

    it('Defines padding in different screensizes and overwrites paddingLeft and right', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col
                    padding={{
                        lg: '40px',
                        xs: '20px'
                    }}
                    paddingLeft="10px"
                    paddingRight="15px"
                    testId="ColId"
                >
                    &nbsp;
                </Col>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '20px');
        cy.getCy('ColId').should('have.css', 'padding-right', '20px');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '20px');
        cy.getCy('ColId').should('have.css', 'padding-right', '20px');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '20px');
        cy.getCy('ColId').should('have.css', 'padding-right', '20px');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '40px');
        cy.getCy('ColId').should('have.css', 'padding-right', '40px');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '40px');
        cy.getCy('ColId').should('have.css', 'padding-right', '40px');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '40px');
        cy.getCy('ColId').should('have.css', 'padding-right', '40px');
    });

    it('Defines paddingLeft and paddingRight', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col paddingLeft="20px" paddingRight="30px" testId="ColId">&nbsp;</Col>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '20px');
        cy.getCy('ColId').should('have.css', 'padding-right', '30px');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '20px');
        cy.getCy('ColId').should('have.css', 'padding-right', '30px');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '20px');
        cy.getCy('ColId').should('have.css', 'padding-right', '30px');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '20px');
        cy.getCy('ColId').should('have.css', 'padding-right', '30px');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '20px');
        cy.getCy('ColId').should('have.css', 'padding-right', '30px');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '20px');
        cy.getCy('ColId').should('have.css', 'padding-right', '30px');
    });

    it('Defines paddingLeft and paddingRight in different screensizes', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col
                    paddingLeft={{
                        lg: '40px',
                        xs: '20px'
                    }}
                    paddingRight={{
                        lg: '50px',
                        xs: '30px'
                    }}
                    testId="ColId"
                >
                    &nbsp;
                </Col>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '20px');
        cy.getCy('ColId').should('have.css', 'padding-right', '30px');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '20px');
        cy.getCy('ColId').should('have.css', 'padding-right', '30px');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '20px');
        cy.getCy('ColId').should('have.css', 'padding-right', '30px');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '40px');
        cy.getCy('ColId').should('have.css', 'padding-right', '50px');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '40px');
        cy.getCy('ColId').should('have.css', 'padding-right', '50px');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '40px');
        cy.getCy('ColId').should('have.css', 'padding-right', '50px');
    });

    it('Defines paddingLeft only', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col
                    paddingLeft={{
                        lg: '40px',
                        xs: '20px'
                    }}
                    testId="ColId"
                >
                    &nbsp;
                </Col>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '20px');
        cy.getCy('ColId').should('have.css', 'padding-right', '0px');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '20px');
        cy.getCy('ColId').should('have.css', 'padding-right', '0px');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '20px');
        cy.getCy('ColId').should('have.css', 'padding-right', '0px');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '40px');
        cy.getCy('ColId').should('have.css', 'padding-right', '0px');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '40px');
        cy.getCy('ColId').should('have.css', 'padding-right', '0px');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '40px');
        cy.getCy('ColId').should('have.css', 'padding-right', '0px');
    });

    it('Defines paddingRight only', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col
                    paddingRight={{
                        lg: '50px',
                        xs: '30px'
                    }}
                    testId="ColId"
                >
                    &nbsp;
                </Col>
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '0px');
        cy.getCy('ColId').should('have.css', 'padding-right', '30px');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '0px');
        cy.getCy('ColId').should('have.css', 'padding-right', '30px');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '0px');
        cy.getCy('ColId').should('have.css', 'padding-right', '30px');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '0px');
        cy.getCy('ColId').should('have.css', 'padding-right', '50px');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '0px');
        cy.getCy('ColId').should('have.css', 'padding-right', '50px');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('ColId').should('have.css', 'padding-left', '0px');
        cy.getCy('ColId').should('have.css', 'padding-right', '50px');
    });

    it('Calculates sizes for all screens', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col lg={3} md={3} sm={3} testId="ColId" xl={3} xs={3} xxl={3}>&nbsp;</Col>
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
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.differentContainers);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col testId="ColId" xs={3}>&nbsp;</Col>
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
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.differentContainers);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col testId="ColId" xs={80}>&nbsp;</Col>
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
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col testId="ColId">&nbsp;</Col>
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
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col direction="row" testId="ColId">&nbsp;</Col>
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
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col
                    direction={{
                        md: 'column',
                        xs: 'row'
                    }}
                    testId="ColId"
                >
                    &nbsp;
                </Col>
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
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col testId="ColId" isReverse>&nbsp;</Col>
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
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col isReverse={['md', 'xl']} testId="ColId">&nbsp;</Col>
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
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col
                    direction={{
                        md: 'column',
                        xs: 'row'
                    }}
                    isReverse={['sm', 'md', 'xl']}
                    testId="ColId"
                >
                    &nbsp;
                </Col>
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
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col offset={3} testId="ColId">
                    &nbsp;
                </Col>
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
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col offset={{xs: 3}} testId="ColId">&nbsp;</Col>
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
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col
                    offset={{
                        lg: 6,
                        xs: 3
                    }}
                    testId="ColId"
                >
                    &nbsp;
                </Col>
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
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <div style={{display: 'flex'}}>
                    <Col testId="ColId1">&nbsp;</Col>
                    <Col testId="ColId2">&nbsp;</Col>
                </div>
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
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <div style={{display: 'flex'}}>
                    <Col order={2} testId="ColId1">&nbsp;</Col>
                    <Col order={1} testId="ColId2">&nbsp;</Col>
                </div>
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
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <div style={{display: 'flex'}}>
                    <Col
                        order={{
                            lg: 1,
                            xs: 2
                        }}
                        testId="ColId1"
                    >
                            &nbsp;
                    </Col>
                    <Col
                        order={{
                            lg: 2,
                            xs: 1
                        }}
                        testId="ColId2"
                    >
                            &nbsp;
                    </Col>
                </div>
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
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col testId="ColId">&nbsp;</Col>
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
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col align="center" testId="ColId">&nbsp;</Col>
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
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
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
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col testId="ColId">&nbsp;</Col>
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
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col justify="center" testId="ColId">&nbsp;</Col>
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
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
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
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.differentContainers);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col testId="ColId">&nbsp;</Col>
            </TestWrapper>
        );

        cy.get('body').type('{ctrl}D');

        cy.getCy('ColId').should('have.class', 'debug');
        cy.getCy('ColId').should('have.css', 'background-clip', 'content-box, padding-box');
        cy.getCy('ColId').should('have.css', 'outline', 'rgb(255, 255, 255) solid 1px');
    });

    it('Deactivates debug mode if Strg+D is pressed twice', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.differentContainers);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <Col testId="ColId">&nbsp;</Col>
            </TestWrapper>
        );

        cy.get('body').type('{ctrl}D');

        cy.getCy('ColId').should('have.class', 'debug');
        cy.getCy('ColId').should('have.css', 'background-clip', 'content-box, padding-box');
        cy.getCy('ColId').should('have.css', 'outline', 'rgb(255, 255, 255) solid 1px');

        cy.get('body').type('{ctrl}D');

        cy.getCy('ColId').should('not.have.class', 'debug');
    });
});