/* eslint-disable promise/prefer-await-to-then, promise/catch-or-return, max-lines-per-function */
import {
    getConfig,
    getInternalConfig,
    mergeScreens
} from '../../../src/utils/lib';
import {breakPointConfigs} from '../../fixtures/breakpointConfigs';
import {themeConfigs} from '../../fixtures/themes';

describe('Test lib functions', () => {
    context('Test mergeScreens function', () => {
        it('Is a function', () => {
            expect(mergeScreens, 'mergeScreens').to.be.a('function');
        });

        it('returns at least the smallest screen size with 0 when called without arguments', () => {
            const result = mergeScreens(breakPointConfigs.nothing);

            expect(result).to.deep.equal({xs: 0});
        });

        it('returns 0 for the smallest screen if not given', () => {
            const result = mergeScreens(breakPointConfigs.noXs);

            expect(result).to.deep.equal({
                sm: 10,
                xs: 0
            });
        });

        it('merges repeated values to the smallest direct in line screen size', () => {
            const result = mergeScreens(breakPointConfigs.repeatingNumbers);

            expect(result).to.deep.equal({
                md: 20,
                xl: 30,
                xs: 10
            });
        });

        it('catches fluid as value too and sets not used breakpoints to 0 if not given', () => {
            const result = mergeScreens(breakPointConfigs.singleFluid);

            expect(result).to.deep.equal({
                md: 'fluid',
                xs: 0
            });
        });

        it('merges fluid values too', () => {
            const result = mergeScreens(breakPointConfigs.multipleFluid);

            expect(result).to.deep.equal({
                md: 'fluid',
                xs: 0
            });
        });

        it('merges fluid values too', () => {
            const result = mergeScreens(breakPointConfigs.multipleFluidWithNumber);

            expect(result).to.deep.equal({
                md: 'fluid',
                xl: 20,
                xs: 0
            });
        });

        it('excludes breakpoints that are set to undefined', () => {
            const result = mergeScreens(breakPointConfigs.undefinedBreakpoint);

            expect(result).to.deep.equal({xs: 10});
        });

        it('treats breakpoints that are set to 0 like it is 0', () => {
            const result = mergeScreens(breakPointConfigs.partlyZero);

            expect(result).to.deep.equal({
                xl: 10,
                xs: 0
            });
        });
    });

    context('Test getConfig function', () => {
        it('Is a function', () => {
            expect(getConfig, 'getConfig').to.be.a('function');
        });

        it('Returns an object', () => {
            assert.typeOf(getConfig({nfqgrid: themeConfigs.defaultTheme}), 'object');
        });

        it('Returns the custom config merged with the defaults', () => {
            expect(getConfig({nfqgrid: themeConfigs.onlyContainerSet})).to.be.deep.eq(themeConfigs.fullMergedTheme);
        });

        it('Throws if theme is undefined', () => {
            const getConfigSpy = cy.spy(getConfig).as('getConfig');

            try {
                getConfigSpy();
            } catch (e) {}

            expect(getConfigSpy).to.have.thrown();
        });
    });

    context('Test getInternalConfig function', () => {
        it('Is a function', () => {
            expect(getInternalConfig, 'getInternalConfig').to.be.a('function');
        });

        it('Returns an object', () => {
            assert.typeOf(getInternalConfig({nfqgrid: themeConfigs.defaultTheme}), 'object');
        });

        it('Returns the custom config merged with the defaults', () => {
            expect(getInternalConfig({nfqgrid: themeConfigs.onlyContainerSet})).to.be.deep.eq(themeConfigs.mergedTheme);
        });

        it('Throws if theme is undefined', () => {
            expect(() => getInternalConfig({})).to.throw('Theme must be a grid config theme.');
        });
    });
});