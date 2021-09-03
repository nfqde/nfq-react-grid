/* eslint-disable react/boolean-prop-naming */
import React, {Component, forwardRef} from 'react';

import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import {DIMENSIONS} from '../defaultConfig';
import {calcAlign, calcDirection, calcJustify, calcOffset, calcSizes} from '../utils/colHelpers';
import {HALF} from '../utils/constants';
import {getConfig, media} from '../utils/lib';

/**
 * Col
 *
 * @component
 * @augments {Component<Props, State>}
 * @extends {Component}
 */
class Col extends Component {
    static propTypes = {
        align: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        as: PropTypes.string,
        children: PropTypes.node,
        className: PropTypes.string,
        direction: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        innerRef: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
        justify: PropTypes.oneOfType([PropTypes.string, PropTypes.object]),
        lg: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        md: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        noGutter: PropTypes.bool,
        offset: PropTypes.oneOfType([PropTypes.string, PropTypes.number, PropTypes.object]),
        order: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
        reverse: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
        sm: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        /** TestID for cypress testing  */
        testId: PropTypes.string,
        xl: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        xs: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
        xxl: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
    }

    static defaultProps = {
        align: null,
        as: null,
        children: null,
        className: null,
        direction: 'column',
        innerRef: null,
        justify: null,
        lg: null,
        md: null,
        noGutter: false,
        offset: null,
        order: null,
        reverse: false,
        sm: null,
        testId: null,
        xl: null,
        xs: null,
        xxl: null
    }

    /**
     * Creates an instance of Col.
     *
     * @param {Object} props Component props.
     *
     * @memberof Col
     */
    constructor(props) {
        super(props);

        this.state = {debug: false};
    }

    /**
     * Sets an event listener to toggle debug mode.
     *
     * @memberof Col
     */
    componentDidMount() {
        if (process.env.NODE_ENV !== 'production') {
            window.addEventListener('keydown', this.toggleDebug);
        }
    }

    /**
     * Unsets an event listener to toggle debug mode.
     *
     * @memberof Col
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
     * @memberof Col
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
     * @memberof Col
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
            lg,
            md,
            noGutter,
            offset,
            order,
            reverse,
            sm,
            testId,
            xl,
            xs,
            xxl
        } = this.props;

        return (
            <ColElement
                ref={innerRef}
                align={align}
                as={as}
                className={className}
                data-cy={testId}
                debug={debug}
                direction={direction}
                justify={justify}
                lg={lg}
                md={md}
                noGutter={noGutter}
                offset={offset}
                order={order}
                reverse={reverse}
                sm={sm}
                xl={xl}
                xs={xs}
                xxl={xxl}
            >
                {children}
            </ColElement>
        );
    }
}

// eslint-disable-next-line react/jsx-props-no-spreading
export default forwardRef((props, ref) => <Col {...props} innerRef={ref} />);

const ColElement = styled.div`
    box-sizing: border-box;
    display: flex;
    flex: 1 0 auto;
    flex-direction: column;
    max-width: 100%;

    ${({noGutter, theme}) => !noGutter && css`
        ${DIMENSIONS.map(screenSize => typeof getConfig(theme).breakpoints[String(screenSize)] === 'number' && media(theme, screenSize)`
            padding-right: ${getConfig(theme).gutterWidth[String(screenSize)] / HALF}px;
            padding-left: ${getConfig(theme).gutterWidth[String(screenSize)] / HALF}px;
        `)}
    `}

    ${({theme, ...sizes}) => css`
        ${calcSizes(sizes, theme)}
    `}

    ${({offset, theme}) => offset && css`
        ${calcOffset(offset, theme)}
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

    ${({direction, reverse, theme}) => css`
        ${calcDirection(direction, reverse, theme)}
    `}

    ${({align, theme}) => align && css`
        ${calcAlign(align, theme)}
    `}

    ${({justify, theme}) => justify && css`
        ${calcJustify(justify, theme)}
    `}

    ${({debug, theme}) => debug && css`
        background-clip: content-box, padding-box;
        background-image:
            linear-gradient(to bottom, ${getConfig(theme).debug.col.background} 0%, ${getConfig(theme).debug.col.background} 100%),
            linear-gradient(to bottom, ${getConfig(theme).debug.col.padding} 0%, ${getConfig(theme).debug.col.padding} 100%);
        outline: ${getConfig(theme).debug.col.outline} solid 1px;
    `}
`;