import React from 'react'
import ReactDOM from 'react-dom'

export class App extends React.Component {
    
    render() {
        return (
            <div>Hari is going to build a hacker news clone using hacker news api</div>
        )
    }
}

ReactDOM.render(<App/>, document.getElementById('app'))