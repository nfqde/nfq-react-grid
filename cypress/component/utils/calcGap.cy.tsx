/* eslint-disable max-lines, max-len, max-lines-per-function */
import {calcGap} from '../../../src/utils/styleHelpers';
import {themeConfigs} from '../../fixtures/themes';

describe('Test calcGap function', () => {
    it('Is a function', () => {
        expect(calcGap, 'calcGap').to.be.a('function');
    });

    it('should return configured gaps.', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedOffsetCss = [
            '\n                column-gap: 20px;\n                row-gap: 20px;\n            ',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualOffsetCss = calcGap({
            $hasNoGap: false,
            theme
        });

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should return no gaps.', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedOffsetCss = [
            '\n                column-gap: normal;\n                row-gap: normal;\n            ',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualOffsetCss = calcGap({
            $hasNoGap: true,
            theme
        });

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should return no row-gaps.', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedOffsetCss = [
            '\n                column-gap: 20px;\n                row-gap: normal;\n            ',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualOffsetCss = calcGap({
            $hasNoGap: 'no-row',
            theme
        });

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should return no column-gaps.', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedOffsetCss = [
            '\n                column-gap: normal;\n                row-gap: 20px;\n            ',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualOffsetCss = calcGap({
            $hasNoGap: 'no-column',
            theme
        });

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should return media queries like configuration', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedOffsetCss = [
            '\n                column-gap: normal;\n                row-gap: 20px;\n            ',
            '\n                column-gap: normal;\n                row-gap: normal;\n            ',
            '\n                column-gap: 20px;\n                row-gap: 20px;\n            ',
            '\n                column-gap: 20px;\n                row-gap: normal;\n            ',
            '\n                column-gap: normal;\n                row-gap: normal;\n            ',
            '\n                column-gap: 20px;\n                row-gap: 20px;\n            '
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
            },
            theme
        });

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });
});