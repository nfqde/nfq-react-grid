/* eslint-disable promise/prefer-await-to-then */
/* eslint-disable promise/catch-or-return */
/* eslint-disable @nfq/no-magic-numbers, max-lines-per-function */
import {getConfig, getScreenClass, media} from '../../../src/utils/lib';
import {containerSizes, defaultTheme, mergedTheme} from '../../fixtures/themes';
import {Viewports} from '../../fixtures/viewports';

describe('Test lib functions', () => {
    context('Test getScreenClass function', () => {
        it('Is a function', () => {
            expect(getScreenClass, 'getScreenClass').to.be.a('function');
        });

        it('Returns an string', () => {
            assert.typeOf(getScreenClass(defaultTheme), 'string');
        });

        it('Returns the screen class for the theme breakpoint definition', () => {
            cy.viewport(Viewports.xs[0], Viewports.xs[1]).then(
                () => expect(getScreenClass(containerSizes)).to.be.eq('xs')
            );

            cy.viewport(Viewports.sm[0], Viewports.sm[1]).then(
                () => expect(getScreenClass(containerSizes)).to.be.eq('sm')
            );

            cy.viewport(Viewports.md[0], Viewports.md[1]).then(
                () => expect(getScreenClass(containerSizes)).to.be.eq('md')
            );

            cy.viewport(Viewports.lg[0], Viewports.lg[1]).then(
                () => expect(getScreenClass(containerSizes)).to.be.eq('lg')
            );

            cy.viewport(Viewports.xl[0], Viewports.xl[1]).then(
                () => expect(getScreenClass(containerSizes)).to.be.eq('xl')
            );

            cy.viewport(Viewports.xxl[0], Viewports.xxl[1]).then(
                () => expect(getScreenClass(containerSizes)).to.be.eq('xxl')
            );
        });

        it('Throws if theme is undefined', () => {
            const screenSpy = cy.spy(getScreenClass).as('getScreenClass');

            try {
                screenSpy();
            } catch (e) {}

            expect(screenSpy).to.have.thrown();
        });
    });

    context('Test getConfig function', () => {
        it('Is a function', () => {
            expect(getConfig, 'getConfig').to.be.a('function');
        });

        it('Returns an object', () => {
            assert.typeOf(getConfig(defaultTheme), 'object');
        });

        it('Returns the custom config merged with the defaults', () => {
            expect(getConfig(containerSizes)).to.be.deep.eq(mergedTheme);
        });

        it('Throws if theme is undefined', () => {
            const getConfigSpy = cy.spy(getConfig).as('getConfig');

            try {
                getConfigSpy();
            } catch (e) {}

            expect(getConfigSpy).to.have.thrown();
        });
    });

    context('Test media function', () => {
        it('Is a function', () => {
            expect(media, 'media').to.be.a('function');
        });

        it('Returns an function', () => {
            assert.typeOf(media(defaultTheme), 'function');
        });

        it('Returns the mediaQuery with the css given', () => {
            const returnVal = [
                '@media ',
                'only screen and (min-width: 0px)',
                '{',
                'width: 100%',
                '}'
            ];

            returnVal.isCss = true;

            expect(media(containerSizes, 'xs')`width: 100%`).to.be.deep.eq(returnVal);
        });

        it('Throws if theme is undefined', () => {
            const mediaSpy = cy.spy(media).as('media');

            try {
                mediaSpy();
            } catch (e) {}

            expect(mediaSpy).to.have.thrown();
        });
    });
});