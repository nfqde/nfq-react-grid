/* eslint-disable max-lines, max-len, max-lines-per-function */
import {calcContainerSize} from '../../../src/utils/styleHelpers';
import {themeConfigs} from '../../fixtures/themes';

describe('Test calcContainerSize function', () => {
    it('Is a function', () => {
        expect(calcContainerSize, 'calcContainerSize').to.be.a('function');
    });

    it('should return an array of media queries when given valid input', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedWidthCss = [
            'width: 100%;',
            null,
            null,
            'width: 1440px;',
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualWidthCss = calcContainerSize({
            $isFluid: ['xs', 'sm'],
            theme
        });

        expect(actualWidthCss).to.deep.equal(expectedWidthCss);
    });

    it('should return an array of media queries with 100% order when fluid is true', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedDirectionCss = [
            'width: 100%;',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcContainerSize({
            $isFluid: true,
            theme
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });
});