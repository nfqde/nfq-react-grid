/* eslint-disable max-lines, max-len, max-lines-per-function */
import {calcAlignmentProps} from '../../../src/utils/styleHelpers';

describe('Test calcJustify function', () => {
    it('Is a function', () => {
        expect(calcAlignmentProps, 'calcAlignmentProps').to.be.a('function');
    });

    it('should return an array of media queries for each breakpoint when given an object of alignment values', () => {
        const expectedDirectionCss = [
            'justify-content: center;',
            'justify-content: flex-start;',
            'justify-content: flex-end;',
            'justify-content: space-between;',
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcAlignmentProps('$justify')({
            $justify: {
                lg: 'space-between',
                md: 'flex-end',
                sm: 'flex-start',
                xs: 'center'
            }
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return an array of media queries with null values when given an object with missing alignment values', () => {
        const expectedDirectionCss = [
            'justify-content: center;',
            null,
            null,
            'justify-content: space-between;',
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcAlignmentProps('$justify')({
            $justify: {
                lg: 'space-between',
                xs: 'center'
            }
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return an array of media queries with null values when given an empty object', () => {
        const expectedDirectionCss = [
            null,
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcAlignmentProps('$justify')({$justify: {}});

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return the right media queries if direction is only an string', () => {
        const expectedDirectionCss = [
            'justify-content: center;',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcAlignmentProps('$justify')({$justify: 'center'});

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });
});