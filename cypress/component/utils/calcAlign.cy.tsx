/* eslint-disable max-lines, max-len, max-lines-per-function */
import {calcAlignmentProps} from '../../../src/utils/styleHelpers';

describe('Test calcAlign function', () => {
    it('Is a function', () => {
        expect(calcAlignmentProps, 'calcAlignmentProps').to.be.a('function');
    });

    it('should return an array of media queries for each breakpoint when given an object of alignment values', () => {
        const expectedDirectionCss = [
            'align-items: center;',
            'align-items: flex-start;',
            'align-items: flex-end;',
            'align-items: baseline;',
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcAlignmentProps('$align')({
            $align: {
                lg: 'baseline',
                md: 'flex-end',
                sm: 'flex-start',
                xs: 'center'
            }
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return an array of media queries with null values when given an object with missing alignment values', () => {
        const expectedDirectionCss = [
            'align-items: center;',
            null,
            null,
            'align-items: baseline;',
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcAlignmentProps('$align')({
            $align: {
                lg: 'baseline',
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
        const actualDirectionCss = calcAlignmentProps('$align')({$align: {}});

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return the right media queries if direction is only an string', () => {
        const expectedDirectionCss = [
            'align-items: center;',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcAlignmentProps('$align')({$align: 'center'});

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });
});