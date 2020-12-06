import * as React from 'react'
import PropTypes from 'prop-types'
import { formatDate } from '../util/DateUtil'
import { Link } from 'react-router-dom'

export default function MetaInfo({ by, time, karma, comments }) {
    return (
        <p className='light-text meta-info'>
            {
                <React.Fragment>
                    <span>by <Link to={{ pathname: '/user/', search: `?id=${by}` }}>{by}</Link> </span>
                    <span>on {formatDate(time)} </span>
                    {
                        karma !== undefined && <span>with {karma} karma </span>
                    }
                    {
                       comments !== undefined && <span>with {comments} comments</span>
                    }
                </React.Fragment>
            }
        </p>
    )
}

MetaInfo.protoTypes = {
    by: PropTypes.string.isRequired,
    time: PropTypes.number.isRequired,
    karma: PropTypes.number,
    comments: PropTypes.number
}