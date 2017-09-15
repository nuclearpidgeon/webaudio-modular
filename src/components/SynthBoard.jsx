import React from 'react'

import OscillatorModule from './OscillatorModule.jsx'

const startFreq = 440

let globalCounter = 0
let nextFreq = startFreq
let nextFreqDivider = 2

export default class SynthBoard extends React.Component {
    constructor(props) {
        super(props)
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.state = {
            modules: []
        }

        this.addModule = this.addModule.bind(this)
        this.removeModule = this.removeModule.bind(this)
    }

    addModule() {
        const currentFreq = nextFreq

        globalCounter += 1
        nextFreq = nextFreq + ((1 / globalCounter) * startFreq)
        
        this.setState((prevState) => ({
            ...prevState,
            modules: [
                ...prevState.modules,
                {
                    name: "AAA" + globalCounter.toString(),
                    frequency: currentFreq
                }
            ]
        }))
    }

    removeModule(id) {
        // this.state.modules.filter((mod) => (mod.name == id))[0].osc.stop()
        this.setState((prevState) => ({
            ...prevState,
            modules: [
                ...prevState.modules.filter((mod) => (mod.name != id))
            ]
        }))

    }

    render() {
        return (
            <div>
                <h1>Hello world!</h1>
                <button onClick={this.addModule}>Add a module</button>
                <ul>
                    {
                        this.state.modules.map((module) => (
                            <OscillatorModule
                                key={module.name}
                                name={module.name}
                                frequency={module.frequency}
                                audioContext={this.audioContext}
                                onRemoveClick={(e)=>{ this.removeModule(module.name) }}
                            />
                        ))
                    }
                </ul>
            </div>
        )
    }
}