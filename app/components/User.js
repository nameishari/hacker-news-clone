import * as React from 'react'
import queryString from 'query-string'
import { getUser, getStoriesByIds } from '../util/api'
import Loading from './Loading'
import StoriesList from './StoriesList'
import MetaInfo from './MetaInfo'
import { ThemeConsumer } from '../contexts/theme'

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
            <ThemeConsumer>
                {
                    ({ theme }) => (
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
            </ThemeConsumer>
        )
    }
}