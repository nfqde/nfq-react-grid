/* eslint-disable max-lines, max-len, max-lines-per-function */
import {createConfig} from '../../../../src/config/config';
import {calcContainerMaxWidth} from '../../../../src/grid/Container/utils';
import {themeConfigs} from '../../../fixtures/themes';

describe('Test calcContainerMaxWidth function', () => {
    it('Is a function', () => {
        expect(calcContainerMaxWidth, 'calcOffset').to.be.a('function');
    });

    it('should return max-width for a single string value', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const result = calcContainerMaxWidth({$maxWidth: '100%'});

        expect(result).to.deep.equal([
            '--nfq-grid-container-max-width: 100%;',
            null,
            null,
            null,
            null,
            null
        ]);
    });

    it('should return max-width for a single numeric value', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const result = calcContainerMaxWidth({$maxWidth: 1200});

        expect(result).to.deep.equal([
            '--nfq-grid-container-max-width: 1200px;',
            null,
            null,
            null,
            null,
            null
        ]);
    });

    it('should return correct values when given a partial map', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const result = calcContainerMaxWidth({
            $maxWidth: {
                md: 960,
                xl: '1440px',
                xs: '100%'
            }
        });

        expect(result).to.deep.equal([
            '--nfq-grid-container-max-width: 100%;',
            null,
            '--nfq-grid-container-max-width: 960px;',
            null,
            '--nfq-grid-container-max-width: 1440px;',
            null
        ]);
    });

    it('should skip breakpoints with undefined values', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const result = calcContainerMaxWidth({
            $maxWidth: {
                md: '80%',
                sm: undefined
            }
        });

        expect(result).to.deep.equal([
            null,
            null,
            '--nfq-grid-container-max-width: 80%;',
            null,
            null,
            null
        ]);
    });

    it('should handle all breakpoints', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const result = calcContainerMaxWidth({
            $maxWidth: {
                lg: 1024,
                md: 768,
                sm: 480,
                xl: 1280,
                xs: 320
            }
        });

        expect(result).to.deep.equal([
            '--nfq-grid-container-max-width: 320px;',
            '--nfq-grid-container-max-width: 480px;',
            '--nfq-grid-container-max-width: 768px;',
            '--nfq-grid-container-max-width: 1024px;',
            '--nfq-grid-container-max-width: 1280px;',
            null
        ]);
    });
});