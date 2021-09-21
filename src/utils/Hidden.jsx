/* eslint-disable react/boolean-prop-naming */
import {useContext} from 'react';

import PropTypes from 'prop-types';

import {ScreenClassContext} from './ScreenClassProvider';

/**
 * Hidden
 *
 * @component
 * @augments {Component<Props, State>}
 * @returns {JSX} Component.
 */
const Hidden = ({children, ...screenClasses}) => {
    const screenClass = useContext(ScreenClassContext);

    return screenClasses[String(screenClass)] ? null : children;
};

Hidden.displayName = 'Hidden';
Hidden.propTypes = {
    children: PropTypes.node.isRequired,
    lg: PropTypes.bool,
    md: PropTypes.bool,
    sm: PropTypes.bool,
    xl: PropTypes.bool,
    xs: PropTypes.bool,
    xxl: PropTypes.bool
};
Hidden.defaultProps = {
    lg: false,
    md: false,
    sm: false,
    xl: false,
    xs: false,
    xxl: false
};

export default Hidden;