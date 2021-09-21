/* eslint-disable react/boolean-prop-naming */
import {useContext} from 'react';

import PropTypes from 'prop-types';

import {ScreenClassContext} from './ScreenClassProvider';

/**
 * Visible
 *
 * @component
 * @augments {Component<Props, State>}
 * @returns {JSX} Component.
 */
const Visible = ({children, ...screenClasses}) => {
    const screenClass = useContext(ScreenClassContext);

    return screenClasses[String(screenClass)] ? children : null;
};

Visible.displayName = 'Visible';
Visible.propTypes = {
    children: PropTypes.node.isRequired,
    lg: PropTypes.bool,
    md: PropTypes.bool,
    sm: PropTypes.bool,
    xl: PropTypes.bool,
    xs: PropTypes.bool,
    xxl: PropTypes.bool
};
Visible.defaultProps = {
    lg: false,
    md: false,
    sm: false,
    xl: false,
    xs: false,
    xxl: false
};

export default Visible;