import {createConfig} from '../../../src/config/config';
import {VAR_PREFIX} from '../../../src/config/defaults';
import {generateGridVars, generateRecursiveVars, generateScreenSizeVars, generateSkeletonVars, generateSubGridVars, generateVarMedia, mergeVars} from '../../../src/utils/cssVarHelper';
import {generateMediaString} from '../../../src/utils/helpers';
import {themeConfigs} from '../../fixtures/themes';

describe('cssVarHelper', () => {
    context('generateRecursiveVars', () => {
        it('Is a function', () => {
            expect(generateRecursiveVars, 'generateRecursiveVars').to.be.a('function');
        });

        it('generates flat CSS vars from nested object', () => {
            const input = {
                color: {
                    primary: '#000',
                    secondary: '#fff'
                },
                fontSize: {
                    md: '16px',
                    sm: '12px'
                }
            };

            const result = generateRecursiveVars(input, 'theme');

            expect(result).to.include('--theme-color-primary: #000;');
            expect(result).to.include('--theme-color-secondary: #fff;');
            expect(result).to.include('--theme-fontSize-sm: 12px;');
            expect(result).to.include('--theme-fontSize-md: 16px;');
        });

        it('works with null and ignores it', () => {
            const input = {
                spacing: {
                    lg: 24,
                    md: null,
                    sm: 8
                },
                test: null
            };

            const result = generateRecursiveVars(input, 'space');

            expect(result).to.include('--space-spacing-sm: 8;');
            expect(result).to.include('--space-spacing-lg: 24;');
            expect(result).to.not.include('--space-test');
            expect(result).to.not.include('--space-spacing-md');
        });

        it('uses default prefix when none is provided', () => {
            const input = {size: {sm: '1rem'}};

            const result = generateRecursiveVars(input);

            expect(result).to.include(`--${VAR_PREFIX}-size-sm: 1rem;`);
        });

        it('returns empty string if input is empty', () => {
            const result = generateRecursiveVars({}, 'empty');

            expect(result).to.equal('');
        });

        it('handles primitive values at root level', () => {
            const input = {
                border: '1px solid red',
                padding: '20px'
            };

            const result = generateRecursiveVars(input, 'box');

            expect(result).to.include('--box-padding: 20px;');
            expect(result).to.include('--box-border: 1px solid red;');
        });
    });

    context('generateSkeleotnVars', () => {
        it('Is a function', () => {
            expect(generateSkeletonVars, 'generateSkeletonVars').to.be.a('function');
        });

        it('generates all CSS variables from a full SkeletonVariant config', () => {
            const skeleton = {
                dark: {
                    animation: {
                        delay: 150,
                        direction: 'reverse' as const,
                        duration: 1200
                    },
                    borderRadius: 6,
                    colors: {
                        base: '#222' as const,
                        baseHighlight: '#333' as const,
                        highlight: '#444' as const
                    }
                },
                light: {
                    animation: {
                        delay: 200,
                        direction: 'normal' as const,
                        duration: 1000
                    },
                    borderRadius: 8,
                    colors: {
                        base: '#e0e0e0' as const,
                        baseHighlight: '#f0f0f0' as const,
                        highlight: '#ffffff' as const
                    }
                }
            };

            const result = generateSkeletonVars(skeleton, 'light');

            // Default theme uses :root
            expect(result).to.include(':root');
            expect(result).to.include(`--${VAR_PREFIX}-skeleton-animation-delay: 200;`);
            expect(result).to.include(`--${VAR_PREFIX}-skeleton-animation-direction: normal;`);
            expect(result).to.include(`--${VAR_PREFIX}-skeleton-animation-duration: 1000;`);
            expect(result).to.include(`--${VAR_PREFIX}-skeleton-borderRadius: 8;`);
            expect(result).to.include(`--${VAR_PREFIX}-skeleton-colors-base: #e0e0e0;`);
            expect(result).to.include(`--${VAR_PREFIX}-skeleton-colors-baseHighlight: #f0f0f0;`);
            expect(result).to.include(`--${VAR_PREFIX}-skeleton-colors-highlight: #ffffff;`);

            // Dark theme uses data attribute
            expect(result).to.include('[data-nfq-grid-skeleton-config="dark"]');
            expect(result).to.include(`--${VAR_PREFIX}-skeleton-animation-delay: 150;`);
            expect(result).to.include(`--${VAR_PREFIX}-skeleton-animation-direction: reverse;`);
            expect(result).to.include(`--${VAR_PREFIX}-skeleton-animation-duration: 1200;`);
            expect(result).to.include(`--${VAR_PREFIX}-skeleton-borderRadius: 6;`);
            expect(result).to.include(`--${VAR_PREFIX}-skeleton-colors-base: #222;`);
            expect(result).to.include(`--${VAR_PREFIX}-skeleton-colors-baseHighlight: #333;`);
            expect(result).to.include(`--${VAR_PREFIX}-skeleton-colors-highlight: #444;`);
        });

        it('returns empty string if no skeleton themes provided', () => {
            // @ts-expect-error
            const result = generateSkeletonVars({}, 'default');

            expect(result).to.equal('');
        });

        it('only generates :root if only default theme is provided', () => {
            const skeleton = {
                dark: {
                    animation: {
                        delay: 100,
                        direction: 'normal' as const,
                        duration: 500
                    },
                    borderRadius: 4,
                    colors: {
                        base: '#aaa' as const,
                        baseHighlight: '#bbb' as const,
                        highlight: '#ccc' as const
                    }
                }
            };

            // @ts-expect-error
            const result = generateSkeletonVars(skeleton, 'dark');

            expect(result).to.include(':root');
            expect(result).to.not.include('data-nfq-grid-skeleton-config');
        });
    });

    context('generateSubGridVars', () => {
        beforeEach(() => {
            createConfig(['xs', 'sm', 'md', 'lg', 'xl'], themeConfigs.defaultTheme);
        });

        it('Is a function', () => {
            expect(generateSubGridVars, 'generateSubGridVars').to.be.a('function');
        });

        it('generates a CSS variable for all breakpoints when data is an object', () => {
            const data = {
                lg: 24,
                md: 16,
                sm: 12,
                xl: 32,
                xs: 8
            };

            // @ts-expect-error
            const result = generateSubGridVars('gutter', data);

            expect(result).to.deep.equal([
                `--${VAR_PREFIX}-gutter: 8;`,
                `--${VAR_PREFIX}-gutter: 12;`,
                `--${VAR_PREFIX}-gutter: 16;`,
                `--${VAR_PREFIX}-gutter: 24;`,
                `--${VAR_PREFIX}-gutter: 32;`
            ]);
        });

        it('skips breakpoints with undefined values in object form', () => {
            const data = {
                lg: 24,
                md: undefined,
                sm: 12
            };

            // @ts-expect-error
            const result = generateSubGridVars('spacing', data);

            expect(result).to.deep.equal([
                null,
                `--${VAR_PREFIX}-spacing: 12;`,
                null,
                `--${VAR_PREFIX}-spacing: 24;`,
                null
            ]);
        });

        it('generates only one variable at the first breakpoint when data is a string', () => {
            const data = 'repeat(auto-fill, minmax(100px, 1fr))';

            const result = generateSubGridVars('template', data);

            expect(result).to.deep.equal([
                `--${VAR_PREFIX}-template: repeat(auto-fill, minmax(100px, 1fr));`,
                null,
                null,
                null,
                null
            ]);
        });

        it('returns an array of nulls if string value and not first index', () => {
            const result = generateSubGridVars('template', '1fr');

            // Should only output the string at index 0
            expect(result).to.deep.equal([
                `--${VAR_PREFIX}-template: 1fr;`,
                null,
                null,
                null,
                null
            ]);
        });

        it('returns all null if object has no matching keys', () => {
            // @ts-expect-error
            const result = generateSubGridVars('gap', {unknown: 1});

            expect(result).to.deep.equal([null, null, null, null, null]);
        });
    });

    context('generateScreenSizeVars', () => {
        beforeEach(() => {
            createConfig(['xs', 'sm', 'md', 'lg', 'xl'], themeConfigs.defaultTheme);
        });

        it('Is a function', () => {
            expect(generateScreenSizeVars, 'generateScreenSizeVars').to.be.a('function');
        });

        it('generates one screen-size variable per breakpoint', () => {
            const result = generateScreenSizeVars();

            expect(result).to.deep.equal([
                `--${VAR_PREFIX}-screen-size: 'xs';`,
                `--${VAR_PREFIX}-screen-size: 'sm';`,
                `--${VAR_PREFIX}-screen-size: 'md';`,
                `--${VAR_PREFIX}-screen-size: 'lg';`,
                `--${VAR_PREFIX}-screen-size: 'xl';`
            ]);
        });

        it('returns an empty array when breakpointOrder is empty', () => {
            // Override with an empty config
            createConfig([], themeConfigs.defaultTheme);

            const result = generateScreenSizeVars();

            expect(result).to.deep.equal([]);
        });

        it('outputs properly quoted screen size strings', () => {
            const result = generateScreenSizeVars();

            result.forEach(line => {
                expect(line).to.match(/^--nfq-grid-screen-size: '.*';$/u);
            });
        });
    });

    describe('generateVarMedia', () => {
        it('Is a function', () => {
            expect(generateVarMedia, 'generateVarMedia').to.be.a('function');
        });

        it('returns :root rule without media query for index 0', () => {
            const result = generateVarMedia('xs', 0, '--nfq-var-gap: 8px;');

            expect(result).to.include(':root');
            expect(result).to.include('--nfq-var-gap: 8px;');
            expect(result).not.to.include('@media');
        });

        it('wraps query in media block for index > 0', () => {
            const result = generateVarMedia('md', 2, '--nfq-var-gap: 16px;');

            const expectedMedia = generateMediaString('md');

            expect(result).to.include(`@media ${expectedMedia}`);
            expect(result).to.include(':root');
            expect(result).to.include('--nfq-var-gap: 16px;');
        });

        it('returns correct media string based on breakpoint', () => {
            const result = generateVarMedia('lg', 3, '--nfq-var-columns: 12;');

            const expectedMedia = generateMediaString('lg');

            expect(result.trim()).to.equal(`
          @media ${expectedMedia} {
            :root {
                --nfq-var-columns: 12;
            }
        }
        `.trim());
        });

        it('preserves formatting of the passed query string', () => {
            const query = `
            --nfq-var-col-gap: 8px;
            --nfq-var-row-gap: 12px;
          `;
            const result = generateVarMedia('sm', 1, query);

            expect(result).to.include('--nfq-var-col-gap: 8px;');
            expect(result).to.include('--nfq-var-row-gap: 12px;');
        });
    });

    describe('mergeVars', () => {
        beforeEach(() => {
            createConfig(['xs', 'sm', 'md'], themeConfigs.defaultTheme);
        });

        it('Is a function', () => {
            expect(mergeVars, 'mergeVars').to.be.a('function');
        });

        it('merges matching index values into media queries', () => {
            const input1 = [
                '--nfq-var-gap: 4px;',
                '--nfq-var-gap: 8px;',
                '--nfq-var-gap: 12px;'
            ];

            const input2 = [
                '--nfq-var-columns: 2;',
                '--nfq-var-columns: 4;',
                null
            ];

            const result = mergeVars(input1, input2);

            // Should match: generateVarMedia(screenSize, index, mergedString)
            const expected = [
                generateVarMedia('xs', 0, '--nfq-var-gap: 4px;--nfq-var-columns: 2;'),
                generateVarMedia('sm', 1, '--nfq-var-gap: 8px;--nfq-var-columns: 4;'),
                generateVarMedia('md', 2, '--nfq-var-gap: 12px;')
            ].join('');

            expect(result).to.equal(expected);
        });

        it('skips breakpoints where all inputs are null', () => {
            const input1 = [null, null, '--nfq-var-gap: 12px;'];
            const input2 = [null, null, null];

            const result = mergeVars(input1, input2);

            // Only index 2 should produce output
            const expected = generateVarMedia('md', 2, '--nfq-var-gap: 12px;');

            expect(result).to.equal(expected);
        });

        it('returns empty string when all inputs are empty', () => {
            const result = mergeVars(
                [null, null, null],
                [null, null, null]
            );

            expect(result).to.equal('');
        });

        it('returns single merged output when only one input is present', () => {
            const result = mergeVars([
                '--nfq-var-gap: 2px;',
                null,
                '--nfq-var-gap: 6px;'
            ]);

            const expected = [
                generateVarMedia('xs', 0, '--nfq-var-gap: 2px;'),
                generateVarMedia('md', 2, '--nfq-var-gap: 6px;')
            ].join('');

            expect(result).to.equal(expected);
        });
    });

    describe('generateGridVars', () => {
        beforeEach(() => {
            createConfig(['xs', 'sm', 'md'], themeConfigs.defaultTheme);
        });

        it('Is a function', () => {
            expect(generateGridVars, 'generateGridVars').to.be.a('function');
        });

        it('generates full CSS var declarations wrapped in media queries', () => {
            const inputConfig = {
                baseSpacing: 1.25,
                columnGap: {
                    md: 24,
                    sm: 16,
                    xs: 8
                },
                columns: {
                    md: 12,
                    sm: 8,
                    xs: 4
                },
                container: {
                    md: 960,
                    sm: 640,
                    xs: 320
                },
                containerPadding: {
                    md: 32,
                    sm: 24,
                    xs: 16
                }
            };

            const result = generateGridVars(inputConfig);

            // xs: index 0 → no media query, :root block
            expect(result).to.include(':root');
            expect(result).to.include(`--${VAR_PREFIX}-base-spacing: 1.25rem;`);
            expect(result).to.include(`--${VAR_PREFIX}-column-gap: 8px;`);
            expect(result).to.include(`--${VAR_PREFIX}-columns: 4;`);
            expect(result).to.include(`--${VAR_PREFIX}-container: 320px;`);
            expect(result).to.include(`--${VAR_PREFIX}-container-padding: 16px;`);
            expect(result).to.include(`--${VAR_PREFIX}-screen-size: 'xs';`);

            // sm: wrapped in @media
            expect(result).to.include('@media only screen and (min-width: 576px)');
            expect(result).to.include(`--${VAR_PREFIX}-column-gap: 16px;`);
            expect(result).to.include(`--${VAR_PREFIX}-columns: 8;`);
            expect(result).to.include(`--${VAR_PREFIX}-container-padding: 24px;`);
            expect(result).to.include(`--${VAR_PREFIX}-screen-size: 'sm';`);

            // md
            expect(result).to.include('@media only screen and (min-width: 769px)');
            expect(result).to.include(`--${VAR_PREFIX}-column-gap: 24px;`);
            expect(result).to.include(`--${VAR_PREFIX}-columns: 12;`);
            expect(result).to.include(`--${VAR_PREFIX}-container: 960px;`);
            expect(result).to.include(`--${VAR_PREFIX}-screen-size: 'md';`);
        });
    });
});