/* eslint-disable max-lines, max-len, max-lines-per-function, no-undefined */
import {calcSkeletonDuration} from '../../../src/utils/styleHelpers';
import {themeConfigs} from '../../fixtures/themes';

describe('Test calcSkeletonDuration function', () => {
    it('Is a function', () => {
        expect(calcSkeletonDuration, 'calcSkeletonDuration').to.be.a('function');
    });

    it('should return the animation duration defined in the theme', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedDurationCss = `${themeConfigs.defaultTheme.skeleton.dark.animation.duration}s`;
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDurationCss = calcSkeletonDuration({
            $variant: 'dark',
            theme
        });

        expect(actualDurationCss).to.deep.equal(expectedDurationCss);
    });
});