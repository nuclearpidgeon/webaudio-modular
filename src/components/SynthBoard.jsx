import React from 'react'

import OscillatorModule from './OscillatorModule.jsx'

const startFreq = 440

let globalCounter = 0
let nextFreq = startFreq
let nextFreqDivider = 2

const calcNextFreq = () => (
    nextFreq + ((1 / 2^globalCounter) * startFreq)
)

export default class SynthBoard extends React.Component {
    constructor(props) {
        super(props)
        this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        this.state = {
            oscillators: []
        }

        this.addOscillator = this.addOscillator.bind(this)
        this.removeOscillator = this.removeOscillator.bind(this)
    }

    addOscillator() {
        const currentFreq = nextFreq

        globalCounter += 1
        nextFreq = calcNextFreq(currentFreq)
        
        this.setState((prevState) => ({
            ...prevState,
            oscillators: [
                ...prevState.oscillators,
                {
                    name: "AAA" + globalCounter.toString(),
                    frequency: currentFreq
                }
            ]
        }))
    }

    removeOscillator(id) {
        // this.state.oscillators.filter((mod) => (mod.name == id))[0].osc.stop()
        this.setState((prevState) => ({
            ...prevState,
            oscillators: [
                ...prevState.oscillators.filter((mod) => (mod.name != id))
            ]
        }))

    }

    render() {
        return (
            <div>
                <h1>Hello world!</h1>
                <button onClick={this.addOscillator}>Add an oscillator</button>
                <ul>
                    {
                        this.state.oscillators.map((osc) => (
                            <OscillatorModule
                                key={osc.name}
                                name={osc.name}
                                frequency={osc.frequency}
                                audioContext={this.audioContext}
                                onRemoveClick={(e)=>{ this.removeOscillator(osc.name) }}
                            />
                        ))
                    }
                </ul>
            </div>
        )
    }
}