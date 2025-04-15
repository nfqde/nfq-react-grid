/* eslint-disable max-lines, max-len, max-lines-per-function, no-undefined */
import {createConfig} from '../../../../src/config/config';
import {calcSkeletonWidth} from '../../../../src/grid/Skeleton/utils';
import {themeConfigs} from '../../../fixtures/themes';

describe('Test calcSkeletonWidth function', () => {
    it('Is a function', () => {
        expect(calcSkeletonWidth, 'calcSkeletonWidth').to.be.a('function');
    });

    it('should return the default width', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedWidthCss = '100%';
        const actualWidthCss = calcSkeletonWidth({});

        expect(actualWidthCss).to.deep.equal(expectedWidthCss);
    });

    it('should return the given width in pixels if provided as number', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedWidthCss = '100px';
        const actualWidthCss = calcSkeletonWidth({$width: 100});

        expect(actualWidthCss).to.deep.equal(expectedWidthCss);
    });

    it('should return the given width as if is provided as string', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedWidthCss = '100rem';
        const actualWidthCss = calcSkeletonWidth({$width: '100rem'});

        expect(actualWidthCss).to.deep.equal(expectedWidthCss);
    });
});