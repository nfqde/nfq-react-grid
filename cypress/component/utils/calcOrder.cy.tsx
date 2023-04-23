/* eslint-disable max-lines, max-len, max-lines-per-function */
import {calcAlignmentProps} from '../../../src/utils/styleHelpers';

describe('Test calcOrder function', () => {
    it('Is a function', () => {
        expect(calcAlignmentProps, 'calcOrder').to.be.a('function');
    });

    it('should return an empty array if the order object is empty', () => {
        const expectedOffsetCss = [
            null,
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualOffsetCss = calcAlignmentProps('$order')({});

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should return an array with media queries for each dimension', () => {
        const expectedOffsetCss = [
            'order: 1;',
            'order: 2;',
            'order: 3;',
            'order: 4;',
            'order: 5;',
            'order: 6;'
        ];
        const actualOffsetCss = calcAlignmentProps('$order')({
            $order: {
                lg: 4,
                md: 3,
                sm: 2,
                xl: 5,
                xs: 1,
                xxl: 6
            }
        });

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should return an array with media queries for only the specified dimensions', () => {
        const expectedOffsetCss = [
            'order: 1;',
            null,
            null,
            'order: 4;',
            null,
            null
        ];
        const actualOffsetCss = calcAlignmentProps('$order')({
            $order: {
                lg: 4,
                xs: 1
            }
        });

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should work with an single number', () => {
        const expectedOffsetCss = [
            'order: 1;',
            null,
            null,
            null,
            null,
            null
        ];
        const actualOffsetCss = calcAlignmentProps('$order')({$order: 1});

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });

    it('should not break with wrong keys', () => {
        const expectedOffsetCss = [
            'order: 1;',
            null,
            null,
            null,
            null,
            null
        ];
        const actualOffsetCss = calcAlignmentProps('$order')({
            $order: {
                xs: 1,
                // @ts-expect-error
                xss: 21,
                xxxs: 124
            }
        });

        expect(actualOffsetCss).to.deep.equal(expectedOffsetCss);
    });
});