import * as React from 'react'
import PropTypes from 'prop-types'
import MetaInfo from './MetaInfo'

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
                        <MetaInfo by={story.by} time={story.time} comments={story.descendants} storyId={story.id}/>
                    </li>
                ))
            }
        </ul>
    )
}

StoriesList.propTypes = {
    stories: PropTypes.array.isRequired
}