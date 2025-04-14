/* eslint-disable max-lines-per-function, @typescript-eslint/no-unused-expressions, max-len */
import {createConfig} from '../../../src/config/config';
import {mergeMediaQueries} from '../../../src/utils/styling';
import {themeConfigs} from '../../fixtures/themes';

const theme = {nfqgrid: themeConfigs.defaultTheme};

describe('Test mergeMediaQueries function', () => {
    it('Is a function', () => {
        expect(mergeMediaQueries, 'mergeMediaQueries').to.be.a('function');
    });

    it('should return null if all functions return null', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        const mediaQueries = mergeMediaQueries(
            () => null,
            () => null
        )({theme});

        expect(mediaQueries).to.deep.equal([null, null, null, null, null, null]);
    });

    it('should merge function outputs in the right mediaqueries.', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);

        const mediaQueries = mergeMediaQueries<{color: string; fontSize: string}>(
            ({color}) => [`color: ${color};`, null, null, null, null, null],
            () => ['background-color: blue;', null, 'background-color: red;', null, null, null],
            ({fontSize}) => [null, `font-size: ${fontSize};`, null, null, null, null]
        )({
            color: 'red',
            fontSize: '16px'
        });

        expect(mediaQueries).property('0').property('styles').includes('@media only screen and (min-width: 0px){color: red;background-color: blue;;;}');
        expect(mediaQueries).property('1').property('styles').includes('@media only screen and (min-width: 576px){font-size: 16px;;;}');
        expect(mediaQueries).property('2').property('styles').includes('@media only screen and (min-width: 769px){background-color: red;;;}');
        expect(mediaQueries).property('3').is.null;
        expect(mediaQueries).property('4').is.null;
        expect(mediaQueries).property('5').is.null;
    });
});