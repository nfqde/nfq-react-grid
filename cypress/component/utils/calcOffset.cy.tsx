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
            'margin-left: calc(16.666666666666664% + 10px);',
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
            'margin-left: calc(16.666666666666664% + 10px);',
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
            'margin-left: calc(16.666666666666664% + 10px);',
            'margin-left: calc(50% + 10px);',
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

    it('should cap the offset value to the column count', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedOffsetCss = [
            'margin-left: calc(100% + 10px);',
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
            'margin-left: ;',
            'margin-left: calc(50% + 10px);',
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
            'margin-left: calc(50% + 10px);',
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
            'margin-left: calc(25% + 10px);',
            null,
            'margin-left: calc(50% + 10px);',
            null,
            'margin-left: calc(100% + 10px);',
            'margin-left: calc(50% + 10px);'
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
            'margin-left: calc(75% + 10px);',
            null,
            null,
            null,
            'margin-left: calc(100% + 10px);',
            'margin-left: calc(50% + 10px);'
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