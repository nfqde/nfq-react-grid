/* eslint-disable react/boolean-prop-naming */
import React, {forwardRef} from 'react';

import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import {DIMENSIONS} from '../defaultConfig';
import {useDebug} from '../utils/hooks';
import {getConfig, media} from '../utils/lib';

/**
 * Container
 *
 * @component
 * @augments {Component<Props, State>}
 * @extends {Component}
 */
const Container = forwardRef(({as, children, className, fluid, testId}, ref) => {
    const classNames = [className, useDebug()];

    return (
        <ContainerElement ref={ref} as={as} className={classNames.join(' ')} data-cy={testId} fluid={fluid}>
            {children}
        </ContainerElement>
    );
});

Container.displayName = 'Container';
Container.propTypes = {
    children: PropTypes.node.isRequired,
    as: PropTypes.string,
    className: PropTypes.string,
    fluid: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
    /** TestID for cypress testing  */
    testId: PropTypes.string
};

Container.defaultProps = {
    as: null,
    className: null,
    fluid: false,
    testId: null
};

export default Container;

const ContainerElement = styled.div`
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