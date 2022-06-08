export const CONF_KEY = 'nfqgrid';

/**
 * @type {Array<Screensizes>}
 */
export const DIMENSIONS = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];
export const DEFAULT_CONF = {
    baseSpacing: 0.5,
    breakpoints: {
        lg: 992,
        md: 769,
        sm: 576,
        xl: 1200,
        xs: 0,
        xxl: 1600
    },
    columns: {
        lg: 12,
        md: 12,
        sm: 12,
        xl: 12,
        xs: 12,
        xxl: 12
    },
    container: {
        lg: 1440,
        md: 'fluid',
        sm: 'fluid',
        xl: 1440,
        xs: 'fluid',
        xxl: 1440
    },
    debug: {
        col: {
            background: '#9a67cb',
            outline: '#ffffff',
            padding: '#c2cf8a'
        },
        container: {
            background: '#5901ad40',
            outline: '#ffffff'
        },
        row: {
            background: '#5901ad40',
            outline: '#ffffff'
        },
        spacer: {
            background: '#f9cc9d',
            outline: '#ffffff'
        }
    },
    gutterWidth: {
        lg: 20,
        md: 20,
        sm: 20,
        xl: 20,
        xs: 20,
        xxl: 20
    },
    mediaQuery: 'only screen',
    paddingWidth: {
        lg: 10,
        md: 10,
        sm: 10,
        xl: 10,
        xs: 10,
        xxl: 10
    }
};