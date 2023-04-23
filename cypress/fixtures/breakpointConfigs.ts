export const breakPointConfigs = {
    multipleFluid: {
        lg: 'fluid',
        md: 'fluid',
        xl: 'fluid',
        xxl: 'fluid'
    },
    multipleFluidWithNumber: {
        lg: 'fluid',
        md: 'fluid',
        xl: 20,
        xxl: 20
    },
    nothing: {},
    noXs: {sm: 10},
    repeatingNumbers: {
        lg: 20,
        md: 20,
        xl: 30,
        xs: 10,
        xxl: 30
    },
    singleFluid: {md: 'fluid'},
    undefinedBreakpoint: {
        // eslint-disable-next-line no-undefined
        lg: undefined,
        xs: 10
    }
};