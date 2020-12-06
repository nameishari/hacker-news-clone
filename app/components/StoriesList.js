import * as React from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '../util/DateUtil'
import { Link } from 'react-router-dom'

const styles = {
    title: {
        color: 'rgb(187, 46, 31)',
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '5px'
    },
}

export default function StoriesList({ stories }) {
    return (
        <ul>
            {
                stories.map((story) => (
                    <li key={story.id}>
                        <p style={styles.title}><a href={story.url} target='_blank' className='no-style'>{story.title}</a></p>
                        <p className='light-text meta-info'>
                            {
                                <React.Fragment>
                                    <span>by <Link to={{ pathname: '/user/', search: `?id=${story.by}` }}>{story.by}</Link> </span>
                                    <span>on {formatDate(story.time)} </span>
                                    <span>with {story.descendants} comments</span>
                                </React.Fragment>
                            }
                        </p>
                    </li>
                ))
            }
        </ul>
    )
}

StoriesList.propTypes = {
    stories: PropTypes.array.isRequired
}