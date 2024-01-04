/* eslint-disable max-lines, max-len, max-lines-per-function, no-undefined */
import {calcSkeletonWidth} from '../../../src/utils/styleHelpers';
import {themeConfigs} from '../../fixtures/themes';

describe('Test calcSkeletonWidth function', () => {
    it('Is a function', () => {
        expect(calcSkeletonWidth, 'calcSkeletonWidth').to.be.a('function');
    });

    it('should return the default width', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedWidthCss = '100%';
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualWidthCss = calcSkeletonWidth({
            $variant: 'dark',
            theme
        });

        expect(actualWidthCss).to.deep.equal(expectedWidthCss);
    });

    it('should return the given width in pixels if provided as number', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedWidthCss = '100px';
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualWidthCss = calcSkeletonWidth({
            $variant: 'dark',
            $width: 100,
            theme
        });

        expect(actualWidthCss).to.deep.equal(expectedWidthCss);
    });

    it('should return the given width as if is provided as string', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedWidthCss = '100rem';
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualWidthCss = calcSkeletonWidth({
            $variant: 'dark',
            $width: '100rem',
            theme
        });

        expect(actualWidthCss).to.deep.equal(expectedWidthCss);
    });
});