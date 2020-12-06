import * as React from 'react'
import { NavLink } from 'react-router-dom'

const activeStyle = {
    color: 'rgb(187, 46, 31)'
}

export default function Nav() {
    return (
        <nav className='row space-between'>
            <ul className='nav row'>
                <li>
                    <NavLink exact activeStyle={activeStyle} to='/' className='nav-link'>Top</NavLink>
                </li>
                <li>
                    <NavLink activeStyle={activeStyle} to='/new' className='nav-link'>New</NavLink>
                </li>
            </ul>
        </nav>
    )
}