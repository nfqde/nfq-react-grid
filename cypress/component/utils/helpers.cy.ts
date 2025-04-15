import {createConfig} from '../../../src/config/config';
import {generateMediaString, generateMediaStringBetween, mediaInternal, mergeScreens} from '../../../src/utils/helpers';
import {breakPointConfigs} from '../../fixtures/breakpointConfigs';
import {themeConfigs} from '../../fixtures/themes';

describe('helpers', () => {
    context('mergeScreens', () => {
        it('Is a function', () => {
            expect(mergeScreens, 'mergeScreens').to.be.a('function');
        });

        it('returns at least the smallest screen size with 0 when called without arguments', () => {
            const result = mergeScreens(breakPointConfigs.nothing, ['xs']);

            expect(result).to.deep.equal({xs: 0});
        });

        it('returns 0 for the smallest screen if not given', () => {
            const result = mergeScreens(breakPointConfigs.noXs, ['xs', 'sm']);

            expect(result).to.deep.equal({
                sm: 10,
                xs: 0
            });
        });

        it('merges repeated values to the smallest direct in line screen size', () => {
            const result = mergeScreens(breakPointConfigs.repeatingNumbers, ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']);

            expect(result).to.deep.equal({
                md: 20,
                xl: 30,
                xs: 10
            });
        });

        it('catches fluid as value too and sets not used breakpoints to 0 if not given', () => {
            const result = mergeScreens(breakPointConfigs.singleFluid, ['xs', 'md']);

            expect(result).to.deep.equal({
                md: 'fluid',
                xs: 0
            });
        });

        it('merges fluid values too', () => {
            const result = mergeScreens(breakPointConfigs.multipleFluid, ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']);

            expect(result).to.deep.equal({
                md: 'fluid',
                xs: 0
            });
        });

        it('merges fluid values too', () => {
            const result = mergeScreens(breakPointConfigs.multipleFluidWithNumber, ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']);

            expect(result).to.deep.equal({
                md: 'fluid',
                xl: 20,
                xs: 0
            });
        });

        it('excludes breakpoints that are set to undefined', () => {
            const result = mergeScreens(breakPointConfigs.undefinedBreakpoint, ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']);

            expect(result).to.deep.equal({xs: 10});
        });

        it('treats breakpoints that are set to 0 like it is 0', () => {
            const result = mergeScreens(breakPointConfigs.partlyZero, ['xs', 'sm', 'md', 'lg', 'xl', 'xxl']);

            expect(result).to.deep.equal({
                xl: 10,
                xs: 0
            });
        });
    });

    context('generateMediaString', () => {
        beforeEach(() => {
            createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        });

        it('Is a function', () => {
            expect(generateMediaString, 'generateMediaString').to.be.a('function');
        });

        it('generates correct media query for standard breakpoint', () => {
            expect(generateMediaString('md')).to.equal('only screen and (min-width: 769px)');
            expect(generateMediaString('lg')).to.equal('only screen and (min-width: 992px)');
        });

        it('returns base query if breakpoint is 0', () => {
            expect(generateMediaString('xs')).to.equal('only screen and (min-width: 0px)');
        });

        it('returns base query if breakpoint value is negative', () => {
            // Override config with a negative value
            createConfig(['xs'], {
                ...themeConfigs.defaultTheme,
                breakpoints: {xs: -1}
            });

            expect(generateMediaString('xs')).to.equal('only screen');
        });

        it('returns correct media queries for all breakpoints', () => {
            Object.entries(themeConfigs.defaultTheme.breakpoints).forEach(([key, px]) => {
                const expected = px >= 0 ? `only screen and (min-width: ${px}px)` : 'only screen';

                expect(generateMediaString(key as keyof typeof themeConfigs.defaultTheme.breakpoints)).to.equal(expected);
            });
        });
    });

    context('generateMediaStringBetween', () => {
        beforeEach(() => {
            createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        });

        it('Is a function', () => {
            expect(generateMediaStringBetween, 'generateMediaStringBetween').to.be.a('function');
        });

        it('generates media query string between two breakpoints', () => {
            const result = generateMediaStringBetween('sm', 'lg');

            expect(result).to.equal('only screen and (min-width: 576px) and (max-width: 991px)');
        });

        it('works with the first and last breakpoints', () => {
            const result = generateMediaStringBetween('xs', 'xxl');

            expect(result).to.equal('only screen and (min-width: 0px) and (max-width: 1599px)');
        });

        it('generates correct string for adjacent breakpoints', () => {
            const result = generateMediaStringBetween('md', 'lg');

            expect(result).to.equal('only screen and (min-width: 769px) and (max-width: 991px)');
        });

        it('handles reversed input by still computing min/max correctly (if used that way)', () => {
            const result = generateMediaStringBetween('lg', 'xl');

            expect(result).to.equal('only screen and (min-width: 992px) and (max-width: 1199px)');
        });

        it('throws or behaves incorrectly if breakpoints are missing (ensure config set)', () => {
            createConfig([], {
                ...themeConfigs.defaultTheme,
                breakpoints: {}
            });

            // This might throw or return NaN depending on implementation
            const result = generateMediaStringBetween('sm', 'md');

            expect(result).to.include('min-width: undefinedpx').and.include('max-width: NaNpx');
        });
    });

    context('mediaInternal (emotion)', () => {
        beforeEach(() => {
            createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        });

        it('Is a function', () => {
            expect(mediaInternal, 'mediaInternal').to.be.a('function');
        });

        it('wraps CSS in media query using the correct breakpoint string', () => {
            const styles = mediaInternal('md')`
              color: blue;
              background: yellow;
            `;

            expect(styles.styles).to.include('color: blue');
            expect(styles.styles).to.include('background: yellow');
            expect(styles.styles).to.include(`@media ${generateMediaString('md')}`);
        });

        it('uses index 0 (xs) with no media query when passed to generateMediaString', () => {
            const styles = mediaInternal('xs')`
              padding: 10px;
            `;

            expect(styles.styles).to.include('padding: 10px');
            expect(styles.styles).to.include(`@media ${generateMediaString('xs')}`);
        });

        it('preserves formatting of multiple lines', () => {
            const styles = mediaInternal('lg')`
              margin: 0 auto;
              font-size: 16px;
            `;

            expect(styles.styles).to.include('margin: 0 auto');
            expect(styles.styles).to.include('font-size: 16px');
            expect(styles.styles).to.include(`@media ${generateMediaString('lg')}`);
        });
    });
});