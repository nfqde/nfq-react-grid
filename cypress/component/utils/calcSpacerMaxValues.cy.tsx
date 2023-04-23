/* eslint-disable max-lines, max-len, max-lines-per-function, no-undefined */
import {calcSpacerMaxValues} from '../../../src/utils/styleHelpers';
import {themeConfigs} from '../../fixtures/themes';

describe('Test calcSpacerMaxValues function', () => {
    it('Is a function', () => {
        expect(calcSpacerMaxValues, 'calcSpacerMaxValues').to.be.a('function');
    });

    it('should return an array of media queries', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedDirectionCss = [
            'max-height: 1rem;',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcSpacerMaxValues('max-height')({
            $maxY: 2,
            theme
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return null if not given', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedDirectionCss = [
            null,
            null,
            null,
            null,
            null,
            null
        ];
        const actualDirectionCss = calcSpacerMaxValues('max-height')({theme});

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return css max-width prop then given', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedDirectionCss = [
            'max-width: 1rem;',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcSpacerMaxValues('max-width')({
            $maxX: 2,
            theme
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return css max-height prop then given', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedDirectionCss = [
            'max-height: 1rem;',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcSpacerMaxValues('max-height')({
            $maxY: 2,
            theme
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should set automatic max-width if isNotStretching set', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedDirectionCss = [
            'max-width: 1rem;',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcSpacerMaxValues('max-width')({
            $isNotStretching: true,
            $x: 2,
            theme
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should set automatic max-height if isNotStretching set', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedDirectionCss = [
            'max-height: 1rem;',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcSpacerMaxValues('max-height')({
            $isNotStretching: true,
            $y: 2,
            theme
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should set nothing if isNotStretching is set but the wrong dimension is there', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedDirectionCss = [
            null,
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcSpacerMaxValues('max-height')({
            $isNotStretching: true,
            $x: 2,
            theme
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return calculate right value for different screensizes for auto values', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedDirectionCss = [
            'max-height: 0.5rem;',
            'max-height: 1rem;',
            'max-height: 1.5rem;',
            'max-height: 2rem;',
            'max-height: 2.5rem;',
            'max-height: 3rem;'
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcSpacerMaxValues('max-height')({
            $isNotStretching: true,
            $y: {
                lg: 4,
                md: 3,
                sm: 2,
                xl: 5,
                xs: 1,
                xxl: 6
            },
            theme
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return calculate right value for different screensizes for auto and max values', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedDirectionCss = [
            'max-height: 1rem;',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcSpacerMaxValues('max-height')({
            $isNotStretching: true,
            $maxY: 2,
            $y: {
                lg: 4,
                md: 3,
                sm: 2,
                xl: 5,
                xs: 1,
                xxl: 6
            },
            theme
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return calculate right value for different screensizes for different auto and max values', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedDirectionCss = [
            'max-height: 0.5rem;',
            'max-height: initial;',
            null,
            'max-height: 3rem;',
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcSpacerMaxValues('max-height')({
            $isNotStretching: ['xs', 'xl'],
            $maxY: {lg: 6},
            $y: {
                lg: 4,
                md: 3,
                sm: 2,
                xl: 5,
                xs: 1,
                xxl: 6
            },
            theme
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });
});