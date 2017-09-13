import React from 'react'

export default class SynthBoard extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            modules: []
        }

        this.addModule = this.addModule.bind(this)
    }

    addModule() {
        this.setState((prevState) => ({
            ...prevState,
            modules: [
                ...prevState.modules,
                "AAA"
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
                            <li>{ module }</li>
                        ))
                    }
                </ul>
            </div>
        )
    }
}