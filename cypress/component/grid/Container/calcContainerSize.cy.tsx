/* eslint-disable max-lines, max-len, max-lines-per-function */
import {createConfig} from '../../../../src/config/config';
import {calcContainerSize} from '../../../../src/grid/Container/utils';
import {themeConfigs} from '../../../fixtures/themes';

describe('Test calcContainerSize function', () => {
    it('Is a function', () => {
        expect(calcContainerSize, 'calcContainerSize').to.be.a('function');
    });

    it('should return an array of media queries when given valid input', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedWidthCss = [
            '--nfq-grid-container-width: 100%;',
            null,
            '--nfq-grid-container-width: var(--nfq-grid-container);',
            null,
            null,
            null
        ];
        const actualWidthCss = calcContainerSize({$isFluid: ['xs', 'sm']});

        expect(actualWidthCss).to.deep.equal(expectedWidthCss);
    });

    it('should return an array of media queries with 100% order when fluid is true', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedDirectionCss = [
            '--nfq-grid-container-width: 100%;',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcContainerSize({$isFluid: true});

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });
});