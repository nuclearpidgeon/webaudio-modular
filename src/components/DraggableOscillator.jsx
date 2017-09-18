import React from 'react'
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

import { dragItemTypes } from '../dragTypes.js'

import OscillatorModule from './OscillatorModule.jsx'

const oscillatorDragSpec = {
    beginDrag(props) {
        return {
            name: props.name
        }
    }
}

function oscillatorDragProps(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class DraggableOscillator extends React.Component {
    render() {
        return (
            <OscillatorModule
                key={this.props.name}
                name={this.props.name}
                frequency={this.props.frequency}
                audioContext={this.props.audioContext}
            >
                {
                    this.props.connectDragSource(
                        <div style={{
                            position: 'relative',
                            top: this.props.position[0],
                            left: this.props.position[1],
                            border: '1px solid gray',
                            opacity: this.props.isDragging ? 0.5 : 1
                        }}>
                            { this.props.name } - { this.props.frequency }
                            <br />
                            <button onClick={ this.props.onRemoveClick }>x</button>
                        </div>
                    )
                }
            </OscillatorModule>
        )
    }
}

DraggableOscillator.propTypes = {
  connectDragSource: PropTypes.func.isRequired,
  isDragging: PropTypes.bool.isRequired,
  name: PropTypes.string,
  frequency: PropTypes.number.isRequired,
  audioContext: PropTypes.any.isRequired,
  position: PropTypes.arrayOf(PropTypes.number),
  onRemoveClick: PropTypes.func
};

export default DragSource(
    dragItemTypes.OSCILLATOR,
    oscillatorDragSpec,
    oscillatorDragProps
)(DraggableOscillator)
