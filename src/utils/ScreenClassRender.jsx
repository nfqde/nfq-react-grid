/* eslint-disable react/boolean-prop-naming */
import {useContext} from 'react';

import PropTypes from 'prop-types';

import {ScreenClassContext} from './ScreenClassProvider';

/**
 * ScreenClassRender
 *
 * @component
 * @augments {Component<Props, State>}
 * @returns {JSX} Component.
 */
const ScreenClassRender = ({render}) => {
    const screenClass = useContext(ScreenClassContext);

    return render(screenClass);
};

ScreenClassRender.displayName = 'ScreenClassRender';
ScreenClassRender.propTypes = {render: PropTypes.func.isRequired};

export default ScreenClassRender;