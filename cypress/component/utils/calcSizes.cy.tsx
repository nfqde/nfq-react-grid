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
            '\n                    flex: 0 0 calc(100% / 12 * 1 - var(--column-gap, 0px) + var(--column-gap, 0px) * 1 / 12);\n                    max-width: calc(100% / 12 * 1 - var(--column-gap, 0px) + var(--column-gap, 0px) * 1 / 12);\n                ',
            '\n                    flex: 0 0 min-content;\n                    max-width: min-content;\n                ',
            '\n                    flex: 0 0 max-content;\n                    max-width: max-content;\n                ',
            '\n                    flex: auto;\n                    max-width: initial;\n                ',
            '\n                    flex: 0 0 calc(100% / 12 * 5 - var(--column-gap, 0px) + var(--column-gap, 0px) * 5 / 12);\n                    max-width: calc(100% / 12 * 5 - var(--column-gap, 0px) + var(--column-gap, 0px) * 5 / 12);\n                ',
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
            '\n                    flex: 0 0 calc(100% / 12 * 1 - var(--column-gap, 0px) + var(--column-gap, 0px) * 1 / 12);\n                    max-width: calc(100% / 12 * 1 - var(--column-gap, 0px) + var(--column-gap, 0px) * 1 / 12);\n                ',
            null,
            null,
            null,
            '\n                    flex: 0 0 calc(100% / 12 * 5 - var(--column-gap, 0px) + var(--column-gap, 0px) * 5 / 12);\n                    max-width: calc(100% / 12 * 5 - var(--column-gap, 0px) + var(--column-gap, 0px) * 5 / 12);\n                ',
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
            '\n                    flex: 0 0 calc(100% / 12 * 5 - var(--column-gap, 0px) + var(--column-gap, 0px) * 5 / 12);\n                    max-width: calc(100% / 12 * 5 - var(--column-gap, 0px) + var(--column-gap, 0px) * 5 / 12);\n                ',
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
            '\n                    flex: 0 0 calc(100% / 12 * 12 - var(--column-gap, 0px) + var(--column-gap, 0px) * 12 / 12);\n                    max-width: calc(100% / 12 * 12 - var(--column-gap, 0px) + var(--column-gap, 0px) * 12 / 12);\n                ',
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
            '\n                    flex: 0 0 calc(100% / 4 * 2 - var(--column-gap, 0px) + var(--column-gap, 0px) * 2 / 4);\n                    max-width: calc(100% / 4 * 2 - var(--column-gap, 0px) + var(--column-gap, 0px) * 2 / 4);\n                ',
            null,
            '\n                    flex: 0 0 calc(100% / 8 * 2 - var(--column-gap, 0px) + var(--column-gap, 0px) * 2 / 8);\n                    max-width: calc(100% / 8 * 2 - var(--column-gap, 0px) + var(--column-gap, 0px) * 2 / 8);\n                ',
            null,
            '\n                    flex: 0 0 calc(100% / 12 * 2 - var(--column-gap, 0px) + var(--column-gap, 0px) * 2 / 12);\n                    max-width: calc(100% / 12 * 2 - var(--column-gap, 0px) + var(--column-gap, 0px) * 2 / 12);\n                ',
            null
        ];
        const actualSizeCss = calcSizes({
            $sizes: sizes,
            theme: differentTheme
        });

        expect(actualSizeCss).to.deep.equal(expectedSizeCss);
    });
});