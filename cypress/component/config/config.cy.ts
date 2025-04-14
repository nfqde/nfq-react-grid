import {createConfig} from '../../../src/config/config';
import {
    defaultBaseSpacing,
    defaultBreakpoints,
    defaultColumnGap,
    defaultColumns,
    defaultContainerPadding,
    defaultSkeleton,
    defaultSkeletonDefault
} from '../../../src/config/defaults';
import {configCache} from '../../../src/utils/cache';

describe('createConfig', () => {
    const breakpoints = ['xs', 'sm', 'md'] as const;

    it('merges defaults when config is empty', () => {
        const result = createConfig(breakpoints, {
            breakpoints: {},
            container: {}
        });

        // @ts-expect-error
        expect(result.configType.baseSpacing).to.equal(defaultBaseSpacing);
        expect(result.configType.breakpoints).to.deep.equal({
            md: defaultBreakpoints.md,
            sm: defaultBreakpoints.sm,
            xs: defaultBreakpoints.xs
        });
        // @ts-expect-error
        expect(result.configType.columnGap).to.deep.equal({xs: defaultColumnGap});
        // @ts-expect-error
        expect(result.configType.columns).to.deep.equal({xs: defaultColumns});
        // @ts-expect-error
        expect(result.configType.containerPadding).to.deep.equal({xs: defaultContainerPadding});
        // @ts-expect-error
        expect(result.configType.skeleton).to.deep.equal(defaultSkeleton);
        // @ts-expect-error
        expect(result.configType.skeletonDefault).to.equal(defaultSkeletonDefault);
    });

    it('merges user-provided values into config', () => {
        const userConfig = {
            baseSpacing: 2,
            breakpoints: {md: 800, sm: 600, xs: 10},
            columnGap: {md: 12, sm: 8, xs: 4},
            columns: {md: 6, sm: 4, xs: 2},
            container: {md: 800, sm: 600, xs: 10},
            containerPadding: {md: 24, sm: 20, xs: 16},
            debug: {highlight: {enabled: true}},
            skeleton: {
                default: {
                    animation: {
                        delay: 0,
                        direction: 'normal',
                        duration: 1000
                    },
                    borderRadius: 4,
                    colors: {
                        base: '#eee',
                        baseHighlight: '#fff',
                        highlight: '#ddd'
                    }
                }
            },
            skeletonDefault: 'default'
        };

        const result = createConfig(breakpoints, userConfig);

        expect(result.configType.baseSpacing).to.equal(2);
        expect(result.configType.columnGap).to.deep.equal(userConfig.columnGap);
        expect(result.configType.columns).to.deep.equal(userConfig.columns);
        expect(result.configType.breakpoints).to.deep.equal(userConfig.breakpoints);
        expect(result.configType.containerPadding).to.deep.equal(userConfig.containerPadding);
        expect(result.configType.debug.highlight.enabled).to.equal(true);
        expect(result.configType.skeleton).to.deep.equal(userConfig.skeleton);
        expect(result.configType.skeletonDefault).to.equal('default');
    });

    it('writes breakpointOrder and breakpoints to configCache', () => {
        createConfig(breakpoints, {container: {md: 800, sm: 600, xs: 10}});

        const cached = configCache.get('breakpointConfig');

        expect(cached).to.deep.equal({
            breakpointOrder: breakpoints,
            breakpoints: {
                md: defaultBreakpoints.md,
                sm: defaultBreakpoints.sm,
                xs: defaultBreakpoints.xs
            }
        });
    });

    it('returns a globalCss Emotion object with expected structure', () => {
        const result = createConfig(breakpoints, {container: {md: 800, sm: 600, xs: 10}});
        const {styles} = result.globalCss;

        expect(styles).to.include('--nfq-grid-base-spacing');
        expect(styles).to.include(':root');
        expect(styles).to.include('--nfq-grid-screen-size');
        expect(styles).to.include('--nfq-grid-debug-highlight-enabled');
        expect(styles).to.include('--nfq-grid-skeleton');
    });
});