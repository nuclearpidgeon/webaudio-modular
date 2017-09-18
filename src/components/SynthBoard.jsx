import React from 'react'
import { DropTarget } from 'react-dnd'

import { dragItemTypes } from '../dragTypes.js'
import DraggableOscillator from './DraggableOscillator.jsx'

const synthBoardDropSpec = {
    drop(props, monitor) {
        const dragDelta = monitor.getDifferenceFromInitialOffset();
        const droppedOsc = monitor.getItem()

        props.updateOscillatorPosition(droppedOsc.name, dragDelta)
    }
}

function synthBoardDropProps(connect, monitor) {
    return {
        connectDropTarget: connect.dropTarget(),
        isOver: monitor.isOver() // 'is pointer over this component?'
    }
}

class SynthBoard extends React.Component {
    render() {
        return this.props.connectDropTarget(
            <div style={{
                // position: 'absolute',
                width: "500px",
                height: "500px",
                border: "1px solid black"
            }}>
                {
                    this.props.oscillators.map((osc) => {
                        let oscFreq = this.props.globalPitchShift + osc.frequency

                        return (
                            <DraggableOscillator
                                key={osc.name}
                                name={osc.name}
                                frequency={oscFreq}
                                audioContext={this.props.audioContext}
                                position={osc.position}
                                onRemoveClick={(e) => { this.props.removeOscillator(osc.name) }}
                            />
                        )
                    })
                }
            </div>
        )
    }
}

export default DropTarget(
    dragItemTypes.OSCILLATOR,
    synthBoardDropSpec,
    synthBoardDropProps
)(SynthBoard)