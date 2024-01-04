/* eslint-disable max-lines, max-len, max-lines-per-function, no-undefined */
import {calcSkeletonHeight} from '../../../src/utils/styleHelpers';
import {themeConfigs} from '../../fixtures/themes';

describe('Test calcSkeletonHeight function', () => {
    it('Is a function', () => {
        expect(calcSkeletonHeight, 'calcSkeletonHeight').to.be.a('function');
    });

    it('should return the null if no height is provided', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedWidthCss = null;
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualWidthCss = calcSkeletonHeight({
            $variant: 'dark',
            theme
        });

        expect(actualWidthCss).to.deep.equal(expectedWidthCss);
    });

    it('should return the given height in pixels if provided as number', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedWidthCss = '100px';
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualWidthCss = calcSkeletonHeight({
            $height: 100,
            $variant: 'dark',
            theme
        });

        expect(actualWidthCss).to.deep.equal(expectedWidthCss);
    });

    it('should return the given height as if is provided as string', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedWidthCss = '100rem';
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualWidthCss = calcSkeletonHeight({
            $height: '100rem',
            $variant: 'dark',
            theme
        });

        expect(actualWidthCss).to.deep.equal(expectedWidthCss);
    });
});