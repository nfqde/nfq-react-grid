export const VAR_PREFIX = 'nfq-grid';
export const defaultBaseSpacing = 0.5;
export const defaultBreakpoints = {
    lg: 992,
    md: 769,
    sm: 576,
    xl: 1200,
    xs: 0,
    xxl: 1600
};
export const defaultColumnGap = 20;
export const defaultColumns = 12;
export const defaultContainerPadding = 10;
export const defaultDebug = {
    col: {
        background: '#9a67cb',
        outline: '#ffffff',
        padding: '#c2cf8a'
    },
    container: {
        background: '#5901ad40',
        outline: '#ffffff',
        padding: '#c2cf8a'
    },
    row: {
        background: '#5901ad40',
        outline: '#ffffff',
        padding: '#c2cf8a'
    },
    spacer: {
        background: '#f9cc9d',
        outline: '#ffffff',
        padding: '#c2cf8a'
    }
};
export const defaultMediaQuery = 'only screen';
export const defaultSkeleton = {
    dark: {
        animation: {
            delay: 0.02,
            direction: 'normal',
            duration: 1.8
        },
        borderRadius: 0.4,
        colors: {
            base: 'rgba(0, 0, 102, 0.3)',
            baseHighlight: 'rgba(0, 0, 102, 0)',
            highlight: 'rgba(0, 0, 102, 0.3)'
        }
    },
    light: {
        animation: {
            delay: 0.02,
            direction: 'reverse',
            duration: 1.8
        },
        borderRadius: 0.4,
        colors: {
            base: 'rgba(255, 255, 255, 0.3)',
            baseHighlight: 'rgba(0, 0, 102, 0)',
            highlight: 'rgba(0, 0, 102, 0.3)'
        }
    }
};
// eslint-disable-next-line @typescript-eslint/no-unnecessary-type-assertion
export const defaultSkeletonDefault = 'dark' as const;