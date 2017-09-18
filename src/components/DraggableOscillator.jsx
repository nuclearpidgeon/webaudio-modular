import React from 'react'
import PropTypes from 'prop-types';

import OscillatorModule from './OscillatorModule.jsx'
import DraggableModule from './DraggableModule.jsx'


class DraggableOscillator extends React.Component {
    render() {
        return (
            <DraggableModule id={this.props.id} position={this.props.position}>
                <OscillatorModule
                    frequency={this.props.frequency}
                    audioContext={this.props.audioContext}
                >
                    Module #{ this.props.id.toString() } - { this.props.frequency }
                    <br />
                    <button onClick={ this.props.onRemoveClick }>x</button>
                </OscillatorModule>
            </DraggableModule>
        )
    }
}

DraggableOscillator.propTypes = {
    id: PropTypes.number,
    frequency: PropTypes.number.isRequired,
    audioContext: PropTypes.any.isRequired,
    position: PropTypes.arrayOf(PropTypes.number),
    onRemoveClick: PropTypes.func
};

export default DraggableOscillator
