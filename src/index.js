import React from 'react'
import ReactDOM from 'react-dom'

import App from './App.jsx'

document.addEventListener('DOMContentLoaded', () => {
    ReactDOM.render(React.createElement(App, {}), document.getElementById('main'))
})