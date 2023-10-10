/* eslint-disable max-lines, max-len, max-lines-per-function */
import {calcOffset} from '../../../src/utils/styleHelpers';
import {themeConfigs} from '../../fixtures/themes';

describe('Test calcOffset function', () => {
    it('Is a function', () => {
        expect(calcOffset, 'calcOffset').to.be.a('function');
    });

    it('should return a media query for a given theme and offset number', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedOffsetCss = [
            'margin-left: calc(100% / 12 * 2 + var(--column-gap, 0px) * 2 / 12);',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualOffsetCss = calcOffset({
            $offset: 2,
            theme
        });

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should return a media query for a given theme and offset object', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedOffsetCss = [
            'margin-left: calc(100% / 12 * 2 + var(--column-gap, 0px) * 2 / 12);',
            null,
            null,
            null,
            null,
            null
        ];
        const actualOffsetCss = calcOffset({
            $offset: {xs: 2},
            theme
        });

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should calculate the correct margin left value for each screen size', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedOffsetCss = [
            'margin-left: calc(100% / 12 * 2 + var(--column-gap, 0px) * 2 / 12);',
            'margin-left: calc(100% / 12 * 6 + var(--column-gap, 0px) * 6 / 12);',
            null,
            null,
            null,
            null
        ];
        const actualOffsetCss = calcOffset({
            $offset: {
                sm: 6,
                xs: 2
            },
            theme
        });

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should not cap the offset value to the column count', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedOffsetCss = [
            'margin-left: calc(100% / 12 * 20 + var(--column-gap, 0px) * 20 / 12);',
            null,
            null,
            null,
            null,
            null
        ];
        const actualOffsetCss = calcOffset({
            $offset: {xs: 20},
            theme
        });

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should handle missing offset values correctly', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedOffsetCss = [
            'margin-left: null;',
            'margin-left: calc(100% / 12 * 6 + var(--column-gap, 0px) * 6 / 12);',
            null,
            null,
            null,
            null
        ];
        const actualOffsetCss = calcOffset({
            $offset: {sm: 6},
            theme
        });

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should handle invalid offset values correctly', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedOffsetCss = [
            'margin-left: calc(100% / 12 * 6 + var(--column-gap, 0px) * 6 / 12);',
            null,
            null,
            null,
            null,
            null
        ];
        const actualOffsetCss = calcOffset({
            // @ts-expect-error
            $offset: {xs: '6'},
            theme
        });

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should handle full offset objects correctly', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedOffsetCss = [
            'margin-left: calc(100% / 12 * 3 + var(--column-gap, 0px) * 3 / 12);',
            null,
            'margin-left: calc(100% / 12 * 6 + var(--column-gap, 0px) * 6 / 12);',
            null,
            'margin-left: calc(100% / 12 * 12 + var(--column-gap, 0px) * 12 / 12);',
            'margin-left: calc(100% / 12 * 6 + var(--column-gap, 0px) * 6 / 12);'
        ];
        const actualOffsetCss = calcOffset({
            $offset: {
                lg: 6,
                md: 6,
                sm: 3,
                xl: 12,
                xs: 3,
                xxl: 6
            },
            theme
        });

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should handle full offset objects correctly', () => {
        const theme = {nfqgrid: themeConfigs.differentColumns};
        const expectedOffsetCss = [
            'margin-left: calc(100% / 4 * 3 + var(--column-gap, 0px) * 3 / 4);',
            null,
            'margin-left: calc(100% / 8 * 6 + var(--column-gap, 0px) * 6 / 8);',
            null,
            'margin-left: calc(100% / 12 * 12 + var(--column-gap, 0px) * 12 / 12);',
            'margin-left: calc(100% / 12 * 6 + var(--column-gap, 0px) * 6 / 12);'
        ];
        const actualOffsetCss = calcOffset({
            $offset: {
                lg: 6,
                md: 6,
                sm: 3,
                xl: 12,
                xs: 3,
                xxl: 6
            },
            theme
        });

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });
});