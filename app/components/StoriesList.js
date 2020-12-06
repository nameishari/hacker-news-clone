import * as React from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '../util/DateUtil'

const styles = {
    title: {
        color: 'rgb(187, 46, 31)',
        fontSize: '18px',
        fontWeight: 'bold',
        marginBottom: '5px'
    },
    meta: {
        marginTop: '0px'
    },
}

export default function StoriesList({ stories }) {
    return (
        <ul>
            {
                stories.map((story) => (
                    <li key={story.id}>
                        <p style={styles.title}><a href={story.url} target='_blank' className='no-style'>{story.title}</a></p>
                        <p style={styles.meta} className='light-text'>
                            {`by ${story.by} on ${formatDate(story.time)} with ${story.descendants} comments`}
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