import React, {Component} from 'react';

import {autobind} from 'core-decorators';
import PropTypes from 'prop-types';
import {withTheme} from 'styled-components';

import {getScreenClass} from './lib';

const defaultData = 'xxl';

export const ScreenClassContext = React.createContext(defaultData);

/**
 * ScreenClassProvider class.
 *
 * @component
 * @augments {Component<Props, State>}
 * @extends {Component}
 */
class ScreenClassProvider extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        theme: PropTypes.object.isRequired
    }

    static defaultProps = {}

    /**
     * Creates an instance of ScreenClassProvider.
     *
     * @param {Object} props Component props.
     * @memberof ScreenClassProvider
     */
    constructor(props) {
        super(props);

        this.state = {screenClass: 'xxl'};
    }

    /**
     * Adds the resize handler to get the ScreenClass.
     *
     * @memberof ScreenClassProvider
     */
    componentDidMount() {
        window.addEventListener('resize', this.getScreenClass);
    }

    /**
     * Removes the resize handler to get the ScreenClass.
     *
     * @memberof ScreenClassProvider
     */
    componentWillUnmount() {
        window.removeEventListener('resize', this.getScreenClass);
    }

    /**
     * Calculates the ScreenClass.
     *
     * @memberof ScreenClassProvider
     */
    @autobind
    getScreenClass() {
        const {screenClass} = this.state;
        const {theme} = this.props;
        const newScreenClass = getScreenClass(theme);

        if (newScreenClass !== screenClass) {
            this.setState({screenClass: newScreenClass});
        }
    }

    /**
     * Renders the modal provider and childs.
     *
     * @returns {JSX} The ScreenClassProvider.
     * @memberof ScreenClassProvider
     */
    render() {
        const {screenClass} = this.state;
        const {children} = this.props;

        return (
            <ScreenClassContext.Provider
                value={screenClass}
            >
                {children}
            </ScreenClassContext.Provider>
        );
    }
}

export default withTheme(ScreenClassProvider);