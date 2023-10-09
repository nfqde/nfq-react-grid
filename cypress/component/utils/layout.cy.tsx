/* eslint-disable promise/prefer-await-to-then, promise/catch-or-return, max-lines-per-function */
import {
    getScreenSize,
    media,
    mediaBetween,
    spacing
} from '../../../src/utils/layout';
import {themeConfigs} from '../../fixtures/themes';
import {Viewports} from '../../fixtures/viewports';

describe('Test lib functions', () => {
    context('Test getScreenSize function', () => {
        it('Is a function', () => {
            expect(getScreenSize, 'getScreenSize').to.be.a('function');
        });

        it('Returns an string', () => {
            assert.typeOf(getScreenSize({nfqgrid: themeConfigs.defaultTheme}), 'string');
        });

        it('Returns the screen class for the theme breakpoint definition', () => {
            cy.viewport(Viewports.xs[0], Viewports.xs[1]).then(
                () => expect(getScreenSize({nfqgrid: themeConfigs.differentContainers})).to.be.eq('xs')
            );

            cy.viewport(Viewports.sm[0], Viewports.sm[1]).then(
                () => expect(getScreenSize({nfqgrid: themeConfigs.differentContainers})).to.be.eq('sm')
            );

            cy.viewport(Viewports.md[0], Viewports.md[1]).then(
                () => expect(getScreenSize({nfqgrid: themeConfigs.differentContainers})).to.be.eq('md')
            );

            cy.viewport(Viewports.lg[0], Viewports.lg[1]).then(
                () => expect(getScreenSize({nfqgrid: themeConfigs.differentContainers})).to.be.eq('lg')
            );

            cy.viewport(Viewports.xl[0], Viewports.xl[1]).then(
                () => expect(getScreenSize({nfqgrid: themeConfigs.differentContainers})).to.be.eq('xl')
            );

            cy.viewport(Viewports.xxl[0], Viewports.xxl[1]).then(
                () => expect(getScreenSize({nfqgrid: themeConfigs.differentContainers})).to.be.eq('xxl')
            );
        });

        it('Throws if theme is undefined', () => {
            expect(() => getScreenSize({})).to.throw('Theme must be a grid config theme.');
        });
    });

    context('Test media function', () => {
        it('Is a function', () => {
            expect(media, 'media').to.be.a('function');
        });

        it('Returns an function', () => {
            assert.typeOf(media, 'function');
        });

        it('Returns the mediaQuery with the css given', () => {
            const returnVal = [
                '@media ',
                'only screen and (min-width: 0px)'
            ];

            expect(media('xs', {nfqgrid: themeConfigs.differentContainers})).to.be.deep.eq(returnVal);
        });

        it('Throws if theme is undefined', () => {
            expect(() => media('xs', {})).to.throw('Theme must be a grid config theme.');
        });
    });

    context('Test mediaBetween function', () => {
        it('Is a function', () => {
            expect(mediaBetween, 'mediaBetween').to.be.a('function');
        });

        it('Returns an function', () => {
            assert.typeOf(mediaBetween, 'function');
        });

        it('Returns the mediaQuery with the css given', () => {
            const returnVal = [
                '@media ',
                'only screen and (min-width: 0px) and (max-width: 575px)'
            ];

            expect(mediaBetween('xs', 'sm', {nfqgrid: themeConfigs.differentContainers})).to.be.deep.eq(returnVal);
        });

        it('Throws if theme is undefined', () => {
            expect(() => mediaBetween('xs', 'sm', {})).to.throw('Theme must be a grid config theme.');
        });
    });

    context('Test spacing function', () => {
        it('Is a function', () => {
            expect(spacing, 'spacing').to.be.a('function');
        });

        it('Returns a function', () => {
            assert.typeOf(spacing, 'function');
        });

        it('Returns the mediaQuery with the css given', () => {
            const returnVal = '1rem';

            // @ts-expect-error
            expect(spacing(2)({theme: {nfqgrid: themeConfigs.differentContainers}})).to.be.deep.eq(returnVal);
        });
    });
});