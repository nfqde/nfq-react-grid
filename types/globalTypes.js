/**
 * @typedef {import('styled-components').ThemedStyledFunction<C, import('./index').IConfig, O>} StyledComponentFunction
 * @template C, O
 */

/**
 * @typedef {import('styled-components').StyledComponentProps<C, {}, O, O>} StyledComponentProps
 * @template C, O
 */

/**
 * @typedef {object} ExtraPadding
 * @property {string} [xs]  The padding for the xs screen size with unit.
 * @property {string} [sm]  The padding for the sm screen size with unit.
 * @property {string} [md]  The padding for the md screen size with unit.
 * @property {string} [lg]  The padding for the lg screen size with unit.
 * @property {string} [xl]  The padding for the xl screen size with unit.
 * @property {string} [xxl] The padding for the xxl screen size with unit.
 */

/**
 * @typedef {('xs'|'sm'|'md'|'lg'|'xl'|'xxl')} Screensizes
 */

/**
 * @typedef {('row'|'column')} FlexDirection
 *
 * @typedef {object} Direction
 * @property {FlexDirection} [xs]  The direction for the xs screen size.
 * @property {FlexDirection} [sm]  The direction for the sm screen size.
 * @property {FlexDirection} [md]  The direction for the md screen size.
 * @property {FlexDirection} [lg]  The direction for the lg screen size.
 * @property {FlexDirection} [xl]  The direction for the xl screen size.
 * @property {FlexDirection} [xxl] The direction for the xxl screen size.
 */

/**
 * @typedef {object} Sizes
 * @property {number} [xs]  The offset for the xs screen size.
 * @property {number} [sm]  The offset for the sm screen size.
 * @property {number} [md]  The offset for the md screen size.
 * @property {number} [lg]  The offset for the lg screen size.
 * @property {number} [xl]  The offset for the xl screen size.
 * @property {number} [xxl] The offset for the xxl screen size.
 */

/**
 * @typedef {('flex-start'|'flex-end'|'center'|'baseline'|'stretch'|'inherit'|'initial'|'unset')} FlexAlign
 */

/**
 * @typedef {object} Align
 * @property {FlexAlign} [xs]  The align for the xs screen size.
 * @property {FlexAlign} [sm]  The align for the sm screen size.
 * @property {FlexAlign} [md]  The align for the md screen size.
 * @property {FlexAlign} [lg]  The align for the lg screen size.
 * @property {FlexAlign} [xl]  The align for the xl screen size.
 * @property {FlexAlign} [xxl] The align for the xxl screen size.
 */

/**
 * @typedef {('flex-start'|'flex-end'|'center'|'space-between'|'space-around'|'space-evenly'|'inherit'|'initial'|'unset')} FlexJustify
 */

/**
 * @typedef {object} Justify
 * @property {FlexJustify} [xs]  The justify for the xs screen size.
 * @property {FlexJustify} [sm]  The justify for the sm screen size.
 * @property {FlexJustify} [md]  The justify for the md screen size.
 * @property {FlexJustify} [lg]  The justify for the lg screen size.
 * @property {FlexJustify} [xl]  The justify for the xl screen size.
 * @property {FlexJustify} [xxl] The justify for the xxl screen size.
 */

/**
 * @typedef {object} Offset
 * @property {number} [xs]  The offset for the xs screen size.
 * @property {number} [sm]  The offset for the sm screen size.
 * @property {number} [md]  The offset for the md screen size.
 * @property {number} [lg]  The offset for the lg screen size.
 * @property {number} [xl]  The offset for the xl screen size.
 * @property {number} [xxl] The offset for the xxl screen size.
 */