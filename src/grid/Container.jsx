/* eslint-disable react/boolean-prop-naming */
import React, {forwardRef} from 'react';

import styled, {css} from 'styled-components';

import {DIMENSIONS} from '../defaultConfig';
import {useDebug} from '../utils/hooks';
import {getConfig, media} from '../utils/lib';

/**
 * @typedef {object} ContainerComponentProps
 * @property {React.ReactNode}                    children    Component children.
 * @property {React.ElementType}                  [as]        Component type.
 * @property {string}                             [className] An styled components class name for inheritance.
 * @property {boolean|Array<Screensizes>}         [fluid]     Row alignment.
 * @property {string}                             [testId]    Cypress test id.
 * @property {React.ForwardedRef<HTMLDivElement>} [ref]       Component ref.
 */

/**
 * @type React.FC<ContainerComponentProps>
 */
const Container = forwardRef(({as, children, className, fluid, testId, ...eventHandler}, ref) => {
    const classNames = [className, useDebug()];

    return (
        <ContainerElement
            ref={ref}
            as={as}
            className={classNames.join(' ')}
            data-cy={testId}
            fluid={fluid}
            // eslint-disable-next-line react/jsx-props-no-spreading
            {...eventHandler}
        >
            {children}
        </ContainerElement>
    );
});

Container.displayName = 'Container';
Container.defaultProps = {
    as: null,
    className: null,
    fluid: false,
    testId: null
};

export default Container;

/**
 * @typedef {object} ContainerProps
 * @property {React.ElementType}          [as]    Component type.
 * @property {boolean|Array<Screensizes>} [fluid] If the container should be fluid or not.
 */

/**
 * @type {React.FC<StyledComponentProps<'div', ContainerProps>>}
 */
const ContainerElement = /** @type {StyledComponentFunction<'div', ContainerProps>} */ (styled.div)`
    box-sizing: border-box;
    margin-left: auto;
    margin-right: auto;
    max-width: 100%;
    width: 100%;

    ${({theme}) => css`
        ${DIMENSIONS.map(screenSize => getConfig(theme).container[String(screenSize)] && media(theme, screenSize)`
            padding-left: ${getConfig(theme).paddingWidth[String(screenSize)]}px;
            padding-right: ${getConfig(theme).paddingWidth[String(screenSize)]}px;
        `)}
    `}


    ${({fluid, theme}) => css`
        ${DIMENSIONS.map(screenSize => getConfig(theme).container[String(screenSize)] && media(theme, screenSize)`
            ${(typeof getConfig(theme).container[String(screenSize)] === 'number' && ((Array.isArray(fluid) && !fluid.includes(screenSize)) || fluid === false))
        // eslint-disable-next-line indent
                ? `width: ${getConfig(theme).container[String(screenSize)]}px;`
        // eslint-disable-next-line indent
                : 'width: 100%;'}
        `)}
    `}

    ${({theme}) => process.env.NODE_ENV !== 'production' && css`
        &.debug {
            background-color: ${getConfig(theme).debug.container.background};
            outline: ${getConfig(theme).debug.container.outline} solid 1px;
        }
    `}
`;