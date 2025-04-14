/* eslint-disable max-lines, max-len, max-lines-per-function */
import {createConfig} from '../../../../src/config/config';
import {calcGap} from '../../../../src/grid/Row/utils';
import {themeConfigs} from '../../../fixtures/themes';

describe('Test calcGap function', () => {
    it('Is a function', () => {
        expect(calcGap, 'calcGap').to.be.a('function');
    });

    it('should return configured gaps.', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedOffsetCss = [
            '\n                --column-gap: var(--nfq-grid-column-gap);\n                column-gap: var(--column-gap);\n                row-gap: var(--nfq-grid-column-gap);\n            ',
            null,
            null,
            null,
            null,
            null
        ];
        const actualOffsetCss = calcGap({$hasNoGap: false});

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should return configured gaps with default.', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedOffsetCss = [
            '\n                --column-gap: var(--nfq-grid-column-gap);\n                column-gap: var(--column-gap);\n                row-gap: var(--nfq-grid-column-gap);\n            ',
            null,
            null,
            null,
            null,
            null
        ];
        const actualOffsetCss = calcGap({});

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should return no gaps.', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedOffsetCss = [
            '\n                --column-gap: 0px;\n                column-gap: var(--column-gap);\n                row-gap: 0px;\n            ',
            null,
            null,
            null,
            null,
            null
        ];
        const actualOffsetCss = calcGap({$hasNoGap: true});

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should return no row-gaps.', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedOffsetCss = [
            '\n                --column-gap: var(--nfq-grid-column-gap);\n                column-gap: var(--column-gap);\n                row-gap: 0px;\n            ',
            null,
            null,
            null,
            null,
            null
        ];
        const actualOffsetCss = calcGap({$hasNoGap: 'no-row'});

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should return no column-gaps.', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedOffsetCss = [
            '\n                --column-gap: 0px;\n                column-gap: var(--column-gap);\n                row-gap: var(--nfq-grid-column-gap);\n            ',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualOffsetCss = calcGap({$hasNoGap: 'no-column'});

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should return media queries like configuration', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedOffsetCss = [
            '\n                --column-gap: 0px;\n                column-gap: var(--column-gap);\n                row-gap: var(--nfq-grid-column-gap);\n            ',
            '\n                --column-gap: 0px;\n                column-gap: var(--column-gap);\n                row-gap: 0px;\n            ',
            '\n                --column-gap: var(--nfq-grid-column-gap);\n                column-gap: var(--column-gap);\n                row-gap: var(--nfq-grid-column-gap);\n            ',
            '\n                --column-gap: var(--nfq-grid-column-gap);\n                column-gap: var(--column-gap);\n                row-gap: 0px;\n            ',
            '\n                --column-gap: 0px;\n                column-gap: var(--column-gap);\n                row-gap: 0px;\n            ',
            '\n                --column-gap: var(--nfq-grid-column-gap);\n                column-gap: var(--column-gap);\n                row-gap: var(--nfq-grid-column-gap);\n            '
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualOffsetCss = calcGap({
            $hasNoGap: {
                lg: 'no-row',
                md: false,
                sm: true,
                xl: true,
                xs: 'no-column',
                xxl: false
            }
        });

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });
});