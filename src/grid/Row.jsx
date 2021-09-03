/* eslint-disable react/boolean-prop-naming */
import React, {Component, forwardRef} from 'react';

import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import {DIMENSIONS} from '../defaultConfig';
import {HALF} from '../utils/constants';
import {getConfig, media} from '../utils/lib';
import {calcAlign, calcDirection, calcJustify} from '../utils/rowHelpers';

/**
 * Row
 *
 * @component
 * @augments {Component<Props, State>}
 * @extends {Component}
 */
class Row extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        align: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        as: PropTypes.string,
        className: PropTypes.string,
        direction: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        justify: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        noWrap: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
        order: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
        reverse: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
        /** TestID for cypress testing  */
        testId: PropTypes.string
    }

    static defaultProps = {
        align: null,
        as: null,
        className: null,
        direction: 'row',
        innerRef: null,
        justify: null,
        noWrap: null,
        order: null,
        reverse: false,
        testId: null
    }

    /**
     * Creates an instance of Row.
     *
     * @param {Object} props Component props.
     *
     * @memberof Row
     */
    constructor(props) {
        super(props);

        this.state = {debug: false};
    }

    /**
     * Sets an event listener to toggle debug mode.
     *
     * @memberof Row
     */
    componentDidMount() {
        if (process.env.NODE_ENV !== 'production') {
            window.addEventListener('keydown', this.toggleDebug);
        }
    }

    /**
     * Unsets an event listener to toggle debug mode.
     *
     * @memberof Row
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
     * @memberof Row
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
     * @memberof Row
     */
    render() {
        const {debug} = this.state;
        const {
            align,
            as,
            children,
            className,
            direction,
            innerRef,
            justify,
            noWrap,
            order,
            reverse,
            testId
        } = this.props;

        return (
            <RowElement
                ref={innerRef}
                align={align}
                as={as}
                className={className}
                data-cy={testId}
                debug={debug}
                direction={direction}
                justify={justify}
                noWrap={noWrap}
                order={order}
                reverse={reverse}
            >
                {children}
            </RowElement>
        );
    }
}

// eslint-disable-next-line react/jsx-props-no-spreading
export default forwardRef((props, ref) => <Row {...props} innerRef={ref} />);

const RowElement = styled.div`
    box-sizing: border-box;
    display: flex;
    flex: 1 1 auto;
    flex-wrap: wrap;

    ${({theme}) => css`
        ${DIMENSIONS.map(screenSize => getConfig(theme).container[String(screenSize)] && media(theme, screenSize)`
            margin-left: -${getConfig(theme).gutterWidth[String(screenSize)] / HALF}px;
            margin-right: -${getConfig(theme).gutterWidth[String(screenSize)] / HALF}px;
        `)}
    `}


    ${({direction, noWrap, reverse, theme}) => css`
        ${calcDirection(direction, noWrap, reverse, theme)}
    `}

    ${({order, theme}) => order !== null && css`
        ${DIMENSIONS.map(screenSize => typeof getConfig(theme).breakpoints[String(screenSize)] === 'number' && media(theme, screenSize)`
            ${typeof order === 'object'
        // eslint-disable-next-line indent
                ? typeof order[String(screenSize)] !== 'undefined' && `order: ${order[String(screenSize)]};`
        // eslint-disable-next-line indent
                : `order: ${order};`}
        `)}
    `}

    ${({align, theme}) => align && css`
        ${calcAlign(align, theme)}
    `}

    ${({justify, theme}) => justify && css`
        ${calcJustify(justify, theme)}
    `}

    ${({debug, theme}) => debug && css`
        background-color: ${getConfig(theme).debug.row.background};
        outline: ${getConfig(theme).debug.row.outline} solid 1px;
    `}
`;