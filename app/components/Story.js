import * as React from 'react'
import { getItem, getComments } from '../util/api'
import MetaInfo from './MetaInfo'
import Loading from './Loading'
import queryString from 'query-string'
import { ThemeConsumer } from '../contexts/theme'

export default class Story extends React.Component {

    state = {
        story: null,
        comments: null
    }

    componentDidMount() {
        const { id } = queryString.parse(this.props.location.search)
        this.handleFetch(id)
    }

    handleFetch(id) {
        this.setState({
            story: null,
            comments: null
        })

        getItem(id)
            .then((story) => this.setState({ story }))
            .then(() => this.state.story.kids)
            .then((ids) => {
                if (ids !== undefined) {
                    return getComments(ids)
                }
                return []
            })
            .then((comments) => this.setState({ comments }))
    }

    render() {
        const { story, comments } = this.state
        return (
            <ThemeConsumer>
                {
                    ( theme ) => (
                        <React.Fragment>
                            {
                                story == null
                                    ? <Loading text='Story is Loading' />
                                    : <React.Fragment>
                                        <p className={ theme == 'light' ? 'title dark-color' : 'title light-color'}>{story.title}</p>
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
                        </React.Fragment>
                    )
                }
            </ThemeConsumer>
        )
    }

}