import React from 'react'
import { DropTarget } from 'react-dnd'

import { dragItemTypes } from '../dragTypes.js'
import DraggableOscillator from './DraggableOscillator.jsx'

const synthBoardDropSpec = {
    drop(props, monitor) {
        const dragDelta = monitor.getDifferenceFromInitialOffset();
        const droppedModule = monitor.getItem()

        props.updateModulePosition(droppedModule.id, dragDelta)
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
                    this.props.modules.map((mod) => {
                        switch (mod.type) {
                            case 'sinosc':
                                let oscFreq = this.props.globalPitchShift + mod.props.frequency

                                return (
                                    <DraggableOscillator
                                        key={mod.id}
                                        id={mod.id}
                                        frequency={oscFreq}
                                        audioContext={this.props.audioContext}
                                        position={mod.position}
                                        onRemoveClick={(e) => { this.props.removeModule(mod.id) }}
                                    />
                                )
                                
                                break;
                        
                            default:
                                console.error(`Invalid module type ${mod.type} passed to SynthBoard`)
                                return;
                                break;
                        }
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