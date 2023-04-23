/* eslint-disable max-lines-per-function, @typescript-eslint/no-unused-expressions, max-len */
import {mergeMediaQueries} from '../../../src/utils/styleHelpers';
import {themeConfigs} from '../../fixtures/themes';

const theme = {nfqgrid: themeConfigs.defaultTheme};

describe('Test mergeMediaQueries function', () => {
    it('Is a function', () => {
        expect(mergeMediaQueries, 'mergeMediaQueries').to.be.a('function');
    });

    it('should return null if all functions return null', () => {
        const mediaQueries = mergeMediaQueries(
            () => null,
            () => null
        )({theme});

        expect(mediaQueries).to.deep.equal([null, null, null, null, null, null]);
    });

    it('should merge function outputs in the right mediaqueries.', () => {
        const mediaQueries = mergeMediaQueries<{color: string; fontSize: string}>(
            ({color}) => [`color: ${color};`, null, null, null, null, null],
            () => ['background-color: blue;', null, 'background-color: red;', null, null, null],
            ({fontSize}) => [null, `font-size: ${fontSize};`, null, null, null, null]
        )({
            color: 'red',
            fontSize: '16px',
            theme
        });

        expect(mediaQueries).to.deep.equal([
            [
                '@media ',
                'only screen and (min-width: 0px)',
                '{',
                'color: red;background-color: blue;',
                '}'
            ],
            [
                '@media ',
                'only screen and (min-width: 576px)',
                '{',
                'font-size: 16px;',
                '}'
            ],
            [
                '@media ',
                'only screen and (min-width: 769px)',
                '{',
                'background-color: red;',
                '}'
            ],
            null,
            null,
            null
        ]);
    });
});