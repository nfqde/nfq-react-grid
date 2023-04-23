/* eslint-disable max-len */
/* eslint-disable max-lines-per-function, @typescript-eslint/no-unused-expressions */
import {calcSizes} from '../../../src/utils/styleHelpers';
import {themeConfigs} from '../../fixtures/themes';

const theme = {nfqgrid: themeConfigs.defaultTheme};
const differentTheme = {nfqgrid: themeConfigs.differentColumns};

describe('Test calcSizes function', () => {
    it('Is a function', () => {
        expect(calcSizes, 'calcSizes').to.be.a('function');
    });

    it('should return null if sizes object is empty', () => {
        const result = calcSizes({
            $sizes: {},
            theme
        });

        expect(result).to.be.null;
    });

    it('should calculate flex and max-width for each screen size', () => {
        const sizes = {
            lg: 'auto' as const,
            md: 'max-content' as const,
            sm: 'min-content' as const,
            xl: 5,
            xs: 1
        };
        const expectedSizeCss = [
            '\n                    flex: 1 1 8.333333333333332%;\n                    max-width: 8.333333333333332%;\n                ',
            '\n                    flex: 1 1 min-content;\n                    max-width: min-content;\n                ',
            '\n                    flex: 1 1 max-content;\n                    max-width: max-content;\n                ',
            '\n                    flex: auto;\n                    max-width: initial;\n                ',
            '\n                    flex: 1 1 41.66666666666667%;\n                    max-width: 41.66666666666667%;\n                ',
            null
        ];
        // eslint-disable-next-line no-undefined, @nfq/no-magic-numbers
        const actualSizeCss = calcSizes({
            $sizes: sizes,
            theme
        });

        expect(actualSizeCss).to.deep.equal(expectedSizeCss);
    });

    it('should not calculate flex css for items not specified', () => {
        const sizes = {
            xl: 5,
            xs: 1
        };
        const expectedSizeCss = [
            '\n                    flex: 1 1 8.333333333333332%;\n                    max-width: 8.333333333333332%;\n                ',
            null,
            null,
            null,
            '\n                    flex: 1 1 41.66666666666667%;\n                    max-width: 41.66666666666667%;\n                ',
            null
        ];
        const actualSizeCss = calcSizes({
            $sizes: sizes,
            theme
        });

        expect(actualSizeCss).to.deep.equal(expectedSizeCss);
    });

    it('should auto xs if not specified flex css for items not specified', () => {
        const sizes = {xl: 5};
        const expectedSizeCss = [
            '\n                    flex: auto;\n                    max-width: initial;\n                ',
            null,
            null,
            null,
            '\n                    flex: 1 1 41.66666666666667%;\n                    max-width: 41.66666666666667%;\n                ',
            null
        ];
        const actualSizeCss = calcSizes({
            $sizes: sizes,
            theme
        });

        expect(actualSizeCss).to.deep.equal(expectedSizeCss);
    });

    it('should cap at max column size if its too much', () => {
        const sizes = {xl: 100};
        const expectedSizeCss = [
            '\n                    flex: auto;\n                    max-width: initial;\n                ',
            null,
            null,
            null,
            '\n                    flex: 1 1 100%;\n                    max-width: 100%;\n                ',
            null
        ];
        const actualSizeCss = calcSizes({
            $sizes: sizes,
            theme
        });

        expect(actualSizeCss).to.deep.equal(expectedSizeCss);
    });

    it('should compensate different column counts', () => {
        const sizes = {xs: 2};
        const expectedSizeCss = [
            '\n                    flex: 1 1 50%;\n                    max-width: 50%;\n                ',
            null,
            '\n                    flex: 1 1 25%;\n                    max-width: 25%;\n                ',
            null,
            '\n                    flex: 1 1 16.666666666666664%;\n                    max-width: 16.666666666666664%;\n                ',
            null
        ];
        const actualSizeCss = calcSizes({
            $sizes: sizes,
            theme: differentTheme
        });

        expect(actualSizeCss).to.deep.equal(expectedSizeCss);
    });
});