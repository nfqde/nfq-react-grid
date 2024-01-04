/* eslint-disable max-lines, max-len, max-lines-per-function, no-undefined */
import {calcSkeletonBackgroundColor} from '../../../src/utils/styleHelpers';
import {themeConfigs} from '../../fixtures/themes';

describe('Test calcSkeletonBackgroundColor function', () => {
    it('Is a function', () => {
        expect(calcSkeletonBackgroundColor, 'calcSkeletonBackgroundColor').to.be.a('function');
    });

    it('should return the backgroundColor defined in the theme', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedColorCss = themeConfigs.defaultTheme.skeleton.dark.colors.base;
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualColorCss = calcSkeletonBackgroundColor({
            $variant: 'dark',
            theme
        });

        expect(actualColorCss).to.deep.equal(expectedColorCss);
    });
});