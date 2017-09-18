import React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import { dragItemTypes } from '../dragTypes.js'
import DraggableOscillator from './DraggableOscillator.jsx'

class SynthBoard extends React.Component {
    render() {
        return (
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

export default DragDropContext(HTML5Backend)(SynthBoard)