//import * as FetchUtil from '../utils/fetch'
import fetch from 'cross-fetch'

export const LOAD_POSTS = 'LOAD_POSTS'
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'


export const ADD_POST = 'ADD_POST'
export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
export const UP_VOTE= 'UP_VOTE'
export const DOWN_VOTE = 'DOWN_VOTE'
export const FETCH_COMMENT = 'FETCH_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'


export const loadPosts = posts => ({
    type: LOAD_POSTS,
    posts
});

export const loadCategories = categories => ({
    type: LOAD_CATEGORIES,
    categories
})


export function addPost(post) {
    return {
        type: ADD_POST,
        post,
    }
}

export function editPost(post, title, content) {
    return {
        type: EDIT_POST,
        post,
        title,
        content,
    }
}

export function deletePost(post) {
    return {
        type: DELETE_POST,
        post,
    }
}

export function upVote(postId) {
    return {
        type: UP_VOTE,
        postId,
    }
}

export function downVote(postId) {
    return {
        type: DOWN_VOTE,
        postId,
    }
}

export function fetchComment(){
    return {
        type: FETCH_COMMENT
    }
}

export function addComment(post, comment) {
    return {
        type: ADD_COMMENT,
        post,
        comment,
    }
}


