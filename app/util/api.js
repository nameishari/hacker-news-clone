const baseUri = 'https://hacker-news.firebaseio.com/v0/'
const json = '.json?print=pretty'

function getItem(id) {
    return fetch(baseUri + `item/${id}${json}`)
        .then((res) => res.json())
}

function removeDead(stories) {
    return stories.reduce(({ dead }) => dead !== true)
}

function removeDeleted(stories) {
    return stories.reduce(({ deleted }) => deleted !== true)
}

function onlyStories(stories) {
    return stories.reduce(({ type }) => type === 'story')
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
        .then((items) => removeDeleted(removeDead(onlyStories(items))))
}