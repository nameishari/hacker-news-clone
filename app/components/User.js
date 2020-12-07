import * as React from 'react'
import queryString from 'query-string'
import { getUser, getStoriesByIds } from '../util/api'
import Loading from './Loading'
import StoriesList from './StoriesList'
import MetaInfo from './MetaInfo'
import ThemeContext from '../contexts/theme'

function userReducer(state, action) {
    switch (action.type) {
        case 'fetch':
            return {
                user: null,
                stories: null
            }
        case 'user-fetched':
            return {
                user: action.user,
                stories: null
            }
        case 'stories-fetched':
            return {
                ...state,
                stories: action.stories
            }
        default:
            throw new Error('Not supported!')
    }
}

export default function User() {
    const [state, dispatch] = React.useReducer(userReducer, { user: null, story: null })
    const theme = React.useContext(ThemeContext)
    const { id } = queryString.parse(location.search)

    React.useEffect(() => {
        dispatch({ type: 'fetch' })
        getUser(id)
            .then((user) => {
                dispatch({ type: 'user-fetched', user })
                return user
            })
            .then((user) => user.submitted)
            .then((ids) => getStoriesByIds(ids))
            .then((stories) => dispatch({ type: 'stories-fetched', stories }))
    }, [id])

    const { user, stories } = state
    return (
        <React.Fragment>
            {
                user === null
                    ? <Loading text='User is Loading' />
                    : <React.Fragment>
                        <p className={theme === 'light' ? 'title dark-color' : 'title light-color'}>{user.id}</p>
                        <MetaInfo by={user.id} time={user.created} karma={user.karma} />
                        <p className={theme === 'light' ? 'dark-color' : 'light-color'}>{user.about}</p>
                    </React.Fragment>
            }

            {
                user !== null && (stories === null
                    ? <Loading text='User stories are loading' />
                    : <React.Fragment>
                        <p className={theme === 'light' ? 'title dark-color' : 'title light-color'}>Posts</p>
                        <StoriesList stories={stories} />
                    </React.Fragment>)
            }
        </React.Fragment>
    )

}
