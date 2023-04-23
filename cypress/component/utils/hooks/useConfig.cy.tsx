/* eslint-disable promise/always-return, promise/prefer-await-to-then, promise/catch-or-return, max-lines, max-len, max-lines-per-function */
import React from 'react';

import {ThemeProvider} from 'styled-components';

import ScreenSizeProvider from '../../../../src/grid/ScreenSizeProvider';
import {useConfig} from '../../../../src/utils/hooks/useConfig';
import {themeConfigs} from '../../../fixtures/themes';


describe('Test useConfig hook', () => {
    it('Is a function', () => {
        expect(useConfig, 'useConfig').to.be.a('function');
    });

    it('should return the theme config', () => {
        cy.mountHook(useConfig).then(({MockComponent, values}) => {
            cy.wrap(values).as('values');
            cy.mount(
                <ThemeProvider theme={{nfqgrid: themeConfigs.differentContainers}}>
                    <ScreenSizeProvider>
                        <MockComponent />
                    </ScreenSizeProvider>
                </ThemeProvider>
            );
        }).then(() => {
            cy.get('@values').should('deep.equal', {current: themeConfigs.differentContainers});
        });
    });
});