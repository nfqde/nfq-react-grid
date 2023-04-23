/* eslint-disable max-lines, max-len, max-lines-per-function */
import {calcDirection} from '../../../src/utils/styleHelpers';

describe('Test calcDirection function', () => {
    it('Is a function', () => {
        expect(calcDirection, 'calcDirection').to.be.a('function');
    });

    it('should return the default direction when no arguments are passed', () => {
        const expectedDirectionCss = [
            'flex-flow: column nowrap;',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcDirection('column')({});

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return the direction for each screen size when an object is passed', () => {
        const expectedDirectionCss = [
            'flex-flow: column nowrap;',
            'flex-flow: row wrap;',
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcDirection('column')({
            $direction: {
                sm: 'row',
                xs: 'column'
            }
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return the direction with reverse when isReverse is true', () => {
        const expectedDirectionCss = [
            'flex-flow: column-reverse nowrap;',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcDirection('column')({
            $direction: {xs: 'column'},
            $isReverse: true
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return the direction with wrap when hasNoWrap is true', () => {
        const expectedDirectionCss = [
            'flex-flow: column nowrap;',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcDirection('column')({
            $direction: {xs: 'column'},
            $hasNoWrap: true,
            $isReverse: false
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return the direction with reverse and wrap when both isReverse and hasNoWrap are true', () => {
        const expectedDirectionCss = [
            'flex-flow: column-reverse nowrap;',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcDirection('column')({
            $direction: {xs: 'column'},
            $hasNoWrap: true,
            $isReverse: true
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return the direction with reverse and wrap when both isReverse and hasNoWrap are arrays', () => {
        const expectedDirectionCss = [
            'flex-flow: column-reverse nowrap;',
            'flex-flow: row nowrap;',
            'flex-flow: column nowrap;',
            'flex-flow: column-reverse nowrap;',
            'flex-flow: column nowrap;',
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcDirection('column')({
            $direction: {
                md: 'column',
                sm: 'row',
                xs: 'column'
            },
            $hasNoWrap: ['xs', 'sm', 'md'],
            $isReverse: ['xs', 'lg']
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });
});