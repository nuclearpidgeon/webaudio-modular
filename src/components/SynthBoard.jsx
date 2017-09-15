import React from 'react'

const startFreq = 400

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
        globalCounter += 1
        
        let newOsc = this.audioContext.createOscillator()
        newOsc.frequency.value = nextFreq
        nextFreq = nextFreq + (startFreq / (globalCounter * 2))
        newOsc.start()
        newOsc.connect(this.audioContext.destination);

        this.setState((prevState) => ({
            ...prevState,
            modules: [
                ...prevState.modules,
                {
                    name: "AAA" + globalCounter.toString(),
                    osc: newOsc
                }
            ]
        }))
    }

    removeModule(id) {
        this.state.modules.filter((mod) => (mod.name == id))[0].osc.stop()
        this.setState((prevState) => ({
            ...prevState,
            modules: [
                ...prevState.modules.filter((mod) => (mod.name != id))
            ]
        }))

    }

    componentDidUpdate() {
        // this.state.modules.forEach((module) => {
        //     if (module.running && module.osc)
        // })
    }

    render() {
        return (
            <div>
                <h1>Hello world!</h1>
                <button onClick={this.addModule}>Add a module</button>
                <ul>
                    {
                        this.state.modules.map((module) => (
                            <li key={module.name}>
                                { module.name }
                                <br />
                                <button onClick={(e)=>{ this.removeModule(module.name) }}>x</button>
                            </li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}