import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route } from 'react-router-dom'
import Stories from './components/Stories'
import Nav from './components/Nav'
import './index.css'
import User from './components/User'

export class App extends React.Component {

    render() {
        return (
            <Router>
                <div className='container'>
                    <Nav />
                    <Route exact path='/' render={() => (<Stories type='top' />)} />
                    <Route path='/new' render={() => (<Stories type='new' />)} />
                    <Route path='/user' component={User} />
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))