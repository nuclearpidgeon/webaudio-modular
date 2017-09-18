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
            oscillators: [],
            globalPitchShift: 0
        }

        this.addOscillator = this.addOscillator.bind(this)
        this.removeOscillator = this.removeOscillator.bind(this)
        this.handlePitchShiftChange = this.handlePitchShiftChange.bind(this)
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
        this.setState((prevState) => ({
            ...prevState,
            oscillators: [
                ...prevState.oscillators.filter((mod) => (mod.name != id))
            ]
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
                <button onClick={this.addOscillator}>Add an oscillator</button>
                <ul>
                    {
                        this.state.oscillators.map((osc) => {
                            let oscFreq = this.state.globalPitchShift + osc.frequency

                            return (
                                <OscillatorModule
                                    key={osc.name}
                                    name={osc.name}
                                    frequency={oscFreq}
                                    audioContext={this.audioContext}
                                >
                                    <li>
                                        { osc.name } - { oscFreq }
                                        <br />
                                        <button onClick={(e)=>{ this.removeOscillator(osc.name) }}>x</button>
                                    </li>
                                </OscillatorModule>
                            )
                        })
                    }
                </ul>
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