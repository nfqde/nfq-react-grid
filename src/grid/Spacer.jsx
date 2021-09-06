import React, {Component, createRef} from 'react';

import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import styled, {css} from 'styled-components';

import {getConfig} from '../utils/lib';
import {calcFlex, calcHeight, calcInline, calcMaxHeight, calcMaxWidth, calcWidth} from '../utils/spacerHelpers';

/**
 * Spacer
 *
 * @augments {Component<Props, State>}
 *
 * @class Spacer
 * @extends {Component}
 */
class Spacer extends Component {
    static propTypes = {
        inline: PropTypes.oneOfType([PropTypes.bool, PropTypes.array]),
        maxX: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
        maxY: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
        /** TestID for cypress testing  */
        testId: PropTypes.string,
        x: PropTypes.oneOfType([PropTypes.number, PropTypes.object]),
        y: PropTypes.oneOfType([PropTypes.number, PropTypes.object])
    }

    static defaultProps = {
        inline: false,
        maxX: null,
        maxY: null,
        testId: null,
        x: null,
        y: null
    }

    /**
     * Creates an instance of Spacer.
     *
     * @param {Object} props Component props.
     * @memberof Spacer
     */
    constructor(props) {
        super(props);

        this.state = {
            ...(process.env.NODE_ENV === 'production' ? {} : {debug: false}),
            direction: 'X'
        };

        if (typeof window === 'undefined') {
            this.observer = {
                disconnect() {},
                observe() {}
            };
        } else {
            this.observer = new MutationObserver(this.observeMutation);
        }

        this.spacing = createRef();
    }

    /**
     * Reads the parent flex direction value.
     *
     * @memberof Spacer
     */
    componentDidMount() {
        this.findFlexDirection();

        this.observer.observe(this.spacing.current.parentElement, {attributes: true});
        window.addEventListener('resize', this.findFlexDirection);

        if (process.env.NODE_ENV !== 'production') {
            window.addEventListener('keydown', this.toggleDebug);
        }
    }

    /**
     * Removes listeners.
     *
     * @memberof Spacer
     */
    componentWillUnmount() {
        this.observer.disconnect();
        window.removeEventListener('resize', this.findFlexDirection);

        if (process.env.NODE_ENV !== 'production') {
            window.removeEventListener('keydown', this.toggleDebug);
        }
    }

    /**
     * Observes any mutations made.
     *
     * @memberof Spacer
     */
    @autobind
    observeMutation() {
        this.findFlexDirection();
    }

    /**
     * Reads the parent flex direction value.
     *
     * @memberof Spacer
     */
    @autobind
    findFlexDirection() {
        if (window.getComputedStyle(this.spacing.current.parentElement)) {
            const {direction: oldDirection} = this.state;
            const {flexDirection} = window.getComputedStyle(this.spacing.current.parentElement);
            const direction = ['column', 'column-reverse'].includes(flexDirection) ? 'Y' : 'X';

            if (oldDirection !== direction) {
                this.setState({direction});
            }
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
     * @memberof Spacer
     */
    render() {
        const {direction} = this.state;
        const {inline, maxX, maxY, testId, x, y} = this.props;
        let className = null;

        if (process.env.NODE_ENV !== 'production') {
            const {debug} = this.state;

            if (debug) {
                className = 'debug';
            }
        }

        return (
            <SpacerElement
                ref={this.spacing}
                className={className}
                data-cy={testId}
                direction={direction}
                inline={inline}
                maxX={maxX}
                maxY={maxY}
                x={x}
                y={y}
            />
        );
    }
}

export default Spacer;

const SpacerElement = styled.span`
    flex: 1 1 0px;

    ${({inline, theme}) => css`
        ${calcInline(inline, theme)}
    `}

    ${({direction, theme, x, y}) => css`
        ${calcFlex(direction, theme, x, y)}
    `}

    ${({theme, y}) => ((typeof y === 'number' || typeof y === 'object') && y !== null) && css`
        ${calcHeight(theme, y)}
    `}

    ${({maxY, theme}) => ((typeof maxY === 'number' || typeof maxY === 'object') && maxY !== null) && css`
        ${calcMaxHeight(maxY, theme)}
    `}

    ${({maxX, theme}) => ((typeof maxX === 'number' || typeof maxX === 'object') && maxX !== null) && css`
        ${calcMaxWidth(maxX, theme)}
    `}

    ${({theme, x}) => ((typeof x === 'number' || typeof x === 'object') && x !== null) && css`
        ${calcWidth(theme, x)}
    `}

    ${({theme}) => process.env.NODE_ENV !== 'production' && css`
        &.debug {
            background-color: ${getConfig(theme).debug.spacer.background};
            outline: ${getConfig(theme).debug.spacer.outline} solid 1px;
        }
    `}
`;