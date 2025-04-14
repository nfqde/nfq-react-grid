/* eslint-disable max-lines, max-len, max-lines-per-function */
import {createConfig} from '../../../../src/config/config';
import {calcOffset} from '../../../../src/grid/Col/utils';
import {themeConfigs} from '../../../fixtures/themes';

describe('Test calcOffset function', () => {
    it('Is a function', () => {
        expect(calcOffset, 'calcOffset').to.be.a('function');
    });

    it('should return a media query for a given theme and offset number', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedOffsetCss = [
            'margin-inline-start: calc(100% / var(--nfq-grid-columns) * 2 + var(--column-gap, 0px) * 2 / var(--nfq-grid-columns));',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualOffsetCss = calcOffset({$offset: 2});

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should return a media query for a given theme and offset object', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedOffsetCss = [
            'margin-inline-start: calc(100% / var(--nfq-grid-columns) * 2 + var(--column-gap, 0px) * 2 / var(--nfq-grid-columns));',
            null,
            null,
            null,
            null,
            null
        ];
        const actualOffsetCss = calcOffset({$offset: {xs: 2}});

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should calculate the correct margin left value for each screen size', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedOffsetCss = [
            'margin-inline-start: calc(100% / var(--nfq-grid-columns) * 2 + var(--column-gap, 0px) * 2 / var(--nfq-grid-columns));',
            'margin-inline-start: calc(100% / var(--nfq-grid-columns) * 6 + var(--column-gap, 0px) * 6 / var(--nfq-grid-columns));',
            null,
            null,
            null,
            null
        ];
        const actualOffsetCss = calcOffset({
            $offset: {
                sm: 6,
                xs: 2
            }
        });

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should not cap the offset value to the column count', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedOffsetCss = [
            'margin-inline-start: calc(100% / var(--nfq-grid-columns) * 20 + var(--column-gap, 0px) * 20 / var(--nfq-grid-columns));',
            null,
            null,
            null,
            null,
            null
        ];
        const actualOffsetCss = calcOffset({$offset: {xs: 20}});

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should handle missing offset values correctly', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedOffsetCss = [
            null,
            'margin-inline-start: calc(100% / var(--nfq-grid-columns) * 6 + var(--column-gap, 0px) * 6 / var(--nfq-grid-columns));',
            null,
            null,
            null,
            null
        ];
        const actualOffsetCss = calcOffset({$offset: {sm: 6}});

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should handle invalid offset values correctly', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedOffsetCss = [
            'margin-inline-start: calc(100% / var(--nfq-grid-columns) * 6 + var(--column-gap, 0px) * 6 / var(--nfq-grid-columns));',
            null,
            null,
            null,
            null,
            null
        ];
        const actualOffsetCss = calcOffset({
            // @ts-expect-error
            $offset: {xs: '6'}
        });

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should handle full offset objects correctly', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedOffsetCss = [
            'margin-inline-start: calc(100% / var(--nfq-grid-columns) * 3 + var(--column-gap, 0px) * 3 / var(--nfq-grid-columns));',
            null,
            'margin-inline-start: calc(100% / var(--nfq-grid-columns) * 6 + var(--column-gap, 0px) * 6 / var(--nfq-grid-columns));',
            null,
            'margin-inline-start: calc(100% / var(--nfq-grid-columns) * 12 + var(--column-gap, 0px) * 12 / var(--nfq-grid-columns));',
            'margin-inline-start: calc(100% / var(--nfq-grid-columns) * 6 + var(--column-gap, 0px) * 6 / var(--nfq-grid-columns));'
        ];
        const actualOffsetCss = calcOffset({
            $offset: {
                lg: 6,
                md: 6,
                sm: 3,
                xl: 12,
                xs: 3,
                xxl: 6
            }
        });

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should handle full offset objects correctly', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.differentColumns);
        const expectedOffsetCss = [
            'margin-inline-start: calc(100% / var(--nfq-grid-columns) * 3 + var(--column-gap, 0px) * 3 / var(--nfq-grid-columns));',
            null,
            'margin-inline-start: calc(100% / var(--nfq-grid-columns) * 6 + var(--column-gap, 0px) * 6 / var(--nfq-grid-columns));',
            null,
            'margin-inline-start: calc(100% / var(--nfq-grid-columns) * 12 + var(--column-gap, 0px) * 12 / var(--nfq-grid-columns));',
            'margin-inline-start: calc(100% / var(--nfq-grid-columns) * 6 + var(--column-gap, 0px) * 6 / var(--nfq-grid-columns));'
        ];
        const actualOffsetCss = calcOffset({
            $offset: {
                lg: 6,
                md: 6,
                sm: 3,
                xl: 12,
                xs: 3,
                xxl: 6
            }
        });

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });
});