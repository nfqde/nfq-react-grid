/* eslint-disable max-lines, max-len, max-lines-per-function */
import {createConfig} from '../../../../src/config/config';
import {calcPadding} from '../../../../src/grid/Col/utils';
import {themeConfigs} from '../../../fixtures/themes';

describe('Test calcPadding function', () => {
    it('Is a function', () => {
        expect(calcPadding, 'calcPadding').to.be.a('function');
    });

    it('should return no padding css when nothing is provided', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedPaddingCss = [
            null,
            null,
            null,
            null,
            null,
            null
        ];
        const actualPaddingCss = calcPadding({});

        expect(actualPaddingCss).to.deep.equal(expectedPaddingCss);
    });

    it('should return correct padding css when extraPadding is provided as string', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedPaddingCss = [
            '\n                padding-inline-start: 5px;\n                padding-inline-end: 5px;\n            ',
            null,
            null,
            null,
            null,
            null
        ];
        const actualPaddingCss = calcPadding({$padding: '5px'});

        expect(actualPaddingCss).to.deep.equal(expectedPaddingCss);
    });

    it('should return correct padding css when extraPadding is provided as object', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedPaddingCss = [
            '\n                padding-inline-start: 5px;\n                padding-inline-end: 5px;\n            ',
            null,
            '\n                padding-inline-start: 10px;\n                padding-inline-end: 10px;\n            ',
            null,
            null,
            null
        ];
        const actualPaddingCss = calcPadding({
            $padding: {
                md: '10px',
                xs: '5px'
            }
        });

        expect(actualPaddingCss).to.deep.equal(expectedPaddingCss);
    });

    it('should return correct padding css when extraPadding is provided and extraPaddingLeft', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedPaddingCss = [
            '\n                padding-inline-start: 5px;\n                padding-inline-end: 5px;\n            ',
            null,
            '\n                padding-inline-start: 10px;\n                padding-inline-end: 10px;\n            ',
            null,
            null,
            null
        ];
        const actualPaddingCss = calcPadding({
            $padding: {
                md: '10px',
                xs: '5px'
            },
            $paddingLeft: '10px'
        });

        expect(actualPaddingCss).to.deep.equal(expectedPaddingCss);
    });

    it('should return correct padding css when extraPaddingLeft is provided as string', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedPaddingCss = [
            '\n                padding-inline-start: 10px;\n                padding-inline-end: undefined;\n            ',
            null,
            null,
            null,
            null,
            null
        ];
        const actualPaddingCss = calcPadding({
            // eslint-disable-next-line no-undefined
            $padding: undefined,
            $paddingLeft: '10px'
        });

        expect(actualPaddingCss).to.deep.equal(expectedPaddingCss);
    });

    it('should return correct padding css when extraPaddingLeft is provided as object', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedPaddingCss = [
            '\n                padding-inline-start: 5px;\n                padding-inline-end: undefined;\n            ',
            null,
            '\n                padding-inline-start: 10px;\n                padding-inline-end: undefined;\n            ',
            null,
            null,
            null
        ];
        const actualPaddingCss = calcPadding({
            // eslint-disable-next-line no-undefined
            $padding: undefined,
            $paddingLeft: {
                md: '10px',
                xs: '5px'
            }
        });

        expect(actualPaddingCss).to.deep.equal(expectedPaddingCss);
    });

    it('should return correct padding css when extraPadding is provided and extraPaddingRight', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedPaddingCss = [
            '\n                padding-inline-start: 5px;\n                padding-inline-end: 5px;\n            ',
            null,
            '\n                padding-inline-start: 10px;\n                padding-inline-end: 10px;\n            ',
            null,
            null,
            null
        ];
        const actualPaddingCss = calcPadding({
            $padding: {
                md: '10px',
                xs: '5px'
            },
            // eslint-disable-next-line no-undefined
            $paddingLeft: undefined,
            $paddingRight: '10px'
        });

        expect(actualPaddingCss).to.deep.equal(expectedPaddingCss);
    });

    it('should return correct padding css when extraPaddingRight is provided as string', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedPaddingCss = [
            '\n                padding-inline-start: undefined;\n                padding-inline-end: 10px;\n            ',
            null,
            null,
            null,
            null,
            null
        ];
        const actualPaddingCss = calcPadding({
            // eslint-disable-next-line no-undefined
            $padding: undefined,
            // eslint-disable-next-line no-undefined
            $paddingLeft: undefined,
            $paddingRight: '10px'
        });

        expect(actualPaddingCss).to.deep.equal(expectedPaddingCss);
    });

    it('should return correct padding css when extraPaddingLeft is provided as object', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedPaddingCss = [
            '\n                padding-inline-start: undefined;\n                padding-inline-end: 5px;\n            ',
            null,
            '\n                padding-inline-start: undefined;\n                padding-inline-end: 10px;\n            ',
            null,
            null,
            null
        ];
            // eslint-disable-next-line no-undefined
        const actualPaddingCss = calcPadding({
            // eslint-disable-next-line no-undefined
            $padding: undefined,
            // eslint-disable-next-line no-undefined
            $paddingLeft: undefined,
            $paddingRight: {
                md: '10px',
                xs: '5px'
            }
        });

        expect(actualPaddingCss).to.deep.equal(expectedPaddingCss);
    });

    it('should return correct padding css when extraPaddingLeft and extraPaddingRight are provided as string', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedPaddingCss = [
            '\n                padding-inline-start: 5px;\n                padding-inline-end: 5px;\n            ',
            null,
            null,
            null,
            null,
            null
        ];
        const actualPaddingCss = calcPadding({
            // eslint-disable-next-line no-undefined
            $padding: undefined,
            $paddingLeft: '5px',
            $paddingRight: '5px'
        });

        expect(actualPaddingCss).to.deep.equal(expectedPaddingCss);
    });

    it('should return correct padding css when extraPaddingLeft and extraPaddingRight are provided as object', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedPaddingCss = [
            '\n                padding-inline-start: 5px;\n                padding-inline-end: undefined;\n            ',
            '\n                padding-inline-start: 5px;\n                padding-inline-end: 5px;\n            ',
            '\n                padding-inline-start: 10px;\n                padding-inline-end: 5px;\n            ',
            '\n                padding-inline-start: 10px;\n                padding-inline-end: 10px;\n            ',
            '\n                padding-inline-start: 15px;\n                padding-inline-end: 10px;\n            ',
            '\n                padding-inline-start: 15px;\n                padding-inline-end: 15px;\n            '
        ];
        // eslint-disable-next-line no-undefined
        const actualPaddingCss = calcPadding({
            // eslint-disable-next-line no-undefined
            $padding: undefined,
            $paddingLeft: {
                md: '10px',
                xl: '15px',
                xs: '5px'
            },
            $paddingRight: {
                lg: '10px',
                sm: '5px',
                xxl: '15px'
            }
        });

        expect(actualPaddingCss).to.deep.equal(expectedPaddingCss);
    });
});