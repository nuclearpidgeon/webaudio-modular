import React from 'react'
import ReactDOM from 'react-dom'

import HelloWorld from './components/HelloWorld.jsx'

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(React.createElement(HelloWorld, {}), document.getElementById('main'))
})