import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom'
import Stories from './components/Stories'
import Nav from './components/Nav'
import './index.css'
import { ThemeProvider } from './contexts/theme'
import Loading from './components/Loading'

const Story = React.lazy(() => import('./components/Story'))
const User = React.lazy(() => import('./components/User'))

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
                            <React.Suspense fallback={<Loading/>}>
                                <Switch>
                                    <Route exact path='/' render={() => (<Stories type='top' />)} />
                                    <Route path='/new' render={() => (<Stories type='new' />)} />
                                    <Route path='/user' component={User} />
                                    <Route path='/story' component={Story} />
                                    <Route render={() => <h3>Page not found!</h3>} />
                                </Switch>
                            </React.Suspense>
                        </div>
                    </div>
                </ThemeProvider>
            </Router>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'))