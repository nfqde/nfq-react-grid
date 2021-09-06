/* eslint-disable @nfq/no-magic-numbers, max-lines-per-function */
import React from 'react';

import {mount} from '@cypress/react';

import ScreenBadge from '../../../src/utils/ScreenBadge';
import {containerSizes} from '../../fixtures/themes';
import {Viewports} from '../../fixtures/viewports';
import TestWrapper from '../../support/TestWrapper';

describe('Test ScreenBadge component', () => {
    it('Shows always the right screen class', () => {
        mount(
            <TestWrapper testId="TestWrapperId" theme={containerSizes}>
                <ScreenBadge />
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.getCy('TestWrapperId').find('div').contains('xs');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.getCy('TestWrapperId').find('div').contains('sm');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.getCy('TestWrapperId').find('div').contains('md');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.getCy('TestWrapperId').find('div').contains('lg');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.getCy('TestWrapperId').find('div').contains('xl');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.getCy('TestWrapperId').find('div').contains('xxl');
    });
});