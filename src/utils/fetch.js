import fetch from 'cross-fetch'

const url = 'http://localhost:3001/'

const header = {
    'Authorization':'***'
}

export const fetchCategories = () => {
    fetch('http://localhost:3001/categories', {headers: header})
    .then((response) => response.json())
    .then((responseJSON) => responseJSON)
}

export const fetchPosts = () => {
    fetch('http://localhost:3001/posts', {headers: header})
    .then((response) => response.json())
    .then((posts) => { return posts.length })
}




