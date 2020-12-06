import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Stories from './components/Stories'
import Nav from './components/Nav'
import './index.css'
import User from './components/User'
import Story from './components/Story'
import { ThemeProvider } from './contexts/theme'

export class App extends React.Component {

    state = {
        theme: 'light',
        toggleTheme: () => {
            this.setState(({ theme }) => ({
                theme: theme == 'light' ? 'dark' : 'light'
            }))
        }
    }

    render() {
        return (
            <Router>
                <ThemeProvider value={this.state}>
                    <div className={this.state.theme}>
                        <div className='container'>
                            <Nav />
                            <Switch>
                                <Route exact path='/' render={() => (<Stories type='top' />)} />
                                <Route path='/new' render={() => (<Stories type='new' />)} />
                                <Route path='/user' component={User} />
                                <Route path='/story' component={Story} />
                                <Route render={() => <h3>Page not found!</h3>} />
                            </Switch>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))