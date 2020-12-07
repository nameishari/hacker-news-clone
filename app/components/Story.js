import * as React from 'react'
import { getItem, getComments } from '../util/api'
import MetaInfo from './MetaInfo'
import Loading from './Loading'
import queryString from 'query-string'
import ThemeContext from '../contexts/theme'

function storyReducer(state, action) {
    switch (action.type) {
        case 'fetch':
            return {
                story: null,
                comments: null
            }
        case 'user-fetched':
            return {
                story: action.story,
                comments: null
            }
        case 'comments-fetched':
            return {
                ...state,
                comments: action.comments
            }
        default:
            throw new Error('Not supported!')
    }
}
export default function Story() {
    const [state, dispatch] = React.useReducer(storyReducer, { story: null, comments: null })
    const theme = React.useContext(ThemeContext)
    const { id } = queryString.parse(location.search)

    React.useEffect(() => {
        dispatch({ type: 'fetch' })

        getItem(id)
            .then((story) => {
                dispatch({ type: 'user-fetched', story })
                return story.kids
            })
            .then((ids) => {
                if (ids !== undefined) {
                    return getComments(ids)
                }
                return []
            })
            .then((comments) => dispatch({ type: 'comments-fetched', comments }))

    }, [id])

    const { story, comments } = state
    return (
        <React.Fragment>
            {
                story == null
                    ? <Loading text='Story is Loading' />
                    : <React.Fragment>
                        <p className={theme == 'light' ? 'title dark-color' : 'title light-color'}>{story.title}</p>
                        <MetaInfo by={story.by} time={story.time} comments={story.descendants} storyId={story.id} />
                    </React.Fragment>
            }

            {
                story != null && (comments == null
                    ? <Loading text='Story comments are loading' />
                    : <React.Fragment>
                        {
                            comments.map((comment) => (
                                <div key={comment.id} className={`bg-${theme} card`}>
                                    <MetaInfo by={comment.by} time={comment.time} />
                                    <p dangerouslySetInnerHTML={{ __html: comment.text }} />
                                </div>
                            ))
                        }

                    </React.Fragment>)
            }
        </React.Fragment >
    )
}
