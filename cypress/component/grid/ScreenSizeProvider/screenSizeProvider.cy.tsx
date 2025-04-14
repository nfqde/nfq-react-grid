/* eslint-disable @nfq/no-magic-numbers, max-lines-per-function, max-len */
import React, {useContext} from 'react';

import {createConfig} from '../../../../src/config/config';
import {ScreenSizeContext} from '../../../../src/grid/ScreenSizeProvider';
import {themeConfigs} from '../../../fixtures/themes';
import TestWrapper from '../../../support/TestWrapper';

/**
 * TestComponent is a simple component that uses the ScreenSizeContext to display the current screen size.
 *
 * @returns The rendered component.
 */
const TestComponent = () => {
    const context = useContext(ScreenSizeContext);

    return (
        <div>
            <div data-cy="screen-size">{context.screenSize}</div>
        </div>
    );
};

describe('Test ScreenSizeProvider component', () => {
    it('Renders children inside <ScreenSizeProvider>', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <div data-cy="child">I am a child</div>
            </TestWrapper>
        );

        cy.getCy('child').should('have.text', 'I am a child');
    });

    it('Provides screenSize and skeletonStore from useScreenSizeProvider', () => {
        const {globalCss} = createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        cy.mount(
            <TestWrapper theme={globalCss}>
                <TestComponent />
            </TestWrapper>
        );

        cy.getCy('screen-size').should('have.text', 'xs');
    });
});