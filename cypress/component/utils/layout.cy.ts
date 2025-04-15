/* eslint-disable promise/prefer-await-to-then, promise/catch-or-return, max-lines-per-function */
import {createConfig} from '../../../src/config/config';
import {
    getScreenSize,
    media,
    mediaBetween,
    spacing
} from '../../../src/utils/layout';
import {themeConfigs} from '../../fixtures/themes';

describe('Test layout functions', () => {
    context('Test getScreenSize function', () => {
        it('Is a function', () => {
            expect(getScreenSize, 'getScreenSize').to.be.a('function');
        });

        it('Returns an string', () => {
            assert.typeOf(getScreenSize(), 'string');
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
            createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
            const returnVal = '@media only screen and (min-width: 0px)';

            expect(media('xs')).to.be.eq(returnVal);
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
            createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
            const returnVal = '@media only screen and (min-width: 0px) and (max-width: 575px)';

            expect(mediaBetween('xs', 'sm')).to.be.eq(returnVal);
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
            const returnVal = 'calc(var(--nfq-grid-base-spacing) * 2)';

            expect(spacing(2)).to.be.deep.eq(returnVal);
        });
    });
});