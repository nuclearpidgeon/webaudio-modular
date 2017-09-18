import React from 'react'
import PropTypes from 'prop-types';

export default class OscillatorModule extends React.Component {
    constructor(props) {
        super(props)
        this.oscillator = props.audioContext.createOscillator()
        this.oscillator.frequency.value = props.frequency
    }

    componentDidMount() {
        this.oscillator.frequency.value = this.props.frequency
        this.oscillator.connect(this.props.audioContext.destination);
        this.oscillator.start()
    }

    componentWillUnmount() {
        this.oscillator.stop()
        this.oscillator.disconnect()
    }

    componentDidUpdate() {
        if (this.props.frequency != this.oscillator.frequency.value) {
            this.oscillator.frequency.value = this.props.frequency
        }
    }

    render() {
        return (
            <li>
                { this.props.name } - { this.props.frequency }
                <br />
                <button onClick={(e)=>{ this.props.onRemoveClick(this.props.name) }}>x</button>
            </li>
        )
    }
}