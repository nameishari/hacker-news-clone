import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Stories from './components/Stories'
import Nav from './components/Nav'
import './index.css'
import User from './components/User'
import Story from './components/Story'

export class App extends React.Component {

    render() {
        return (
            <Router>
                <div className='container'>
                    <Nav />
                    <Switch>
                        <Route exact path='/' render={() => (<Stories type='top' />)} />
                        <Route path='/new' render={() => (<Stories type='new' />)} />
                        <Route path='/user' component={User} />
                        <Route path='/story' component={Story} />
                        <Route render={() => <h3>Page not found!</h3>}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))