/* eslint-disable max-len */
/* eslint-disable max-lines-per-function, @typescript-eslint/no-unused-expressions */
import {createConfig} from '../../../../src/config/config';
import {calcSizes} from '../../../../src/grid/Col/utils';
import {themeConfigs} from '../../../fixtures/themes';

describe('Test calcSizes function', () => {
    it('Is a function', () => {
        expect(calcSizes, 'calcSizes').to.be.a('function');
    });

    it('should return null if sizes object is empty', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const result = calcSizes({$sizes: {}});

        expect(result).to.be.null;
    });

    it('should calculate flex and max-width for each screen size', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const sizes = {
            lg: 'auto' as const,
            md: 'max-content' as const,
            sm: 'min-content' as const,
            xl: 5,
            xs: 1
        };
        const expectedSizeCss = [
            '\n                    flex: 0 0 calc(100% / var(--nfq-grid-columns) * clamp(1, 1, var(--nfq-grid-columns)) - var(--column-gap, 0px) + var(--column-gap, 0px) * clamp(1, 1, var(--nfq-grid-columns)) / var(--nfq-grid-columns));\n                    max-width: calc(100% / var(--nfq-grid-columns) * clamp(1, 1, var(--nfq-grid-columns)) - var(--column-gap, 0px) + var(--column-gap, 0px) * clamp(1, 1, var(--nfq-grid-columns)) / var(--nfq-grid-columns));\n                ',
            '\n                    flex: 0 0 min-content;\n                    max-width: min-content;\n                ',
            '\n                    flex: 0 0 max-content;\n                    max-width: max-content;\n                ',
            '\n                    flex: auto;\n                    max-width: initial;\n                ',
            '\n                    flex: 0 0 calc(100% / var(--nfq-grid-columns) * clamp(1, 5, var(--nfq-grid-columns)) - var(--column-gap, 0px) + var(--column-gap, 0px) * clamp(1, 5, var(--nfq-grid-columns)) / var(--nfq-grid-columns));\n                    max-width: calc(100% / var(--nfq-grid-columns) * clamp(1, 5, var(--nfq-grid-columns)) - var(--column-gap, 0px) + var(--column-gap, 0px) * clamp(1, 5, var(--nfq-grid-columns)) / var(--nfq-grid-columns));\n                ',
            null
        ];
        // eslint-disable-next-line no-undefined, @nfq/no-magic-numbers
        const actualSizeCss = calcSizes({$sizes: sizes});

        expect(actualSizeCss).to.deep.equal(expectedSizeCss);
    });

    it('should not calculate flex css for items not specified', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const sizes = {
            xl: 5,
            xs: 1
        };
        const expectedSizeCss = [
            '\n                    flex: 0 0 calc(100% / var(--nfq-grid-columns) * clamp(1, 1, var(--nfq-grid-columns)) - var(--column-gap, 0px) + var(--column-gap, 0px) * clamp(1, 1, var(--nfq-grid-columns)) / var(--nfq-grid-columns));\n                    max-width: calc(100% / var(--nfq-grid-columns) * clamp(1, 1, var(--nfq-grid-columns)) - var(--column-gap, 0px) + var(--column-gap, 0px) * clamp(1, 1, var(--nfq-grid-columns)) / var(--nfq-grid-columns));\n                ',
            null,
            null,
            null,
            '\n                    flex: 0 0 calc(100% / var(--nfq-grid-columns) * clamp(1, 5, var(--nfq-grid-columns)) - var(--column-gap, 0px) + var(--column-gap, 0px) * clamp(1, 5, var(--nfq-grid-columns)) / var(--nfq-grid-columns));\n                    max-width: calc(100% / var(--nfq-grid-columns) * clamp(1, 5, var(--nfq-grid-columns)) - var(--column-gap, 0px) + var(--column-gap, 0px) * clamp(1, 5, var(--nfq-grid-columns)) / var(--nfq-grid-columns));\n                ',
            null
        ];
        const actualSizeCss = calcSizes({$sizes: sizes});

        expect(actualSizeCss).to.deep.equal(expectedSizeCss);
    });

    it('should auto xs if not specified flex css for items not specified', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const sizes = {xl: 5};
        const expectedSizeCss = [
            '\n                    flex: auto;\n                    max-width: initial;\n                ',
            null,
            null,
            null,
            '\n                    flex: 0 0 calc(100% / var(--nfq-grid-columns) * clamp(1, 5, var(--nfq-grid-columns)) - var(--column-gap, 0px) + var(--column-gap, 0px) * clamp(1, 5, var(--nfq-grid-columns)) / var(--nfq-grid-columns));\n                    max-width: calc(100% / var(--nfq-grid-columns) * clamp(1, 5, var(--nfq-grid-columns)) - var(--column-gap, 0px) + var(--column-gap, 0px) * clamp(1, 5, var(--nfq-grid-columns)) / var(--nfq-grid-columns));\n                ',
            null
        ];
        const actualSizeCss = calcSizes({$sizes: sizes});

        expect(actualSizeCss).to.deep.equal(expectedSizeCss);
    });

    it('should cap at max column size if its too much', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const sizes = {xl: 100};
        const expectedSizeCss = [
            '\n                    flex: auto;\n                    max-width: initial;\n                ',
            null,
            null,
            null,
            '\n                    flex: 0 0 calc(100% / var(--nfq-grid-columns) * clamp(1, 100, var(--nfq-grid-columns)) - var(--column-gap, 0px) + var(--column-gap, 0px) * clamp(1, 100, var(--nfq-grid-columns)) / var(--nfq-grid-columns));\n                    max-width: calc(100% / var(--nfq-grid-columns) * clamp(1, 100, var(--nfq-grid-columns)) - var(--column-gap, 0px) + var(--column-gap, 0px) * clamp(1, 100, var(--nfq-grid-columns)) / var(--nfq-grid-columns));\n                ',
            null
        ];
        const actualSizeCss = calcSizes({$sizes: sizes});

        expect(actualSizeCss).to.deep.equal(expectedSizeCss);
    });

    it('should compensate different column counts', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.differentColumns);
        const sizes = {xs: 2};
        const expectedSizeCss = [
            '\n                    flex: 0 0 calc(100% / var(--nfq-grid-columns) * clamp(1, 2, var(--nfq-grid-columns)) - var(--column-gap, 0px) + var(--column-gap, 0px) * clamp(1, 2, var(--nfq-grid-columns)) / var(--nfq-grid-columns));\n                    max-width: calc(100% / var(--nfq-grid-columns) * clamp(1, 2, var(--nfq-grid-columns)) - var(--column-gap, 0px) + var(--column-gap, 0px) * clamp(1, 2, var(--nfq-grid-columns)) / var(--nfq-grid-columns));\n                ',
            null,
            null,
            null,
            null,
            null
        ];
        const actualSizeCss = calcSizes({$sizes: sizes});

        expect(actualSizeCss).to.deep.equal(expectedSizeCss);
    });
});