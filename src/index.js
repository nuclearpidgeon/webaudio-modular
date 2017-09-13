import React from 'react'
import ReactDOM from 'react-dom'

import SynthBoard from './components/SynthBoard.jsx'

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(React.createElement(SynthBoard, {}), document.getElementById('main'))
})