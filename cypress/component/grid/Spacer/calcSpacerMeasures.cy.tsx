/* eslint-disable max-lines, max-len, max-lines-per-function, no-undefined */
import {createConfig} from '../../../../src/config/config';
import {calcSpacerMeasures} from '../../../../src/grid/Spacer/utils';
import {themeConfigs} from '../../../fixtures/themes';

describe('Test calcSpacerMeasures function', () => {
    it('Is a function', () => {
        expect(calcSpacerMeasures, 'calcSpacerMeasures').to.be.a('function');
    });

    it('should return an array of media queries', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedDirectionCss = [
            '--nfq-grid-spacer-y: 2;',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcSpacerMeasures('y')({$y: 2});

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
        const actualDirectionCss = calcSpacerMeasures('y')({});

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return css width prop then given', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedDirectionCss = [
            '--nfq-grid-spacer-x: 2;',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcSpacerMeasures('x')({$x: 2});

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return css min-width prop then given', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedDirectionCss = [
            '--nfq-grid-spacer-x: 2;',
            null,
            null,
            null,
            null,
            null
        ];
        const actualDirectionCss = calcSpacerMeasures('x')({$x: 2});

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return css height prop then given', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedDirectionCss = [
            '--nfq-grid-spacer-y: 2;',
            null,
            null,
            null,
            null,
            null
        ];
        const actualDirectionCss = calcSpacerMeasures('y')({$y: 2});

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return css min-height prop then given', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedDirectionCss = [
            '--nfq-grid-spacer-y: 2;',
            null,
            null,
            null,
            null,
            null
        ];
        const actualDirectionCss = calcSpacerMeasures('y')({$y: 2});

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return calculate right height for different screensizes', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedDirectionCss = [
            '--nfq-grid-spacer-y: 1;',
            '--nfq-grid-spacer-y: 2;',
            '--nfq-grid-spacer-y: 3;',
            '--nfq-grid-spacer-y: 4;',
            '--nfq-grid-spacer-y: 5;',
            '--nfq-grid-spacer-y: 6;'
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcSpacerMeasures('y')({
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

    it('should return calculate right width for different screensizes', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const expectedDirectionCss = [
            '--nfq-grid-spacer-x: 1;',
            '--nfq-grid-spacer-x: 2;',
            '--nfq-grid-spacer-x: 3;',
            '--nfq-grid-spacer-x: 4;',
            '--nfq-grid-spacer-x: 5;',
            '--nfq-grid-spacer-x: 6;'
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcSpacerMeasures('x')({
            $x: {
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