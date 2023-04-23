/* eslint-disable max-lines, max-len, max-lines-per-function */
import {calcSpacerInline} from '../../../src/utils/styleHelpers';

describe('Test calcSpacerInline function', () => {
    it('Is a function', () => {
        expect(calcSpacerInline, 'calcSpacerInline').to.be.a('function');
    });

    it('should return an array of media queries for each breakpoint when given an array of breakpoints', () => {
        const expectedDirectionCss = [
            'display: block;',
            'display: inline-block;',
            'display: block;',
            null,
            'display: inline-block;',
            'display: block;'
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcSpacerInline({$isInline: ['sm', 'xl']});

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return an all inline-block if given true', () => {
        const expectedDirectionCss = [
            'display: inline-block;',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcSpacerInline({$isInline: true});

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return an all block if given false', () => {
        const expectedDirectionCss = [
            'display: block;',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcSpacerInline({$isInline: false});

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });
});