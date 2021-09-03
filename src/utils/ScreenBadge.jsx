/* eslint-disable react/boolean-prop-naming */
import {Component} from 'react';

import styled from 'styled-components';

import {ScreenClassContext} from './ScreenClassProvider';

/**
 * ScreenBadge
 *
 * @component
 * @augments {Component<Props, State>}
 * @extends {Component}
 */
class ScreenBadge extends Component {
    static propTypes = {}

    static defaultProps = {}

    static contextType = ScreenClassContext;

    /**
     * Renders the Component.
     *
     * @returns {JSX} Component.
     * @memberof ScreenBadge
     */
    render() {
        const screenClass = this.context;

        return <ScreenBadgeElement>{screenClass}</ScreenBadgeElement>;
    }
}

export default ScreenBadge;

const ScreenBadgeElement = styled.div`
    align-items: center;
    background-color: #5901ad40;
    border-radius: 5px;
    bottom: 10px;
    display: flex;
    font-family: Arial, Helvetica, sans-serif;
    font-size: 1.5rem;
    font-weight: bold;
    height: 30px;
    justify-content: center;
    position: fixed;
    right: 10px;
    width: 50px;
    z-index: 10;
`;