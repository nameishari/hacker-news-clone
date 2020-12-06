const baseUri = 'https://hacker-news.firebaseio.com/v0/'
const json = '.json?print=pretty'

function getItem(id) {
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