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

export function App() {
    const [theme, setTheme] = React.useState('light')
    const toggleTheme = () => {
        setTheme((theme) => theme == 'light' ? 'dark' : 'light')
    }
    return (
        <Router>
            <ThemeProvider value={theme}>
                <div className={theme}>
                    <div className='container'>
                        <Nav toggleTheme={toggleTheme}/>
                        <React.Suspense fallback={<Loading />}>
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

ReactDOM.render(<App />, document.getElementById('app'))