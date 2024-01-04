/* eslint-disable max-lines, max-len, max-lines-per-function, no-undefined */
import {calcSkeletonBorderRadius} from '../../../src/utils/styleHelpers';
import {themeConfigs} from '../../fixtures/themes';

describe('Test calcSkeletonBorderRadius function', () => {
    it('Is a function', () => {
        expect(calcSkeletonBorderRadius, 'calcSkeletonBorderRadius').to.be.a('function');
    });

    it('should return the borderRadius defined in the theme', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedBorderRadiusCss = `${themeConfigs.defaultTheme.skeleton.dark.borderRadius}rem`;
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualBorderRadiusCss = calcSkeletonBorderRadius({
            $circle: false,
            $variant: 'dark',
            theme
        });

        expect(actualBorderRadiusCss).to.deep.equal(expectedBorderRadiusCss);
    });

    it('should return the correct borderRadius if circle is true', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedBorderRadiusCss = '50%';
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualBorderRadiusCss = calcSkeletonBorderRadius({
            $circle: true,
            $variant: 'dark',
            theme
        });

        expect(actualBorderRadiusCss).to.deep.equal(expectedBorderRadiusCss);
    });
});