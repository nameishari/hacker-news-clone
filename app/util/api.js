const baseUri = 'https://hacker-news.firebaseio.com/v0/'
const json = '.json?print=pretty'

export function getItem(id) {
    return fetch(baseUri + `item/${id}${json}`)
        .then((res) => res.json())
}

function removeDead(stories) {
    return stories.filter(({ dead }) => dead !== true)
}

function removeDeleted(stories) {
    return stories.filter(({ deleted }) => deleted !== true)
}

function onlyStories(stories) {
    return stories.filter(({ type }) => type === 'story')
}

function onlyComments(stories) {
    return stories.filter(({ type }) => type === 'comment')
}

export function getStories(type) {
    return fetch(baseUri + `${type}stories${json}`)
        .then((res) => res.json())
        .then((ids) => {
            if (!ids) {
                throw new Error('Unable to fetch stories')
            }
            return ids.slice(0, 65)
        })
        .then((ids) => Promise.all(ids.map(getItem)))
        .then((items) => removeDeleted(onlyStories(removeDead(items))))
}

export function getUser(id) {
    return fetch(baseUri + `user/${id}${json}`)
        .then((res) => res.json())
}

export function getStoriesByIds(ids) {
    return Promise.all(ids.slice(0, 65).map(getItem))
        .then((items) => removeDeleted(onlyStories(removeDead(items))))
}

export function getComments(ids) {
    return Promise.all(ids.map(getItem))
        .then((items) => removeDeleted(onlyComments(removeDead(items))))
}