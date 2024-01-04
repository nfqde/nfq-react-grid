/* eslint-disable max-lines, max-len, max-lines-per-function, no-undefined */
import {calcSkeletonBackgroundImage} from '../../../src/utils/styleHelpers';
import {themeConfigs} from '../../fixtures/themes';

describe('Test calcSkeletonBackgroundImage function', () => {
    it('Is a function', () => {
        expect(calcSkeletonBackgroundImage, 'calcSkeletonBackgroundImage').to.be.a('function');
    });

    it('should return the backgroundImage defined in the theme', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedColorCss = `linear-gradient(90deg, ${themeConfigs.defaultTheme.skeleton.dark.colors.baseHighlight} 8%, ${themeConfigs.defaultTheme.skeleton.dark.colors.highlight} 38%, ${themeConfigs.defaultTheme.skeleton.dark.colors.baseHighlight} 54%);`;
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualColorCss = calcSkeletonBackgroundImage({
            $variant: 'dark',
            theme
        });

        expect(actualColorCss).to.deep.equal(expectedColorCss);
    });
});