/* eslint-disable max-lines, max-len, max-lines-per-function, no-undefined */
import {calcSpacerMeasures} from '../../../src/utils/styleHelpers';
import {themeConfigs} from '../../fixtures/themes';

describe('Test calcSpacerMeasures function', () => {
    it('Is a function', () => {
        expect(calcSpacerMeasures, 'calcSpacerMeasures').to.be.a('function');
    });

    it('should return an array of media queries', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedDirectionCss = [
            'height: 1rem;',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcSpacerMeasures('height')({
            $y: 2,
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
        const actualDirectionCss = calcSpacerMeasures('height')({theme});

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return css width prop then given', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedDirectionCss = [
            'width: 1rem;',
            null,
            null,
            null,
            null,
            null
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcSpacerMeasures('width')({
            $x: 2,
            theme
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return css min-width prop then given', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedDirectionCss = [
            'min-width: 1rem;',
            null,
            null,
            null,
            null,
            null
        ];
        const actualDirectionCss = calcSpacerMeasures('min-width')({
            $x: 2,
            theme
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return css height prop then given', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedDirectionCss = [
            'height: 1rem;',
            null,
            null,
            null,
            null,
            null
        ];
        const actualDirectionCss = calcSpacerMeasures('height')({
            $y: 2,
            theme
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return css min-height prop then given', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedDirectionCss = [
            'min-height: 1rem;',
            null,
            null,
            null,
            null,
            null
        ];
        const actualDirectionCss = calcSpacerMeasures('min-height')({
            $y: 2,
            theme
        });

        expect(actualDirectionCss).to.deep.equal(expectedDirectionCss);
    });

    it('should return calculate right value for different screensizes', () => {
        const theme = {nfqgrid: themeConfigs.defaultTheme};
        const expectedDirectionCss = [
            'height: 0.5rem;',
            'height: 1rem;',
            'height: 1.5rem;',
            'height: 2rem;',
            'height: 2.5rem;',
            'height: 3rem;'
        ];
        // eslint-disable-next-line @nfq/no-magic-numbers
        const actualDirectionCss = calcSpacerMeasures('height')({
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