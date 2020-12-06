import * as React from 'react'
import { NavLink } from 'react-router-dom'
import { ThemeConsumer } from '../contexts/theme'

const activeStyle = {
    color: 'rgb(187, 46, 31)'
}

export default function Nav() {
    return (
        <ThemeConsumer>
            {({ theme, toggleTheme }) => (
                <nav className='row space-between'>
                    <ul className='nav row'>
                        <li>
                            <NavLink exact activeStyle={activeStyle} to='/' className='nav-link'>Top</NavLink>
                        </li>
                        <li>
                            <NavLink activeStyle={activeStyle} to='/new' className='nav-link'>New</NavLink>
                        </li>
                    </ul>
                    <button onClick={toggleTheme} className='clear-btn' style={{fontSize: '30px'}}>
                        {theme === 'light' ? '🔦' : '💡'}
                    </button>
                </nav>
            )
            }
        </ThemeConsumer>
    )
}