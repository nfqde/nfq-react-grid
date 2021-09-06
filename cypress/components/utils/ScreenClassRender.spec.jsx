/* eslint-disable @nfq/no-magic-numbers, max-lines-per-function */
import React from 'react';

import {mount} from '@cypress/react';

import ScreenClassRender from '../../../src/utils/ScreenClassRender';
import {containerSizes} from '../../fixtures/themes';
import {Viewports} from '../../fixtures/viewports';
import TestWrapper from '../../support/TestWrapper';

describe('Test ScreenClassRender component', () => {
    it('Calls render function with right screen class', () => {
        const render = cy.spy(screenSize => <div>{screenSize}</div>).as('renderFunc');

        mount(
            <TestWrapper testId="TestWrapperId" theme={containerSizes}>
                <ScreenClassRender render={render} />
            </TestWrapper>
        );

        cy.viewport(Viewports.xs[0], Viewports.xs[1]);
        cy.get('@renderFunc').should('have.been.called.with', 'xs');
        cy.getCy('TestWrapperId').find('div').contains('xs');

        cy.viewport(Viewports.sm[0], Viewports.sm[1]);
        cy.get('@renderFunc').should('have.been.called.with', 'sm');
        cy.getCy('TestWrapperId').find('div').contains('sm');

        cy.viewport(Viewports.md[0], Viewports.md[1]);
        cy.get('@renderFunc').should('have.been.called.with', 'md');
        cy.getCy('TestWrapperId').find('div').contains('md');

        cy.viewport(Viewports.lg[0], Viewports.lg[1]);
        cy.get('@renderFunc').should('have.been.called.with', 'lg');
        cy.getCy('TestWrapperId').find('div').contains('lg');

        cy.viewport(Viewports.xl[0], Viewports.xl[1]);
        cy.get('@renderFunc').should('have.been.called.with', 'xl');
        cy.getCy('TestWrapperId').find('div').contains('xl');

        cy.viewport(Viewports.xxl[0], Viewports.xxl[1]);
        cy.get('@renderFunc').should('have.been.called.with', 'xxl');
        cy.getCy('TestWrapperId').find('div').contains('xxl');
    });
});