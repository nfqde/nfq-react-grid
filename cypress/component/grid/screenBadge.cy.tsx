/* eslint-disable @nfq/no-magic-numbers, max-lines-per-function, react-hooks-ssr/react-hooks-global-ssr */
import React from 'react';

import {createConfig} from '../../../src/config/config';
import {ScreenBadge} from '../../../src/grid/ScreenBadge';
import {themeConfigs} from '../../fixtures/themes';
import {Viewports} from '../../fixtures/viewports';
import TestWrapper from '../../support/TestWrapper';

describe('Test ScreenBadge component', () => {
    it('Shows always the right screen class', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.differentContainers);

        cy.mount(
            <TestWrapper testId="TestWrapperId" theme={globalCss}>
                <ScreenBadge />
            </TestWrapper>
        );

        cy.window().then(win => {
            cy.viewport(Viewports.xs[0], Viewports.xs[1]);
            cy.getCy('TestWrapperId').find('div').then($el => {
                const before = win.getComputedStyle($el[0], '::before');
                const beforeContent = before.getPropertyValue('content');

                expect(beforeContent).to.eq('"xs"');
            });

            cy.viewport(Viewports.sm[0], Viewports.sm[1]);
            cy.getCy('TestWrapperId').find('div').then($el => {
                const before = win.getComputedStyle($el[0], '::before');
                const beforeContent = before.getPropertyValue('content');

                expect(beforeContent).to.eq('"sm"');
            });

            cy.viewport(Viewports.md[0], Viewports.md[1]);
            cy.getCy('TestWrapperId').find('div').then($el => {
                const before = win.getComputedStyle($el[0], '::before');
                const beforeContent = before.getPropertyValue('content');

                expect(beforeContent).to.eq('"md"');
            });

            cy.viewport(Viewports.lg[0], Viewports.lg[1]);
            cy.getCy('TestWrapperId').find('div').then($el => {
                const before = win.getComputedStyle($el[0], '::before');
                const beforeContent = before.getPropertyValue('content');

                expect(beforeContent).to.eq('"lg"');
            });

            cy.viewport(Viewports.xl[0], Viewports.xl[1]);
            cy.getCy('TestWrapperId').find('div').then($el => {
                const before = win.getComputedStyle($el[0], '::before');
                const beforeContent = before.getPropertyValue('content');

                expect(beforeContent).to.eq('"xl"');
            });

            cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
            cy.getCy('TestWrapperId').find('div').then($el => {
                const before = win.getComputedStyle($el[0], '::before');
                const beforeContent = before.getPropertyValue('content');

                expect(beforeContent).to.eq('"xxl"');
            });
        });
    });
});