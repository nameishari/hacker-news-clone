import * as React from 'react'
import { getStories } from '../util/api'
import PropTypes from 'prop-types'
import Loading from './Loading'
import StoriesList from './StoriesList'

function storiesReducer(state, action) {
    switch (action.type) {
        case 'fetch':
            return {
                ...state,
                loading: true
            }
        case 'success':
            return {
                stories: action.stories,
                loading: false,
                error: null
            }
        case 'error':
            return {
                ...state,
                loading: false,
                error: action.message
            }
        default:
            throw new Error('Not supported!')
    }
}

export default function Stories({ type }) {
    const [state, dispatch] = React.useReducer(storiesReducer, { stories: null, error: null, loading: true })
    React.useEffect(() => {
        dispatch({ type: 'fetch' })
        getStories(type)
            .then((stories) => dispatch({ type: 'success', stories }))
            .catch((message) => dispatch({ type: 'error', message }))
    }, [type])
    const { loading, stories, error } = state
    if (loading == true) {
        return <Loading text={`Fetching ${type} stories`} />
    }
    if (error) {
        return <p>{error}</p>
    }
    return (
        <StoriesList stories={stories} />
    )
}

Stories.propTypes = {
    type: PropTypes.string.isRequired
}
