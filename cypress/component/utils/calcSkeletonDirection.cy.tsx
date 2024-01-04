/* eslint-disable max-lines, max-len, max-lines-per-function, no-undefined */
import {calcSkeletonDirection} from '../../../src/utils/styleHelpers';
import {themeConfigs} from '../../fixtures/themes';

describe('Test calcSkeletonDirection function', () => {
    it('Is a function', () => {
        expect(calcSkeletonDirection, 'calcSkeletonDirection').to.be.a('function');
    });

    it('should return the correct animation direction if direction is ltr', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedDirectionCss = 'normal';
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcSkeletonDirection({
            $variant: 'dark',
            theme
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return the correct animation direction if direction is rtl', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedDirectionCss = 'reverse';
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcSkeletonDirection({
            $variant: 'light',
            theme
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });
});