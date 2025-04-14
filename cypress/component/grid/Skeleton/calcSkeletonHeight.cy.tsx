/* eslint-disable max-lines, max-len, max-lines-per-function, no-undefined */
import {createConfig} from '../../../../src/config/config';
import {calcSkeletonHeight} from '../../../../src/grid/Skeleton/utils';
import {themeConfigs} from '../../../fixtures/themes';

describe('Test calcSkeletonHeight function', () => {
    it('Is a function', () => {
        expect(calcSkeletonHeight, 'calcSkeletonHeight').to.be.a('function');
    });

    it('should return the null if no height is provided', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedWidthCss = null;
        const actualWidthCss = calcSkeletonHeight({});

        expect(actualWidthCss).to.deep.equal(expectedWidthCss);
    });

    it('should return the given height in pixels if provided as number', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedWidthCss = '100px';
        const actualWidthCss = calcSkeletonHeight({$height: 100});

        expect(actualWidthCss).to.deep.equal(expectedWidthCss);
    });

    it('should return the given height as if is provided as string', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedWidthCss = '100rem';
        const actualWidthCss = calcSkeletonHeight({$height: '100rem'});

        expect(actualWidthCss).to.deep.equal(expectedWidthCss);
    });
});