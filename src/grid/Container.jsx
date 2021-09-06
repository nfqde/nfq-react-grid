/* eslint-disable react/boolean-prop-naming */
import React, {Component, forwardRef} from 'react';

import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import {DIMENSIONS} from '../defaultConfig';
import {getConfig, media} from '../utils/lib';

/**
 * Container
 *
 * @component
 * @augments {Component<Props, State>}
 * @extends {Component}
 */
class Container extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        as: PropTypes.string,
        className: PropTypes.string,
        fluid: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
        innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        /** TestID for cypress testing  */
        testId: PropTypes.string
    }

    static defaultProps = {
        as: null,
        className: null,
        fluid: false,
        innerRef: null,
        testId: null
    }

    /**
     * Creates an instance of Container.
     *
     * @param {Object} props Component props.
     *
     * @memberof Container
     */
    constructor(props) {
        super(props);

        if (process.env.NODE_ENV !== 'production') {
            this.state = {debug: false};
        }
    }

    /**
     * Sets an event listener to toggle debug mode.
     *
     * @memberof Container
     */
    componentDidMount() {
        if (process.env.NODE_ENV !== 'production') {
            window.addEventListener('keydown', this.toggleDebug);
        }
    }

    /**
     * Unsets an event listener to toggle debug mode.
     *
     * @memberof Container
     */
    componentWillUnmount() {
        if (process.env.NODE_ENV !== 'production') {
            window.removeEventListener('keydown', this.toggleDebug);
        }
    }

    /**
     * Sets the debug state.
     *
     * @param {KeyboardEvent} e The keyboard event.
     *
     * @memberof Container
     */
    @autobind
    toggleDebug(e) {
        if (e.ctrlKey && e.code === 'KeyD') {
            e.preventDefault();
            // eslint-disable-next-line no-invalid-this
            this.setState(oldState => ({debug: !oldState.debug}));
        }
    }

    /**
     * Renders the Component.
     *
     * @returns {JSX} Component.
     * @memberof Container
     */
    render() {
        const {as, children, className, fluid, innerRef, testId} = this.props;
        const classNames = [className];

        if (process.env.NODE_ENV !== 'production') {
            const {debug} = this.state;

            if (debug) {
                classNames.push('debug');
            }
        }

        return (
            <ContainerElement ref={innerRef} as={as} className={classNames.join(' ')} data-cy={testId} fluid={fluid}>
                {children}
            </ContainerElement>
        );
    }
}

// eslint-disable-next-line react/jsx-props-no-spreading
export default forwardRef((props, ref) => <Container {...props} innerRef={ref} />);

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