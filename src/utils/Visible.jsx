/* eslint-disable react/boolean-prop-naming */
import {Component} from 'react';

import PropTypes from 'prop-types';

import {ScreenClassContext} from './ScreenClassProvider';

/**
 * Visible
 *
 * @component
 * @augments {Component<Props, State>}
 * @extends {Component}
 */
class Visible extends Component {
    static propTypes = {
        children: PropTypes.node.isRequired,
        lg: PropTypes.bool,
        md: PropTypes.bool,
        sm: PropTypes.bool,
        xl: PropTypes.bool,
        xs: PropTypes.bool,
        xxl: PropTypes.bool
    }

    static defaultProps = {
        lg: false,
        md: false,
        sm: false,
        xl: false,
        xs: false,
        xxl: false
    }

    static contextType = ScreenClassContext;

    /**
     * Renders the Component.
     *
     * @returns {JSX} Component.
     * @memberof Visible
     */
    render() {
        const screenClass = this.context;
        const {children, ...screenClasses} = this.props;

        return screenClasses[String(screenClass)] ? children : null;
    }
}

export default Visible;