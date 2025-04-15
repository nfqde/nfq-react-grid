/* eslint-disable promise/always-return, promise/prefer-await-to-then, promise/catch-or-return, max-lines, max-len, max-lines-per-function */
import React from 'react';

import {useDebug} from '../../../../src/grid/hooks/useDebug';

describe('Test useDebug hook', () => {
    it('Is a function', () => {
        expect(useDebug, 'useDebug').to.be.a('function');
    });

    it('should return no class', () => {
        cy.mountHook(useDebug).then(({MockComponent, values}) => {
            cy.wrap(values).as('values');
            cy.mount(<MockComponent />);
        }).then(() => {
            cy.get('@values').should('have.property', 'current', '');
        });
    });

    it('should return the debug class after pressing strg+D', () => {
        cy.mountHook(useDebug).then(({MockComponent, values}) => {
            cy.wrap(values).as('values');
            cy.mount(<MockComponent />);
        }).then(() => {
            cy.get('body').type('{ctrl}D');
        }).then(() => {
            cy.get('@values').should('have.property', 'current', 'debug');
        });
    });
});