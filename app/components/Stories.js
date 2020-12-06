import * as React from 'react'
import { getStories } from '../util/api'
import PropTypes from 'prop-types'
import Loading from './Loading'
import StoriesList from './StoriesList'

export default class Stories extends React.Component {

    state = {
        stories: null,
        error: null,
        loading: true
    }

    componentDidMount() {
        this.handleGetStories()
    }

    componentDidUpdate(prevProps) {
        if (prevProps.type !== this.props.type) {
            this.handleGetStories()
        }
    }

    handleGetStories() {
        this.setState({
            stories: null,
            error: null,
            loading: true
        })

        getStories(this.props.type)
            .then((stories) =>
                this.setState({
                    stories,
                    loading: false
                })
            ).catch((error) =>
                this.setState({
                    error,
                    loading: false
                })
            )
    }

    render() {
        const { loading, stories, error } = this.state
        const { type } = this.props
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
}

Stories.propTypes = {
    type: PropTypes.string.isRequired
}
