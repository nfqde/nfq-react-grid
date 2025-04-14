/* eslint-disable max-lines, max-len, max-lines-per-function, no-undefined */
import {createConfig} from '../../../../src/config/config';
import {calcSpacerMaxValues} from '../../../../src/grid/Spacer/utils';
import {themeConfigs} from '../../../fixtures/themes';

describe('Test calcSpacerMaxValues function', () => {
    it('Is a function', () => {
        expect(calcSpacerMaxValues, 'calcSpacerMaxValues').to.be.a('function');
    });

    it('should return an array of media queries', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedDirectionCss = [
            '--nfq-grid-spacer-max-y: 2;',
            null,
            null,
            null,
            null,
            null
        ];
        const actualDirectionCss = calcSpacerMaxValues('y')({$maxY: 2});

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return null if not given', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedDirectionCss = [
            null,
            null,
            null,
            null,
            null,
            null
        ];
        const actualDirectionCss = calcSpacerMaxValues('y')({});

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return css max-width prop then given', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedDirectionCss = [
            '--nfq-grid-spacer-max-x: 2;',
            null,
            null,
            null,
            null,
            null
        ];
        const actualDirectionCss = calcSpacerMaxValues('x')({$maxX: 2});

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return css max-height prop then given', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedDirectionCss = [
            '--nfq-grid-spacer-max-y: 2;',
            null,
            null,
            null,
            null,
            null
        ];
        const actualDirectionCss = calcSpacerMaxValues('y')({$maxY: 2});

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should set automatic max-width if isNotStretching set', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedDirectionCss = [
            '--nfq-grid-spacer-max-x: 2;',
            null,
            null,
            null,
            null,
            null
        ];
        const actualDirectionCss = calcSpacerMaxValues('x')({
            $isNotStretching: true,
            $x: 2
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should set automatic max-height if isNotStretching set', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedDirectionCss = [
            '--nfq-grid-spacer-max-y: 2;',
            null,
            null,
            null,
            null,
            null
        ];
        const actualDirectionCss = calcSpacerMaxValues('y')({
            $isNotStretching: true,
            $y: 2
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should set nothing if isNotStretching is set but the wrong dimension is there', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedDirectionCss = [
            null,
            null,
            null,
            null,
            null,
            null
        ];
        const actualDirectionCss = calcSpacerMaxValues('y')({
            $isNotStretching: true,
            $x: 2
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return calculate right value for different screensizes for auto values', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedDirectionCss = [
            '--nfq-grid-spacer-max-y: 1;',
            '--nfq-grid-spacer-max-y: 2;',
            '--nfq-grid-spacer-max-y: 3;',
            '--nfq-grid-spacer-max-y: 4;',
            '--nfq-grid-spacer-max-y: 5;',
            '--nfq-grid-spacer-max-y: 6;'
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcSpacerMaxValues('y')({
            $isNotStretching: true,
            $y: {
                lg: 4,
                md: 3,
                sm: 2,
                xl: 5,
                xs: 1,
                xxl: 6
            }
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return calculate right value for different screensizes for auto and max values', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedDirectionCss = [
            '--nfq-grid-spacer-max-y: 2;',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcSpacerMaxValues('y')({
            $isNotStretching: true,
            $maxY: 2,
            $y: {
                lg: 4,
                md: 3,
                sm: 2,
                xl: 5,
                xs: 1,
                xxl: 6
            }
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return calculate right value for different screensizes for different auto and max values', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedDirectionCss = [
            '--nfq-grid-spacer-max-y: 1;',
            '--nfq-grid-spacer-max-y: initial;',
            null,
            '--nfq-grid-spacer-max-y: 6;',
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcSpacerMaxValues('y')({
            $isNotStretching: ['xs', 'xl'],
            $maxY: {lg: 6},
            $y: {
                lg: 4,
                md: 3,
                sm: 2,
                xl: 5,
                xs: 1,
                xxl: 6
            }
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });
});