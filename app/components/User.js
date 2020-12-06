import * as React from 'react'
import queryString from 'query-string'
import { getUser, getStoriesByIds } from '../util/api'
import Loading from './Loading'
import StoriesList from './StoriesList'
import { formatDate } from '../util/DateUtil'

export default class User extends React.Component {
    state = {
        user: null,
        stories: null
    }

    componentDidMount() {
        const { id } = queryString.parse(this.props.location.search)
        this.handleFetch(id)
    }

    handleFetch(id) {
        this.setState({
            user: null,
            stories: null,
        })

        getUser(id)
            .then((user) => this.setState({ user }))
            .then(() => this.state.user.submitted)
            .then((ids) => getStoriesByIds(ids))
            .then((stories) => this.setState({ stories }))
    }

    render() {
        const { user, stories } = this.state
        return (
            <React.Fragment>
                {
                    user == null
                        ? <Loading text='User is Loading' />
                        : <React.Fragment>
                            <p className='dark-title'>{user.id}</p>
                            <p className='light-text meta-info'>{`by ${user.id} on ${formatDate(user.created)} has ${user.karma} karma`}</p>
                        </React.Fragment>
                }

                {
                    user != null && (stories == null
                        ? <Loading text='User stories are loading' />
                        : <React.Fragment>
                            <p className='dark-title'>Posts</p>
                            <StoriesList stories={stories} />
                        </React.Fragment>)
                }
            </React.Fragment>
        )
    }
}