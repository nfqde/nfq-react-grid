/* eslint-disable react/boolean-prop-naming */
import {Component} from 'react';

import PropTypes from 'prop-types';

import {ScreenClassContext} from './ScreenClassProvider';

/**
 * ScreenClassRender
 *
 * @component
 * @augments {Component<Props, State>}
 * @extends {Component}
 */
class ScreenClassRender extends Component {
    static propTypes = {render: PropTypes.func.isRequired}

    static defaultProps = {}

    static contextType = ScreenClassContext;

    /**
     * Renders the Component.
     *
     * @returns {JSX} Component.
     * @memberof ScreenClassRender
     */
    render() {
        const screenClass = this.context;
        const {render} = this.props;

        return render(screenClass);
    }
}

export default ScreenClassRender;