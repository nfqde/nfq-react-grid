/* eslint-disable @nfq/no-magic-numbers, max-lines-per-function, max-len */
import React from 'react';

import {createConfig} from '../../../../src/config/config';
import {Skeleton} from '../../../../src/grid/Skeleton';
import {themeConfigs} from '../../../fixtures/themes';
import TestWrapper from '../../../support/TestWrapper';

describe('Test Skeleton component', () => {
    it('Renders', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <p>
                    <Skeleton testId="SkeletonId" isLoading />
                </p>
            </TestWrapper>
        );

        cy.getCy('SkeletonId').should('exist');
    });

    it('Renders as a span', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <p>
                    <Skeleton testId="SkeletonId" isLoading />
                </p>
            </TestWrapper>
        );

        cy.getCy('SkeletonId').should('be.htmlElement', 'span');
    });

    it('Renders as much lines as given', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <p>
                    <Skeleton count={3} testId="SkeletonId" isLoading />
                </p>
            </TestWrapper>
        );

        cy.getCy('SkeletonId').children().should('have.length', 3);
    });

    it('Renders the skeleton as part of groups', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <p>
                    <Skeleton group="test" testId="SkeletonId" isLoading />
                </p>
                <p>
                    <Skeleton group="test2" testId="SkeletonId2" isLoading />
                </p>
            </TestWrapper>
        );

        cy.getCy('SkeletonId').children().eq(0).should('have.attr', 'data-skeletongroup', 'test');
        cy.getCy('SkeletonId2').children().eq(0).should('have.attr', 'data-skeletongroup', 'test2');
    });

    it('Renders the skeleton as variant given', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <p>
                    <Skeleton group="test" testId="SkeletonId" variant="dark" isLoading />
                </p>
                <p>
                    <Skeleton group="test2" testId="SkeletonId2" variant="light" isLoading />
                </p>
            </TestWrapper>
        );

        cy.getCy('SkeletonId').children().eq(0).should('have.css', 'background-color', 'rgba(0, 0, 102, 0.3)');
        cy.getCy('SkeletonId2').children().eq(0).should('have.css', 'background-color', 'rgba(255, 255, 255, 0.3)');
    });

    it('Renders the skeleton as wide as given', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <p>
                    <Skeleton group="test" testId="SkeletonId" width={20} isLoading />
                </p>
            </TestWrapper>
        );

        cy.getCy('SkeletonId').children().eq(0).should('have.css', 'width', '20px');
    });

    it('Renders the skeleton as wide as given with custom unit', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <p>
                    <Skeleton group="test" testId="SkeletonId" width="3rem" isLoading />
                </p>
            </TestWrapper>
        );

        cy.getCy('SkeletonId').children().eq(0).should('have.css', 'width', '30px');
    });

    it('Renders the skeleton as height as given', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <p>
                    <Skeleton group="test" height={20} testId="SkeletonId" isLoading />
                </p>
            </TestWrapper>
        );

        cy.getCy('SkeletonId').children().eq(0).should('have.css', 'height', '20px');
    });

    it('Renders the skeleton as height as given with custom unit', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <p>
                    <Skeleton group="test" height="3rem" testId="SkeletonId" isLoading />
                </p>
            </TestWrapper>
        );

        cy.getCy('SkeletonId').children().eq(0).should('have.css', 'height', '30px');
    });

    it('Renders the skeleton circular', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <p>
                    <Skeleton group="test" height="3rem" testId="SkeletonId" width="3rem" isCircle isLoading />
                </p>
            </TestWrapper>
        );

        cy.getCy('SkeletonId').children().eq(0).should('have.css', 'height', '30px');
        cy.getCy('SkeletonId').children().eq(0).should('have.css', 'width', '30px');
        cy.getCy('SkeletonId').children().eq(0).should('have.css', 'border-radius', '50%');
    });

    it('Renders its children if isLoading is false', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <p data-cy="SkeletonId">
                    <Skeleton group="test" height="3rem" isLoading={false} width="3rem" isCircle>Test</Skeleton>
                </p>
            </TestWrapper>
        );

        cy.getCy('SkeletonId').should('contain', 'Test');
    });
});