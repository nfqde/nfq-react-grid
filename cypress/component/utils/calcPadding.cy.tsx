/* eslint-disable max-lines, max-len, max-lines-per-function */
import {calcPadding} from '../../../src/utils/styleHelpers';

describe('Test calcPadding function', () => {
    it('Is a function', () => {
        expect(calcPadding, 'calcPadding').to.be.a('function');
    });

    it('should return no padding css when nothing is provided', () => {
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
        const expectedPaddingCss = [
            '\n                padding-left: 5px;\n                padding-right: 5px;\n            ',
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
        const expectedPaddingCss = [
            '\n                padding-left: 5px;\n                padding-right: 5px;\n            ',
            null,
            '\n                padding-left: 10px;\n                padding-right: 10px;\n            ',
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
        const expectedPaddingCss = [
            '\n                padding-left: 5px;\n                padding-right: 5px;\n            ',
            null,
            '\n                padding-left: 10px;\n                padding-right: 10px;\n            ',
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
        const expectedPaddingCss = [
            '\n                padding-left: 10px;\n                padding-right: undefined;\n            ',
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
        const expectedPaddingCss = [
            '\n                padding-left: 5px;\n                padding-right: undefined;\n            ',
            null,
            '\n                padding-left: 10px;\n                padding-right: undefined;\n            ',
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
        const expectedPaddingCss = [
            '\n                padding-left: 5px;\n                padding-right: 5px;\n            ',
            null,
            '\n                padding-left: 10px;\n                padding-right: 10px;\n            ',
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
        const expectedPaddingCss = [
            '\n                padding-left: undefined;\n                padding-right: 10px;\n            ',
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
        const expectedPaddingCss = [
            '\n                padding-left: undefined;\n                padding-right: 5px;\n            ',
            null,
            '\n                padding-left: undefined;\n                padding-right: 10px;\n            ',
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
        const expectedPaddingCss = [
            '\n                padding-left: 5px;\n                padding-right: 5px;\n            ',
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
        const expectedPaddingCss = [
            '\n                padding-left: 5px;\n                padding-right: undefined;\n            ',
            '\n                padding-left: 5px;\n                padding-right: 5px;\n            ',
            '\n                padding-left: 10px;\n                padding-right: 5px;\n            ',
            '\n                padding-left: 10px;\n                padding-right: 10px;\n            ',
            '\n                padding-left: 15px;\n                padding-right: 10px;\n            ',
            '\n                padding-left: 15px;\n                padding-right: 15px;\n            '
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