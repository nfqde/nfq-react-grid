/* eslint-disable react/boolean-prop-naming */
import {useContext} from 'react';

import {ScreenClassContext} from './ScreenClassProvider';

/**
 * ScreenClassRender.
 *
 * @param {object}   props        Component props.
 * @param {Function} props.render Function to render.
 *
 * @returns {React.ReactNode} Component.
 */
const ScreenClassRender = ({render}) => {
    const screenClass = useContext(ScreenClassContext);

    return render(screenClass);
};

ScreenClassRender.displayName = 'ScreenClassRender';

export default ScreenClassRender;