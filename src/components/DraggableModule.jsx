import React from 'react'
import PropTypes from 'prop-types';
import { DragSource } from 'react-dnd';

import { dragItemTypes } from '../dragTypes.js'

const oscillatorDragSpec = {
    beginDrag(props) {
        return {
            id: props.id
        }
    }
}

function oscillatorDragProps(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging()
  }
}

class DraggableModule extends React.Component {
    render() {
        return this.props.connectDragSource(
            <div style={{
                position: 'relative',
                width: "80px",
                height: "80px",
                left: this.props.position[0],
                top: this.props.position[1],
                border: '1px solid gray',
                opacity: this.props.isDragging ? 0.5 : 1
            }}>
                { this.props.children }
            </div>
        )
    }
}

DraggableModule.propTypes = {
    id: PropTypes.number,
    audioContext: PropTypes.any,
    position: PropTypes.arrayOf(PropTypes.number),
    onRemoveClick: PropTypes.func,
    connectDragSource: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
};

export default DragSource(
    dragItemTypes.OSCILLATOR,
    oscillatorDragSpec,
    oscillatorDragProps
)(DraggableModule)
