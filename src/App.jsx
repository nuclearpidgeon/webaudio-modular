import React from 'react'
import { DragDropContext } from 'react-dnd'
import HTML5Backend from 'react-dnd-html5-backend'

import SynthBoard from './components/SynthBoard.jsx'

const startFreq = 440

let globalCounter = 0
let nextFreq = startFreq
let nextFreqDivider = 2

function nextCounter() {
    return globalCounter += 1
}

const calcNextFreq = () => (
    nextFreq + ((1 / 2^globalCounter) * startFreq)
)

class App extends React.Component {
    constructor(props) {
        super(props)

        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.state = {
            modules: [],
            globalPitchShift: 0
        }

        this.addModule = this.addModule.bind(this)
        this.removeModule = this.removeModule.bind(this)
        this.handlePitchShiftChange = this.handlePitchShiftChange.bind(this)
        this.updateModulePosition = this.updateModulePosition.bind(this)
    }

    addModule(type) {
        const currentFreq = nextFreq

        globalCounter += 1
        nextFreq = calcNextFreq(currentFreq)

        let newModule = {
            id: globalCounter,
            position: [globalCounter * 5, globalCounter * 5]
        }

        switch (type) {
            case 'sinosc':
                newModule = {
                    ...newModule,
                    type: 'sinosc',
                    props: {
                        frequency: currentFreq,
                    }
                }
                break;
        
            default:
                throw `addModule called with invalid module type '${type}'`
                break;
        }
        
        this.setState((prevState) => ({
            ...prevState,
            modules: [
                ...prevState.modules,
                newModule
            ]
        }))
    }

    removeModule(id) {
        this.setState((prevState) => ({
            ...prevState,
            modules: [
                ...prevState.modules.filter((mod) => (mod.id != id))
            ]
        }))
    }

    updateModulePosition(id, delta) {
        this.setState((prevState) => ({
            ...prevState,
            modules: prevState.modules.map((mod) => {
                if (mod.id == id) {
                    const newX = Math.round(mod.position[0] + delta.x)
                    const newY = Math.round(mod.position[1] + delta.y)

                    return {
                        ...mod,
                        position: [newX, newY]
                    }
                }
                else {
                    return mod
                }
            })
        }))
    }

    handlePitchShiftChange(e) {
        const newVal = parseFloat(e.target.value)
        this.setState((prevState) => ({
            ...prevState,
            globalPitchShift: newVal
        }))
    }

    render() {
        return (
            <div>
                <h1>Hello world!</h1>
                <button onClick={(e) => this.addModule('sinosc')}>Add an oscillator</button>

                <SynthBoard
                    audioContext={this.audioContext}
                    modules={this.state.modules}
                    globalPitchShift={this.state.globalPitchShift}
                    removeModule={this.removeModule}
                    updateModulePosition={this.updateModulePosition}
                />

                <div>
                    <label>Global Pitch Shift</label>
                    <input
                        type="number"
                        value={this.state.globalPitchShift}
                        onChange={this.handlePitchShiftChange}/>
                </div>
            </div>
        )
    }
}

export default DragDropContext(HTML5Backend)(App)