/* eslint-disable max-lines, max-len, max-lines-per-function */
import {createConfig} from '../../../../src/config/config';
import {calcContainerPadding} from '../../../../src/grid/Container/utils';
import {themeConfigs} from '../../../fixtures/themes';

describe('Test calcContainerPadding function', () => {
    it('Is a function', () => {
        expect(calcContainerPadding, 'calcOffset').to.be.a('function');
    });

    it('should apply no padding to all breakpoints when $hasNoPadding is true', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const result = calcContainerPadding({$hasNoPadding: true});

        expect(result).to.deep.equal([
            '\n                --nfq-grid-container-no-padding: initial;\n            ',
            null,
            null,
            null,
            null,
            null
        ]);
    });

    it('should apply padding to all breakpoints when $hasNoPadding is false', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const result = calcContainerPadding({});

        expect(result).to.deep.equal([
            '\n                --nfq-grid-container-no-padding: var(--nfq-grid-container-padding);\n            ',
            null,
            null,
            null,
            null,
            null
        ]);
    });

    it('should return correct CSS for selective padding', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const result = calcContainerPadding({$hasNoPadding: ['md', 'xl']});

        expect(result).to.deep.equal([
            '\n                --nfq-grid-container-no-padding: var(--nfq-grid-container-padding);\n            ',
            null,
            '\n                --nfq-grid-container-no-padding: initial;\n            ',
            '\n                --nfq-grid-container-no-padding: var(--nfq-grid-container-padding);\n            ',
            '\n                --nfq-grid-container-no-padding: initial;\n            ',
            '\n                --nfq-grid-container-no-padding: var(--nfq-grid-container-padding);\n            '
        ]);
    });

    it('should skip duplicate values in a row', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const result = calcContainerPadding({$hasNoPadding: ['sm', 'md', 'lg', 'xl']});

        expect(result).to.deep.equal([
            '\n                --nfq-grid-container-no-padding: var(--nfq-grid-container-padding);\n            ',
            '\n                --nfq-grid-container-no-padding: initial;\n            ',
            null,
            null,
            null,
            '\n                --nfq-grid-container-no-padding: var(--nfq-grid-container-padding);\n            '
        ]);
    });

    it('should return all changes correctly when alternating', () => {
        createConfig(['xs', 'sm', 'md', 'lg', 'xl', 'xxl'], themeConfigs.defaultTheme);
        const result = calcContainerPadding({$hasNoPadding: ['sm', 'lg']});

        expect(result).to.deep.equal([
            '\n                --nfq-grid-container-no-padding: var(--nfq-grid-container-padding);\n            ',
            '\n                --nfq-grid-container-no-padding: initial;\n            ',
            '\n                --nfq-grid-container-no-padding: var(--nfq-grid-container-padding);\n            ',
            '\n                --nfq-grid-container-no-padding: initial;\n            ',
            '\n                --nfq-grid-container-no-padding: var(--nfq-grid-container-padding);\n            ',
            null
        ]);
    });
});