import { combineReducers } from 'redux'
import sortBy from 'sort-by'

import {
    LOAD_POSTS,
    LOAD_CATEGORIES,
    VOTE_POST,
    ADD_POST,

    OPEN_POST_MODAL,
    CLOSE_POST_MODAL,

    SORT_POST_BY_TIME,
    SORT_POST_BY_VOTE,

    EDIT_POST,
    DELETE_POST,
    FETCH_COMMENTS,
    ADD_COMMENT
} from '../actions'


const initialState = {
    categories: [],
    posts: [],
    postModalOpen: false
}



function getPostIndex(posts, postId) {
    if (posts && postId) {
        for (var i = 0; i < posts.length; i++) {
            var p = posts[i]
            if (p.id === postId) {
                return i
            }
        }
    }
}

function modalReducer(state=initialState, action) {
    switch(action.type) {
        case OPEN_POST_MODAL:
            return {
                ...state,
                postModalOpen: true
            }
        case CLOSE_POST_MODAL:
            return {
                ...state,
                postModalOpen: false
            }
        default:
            return state
    }
}


function postReducer(state=initialState, action) {
    const postIndex = getPostIndex(state.posts, action.postId)

    switch(action.type) {
        case LOAD_CATEGORIES:
            return {
                ...state,
                categories: action.categories.categories
            }
        case LOAD_POSTS:
            return {
                ...state,
                posts: action.posts
            }
        case VOTE_POST:
            return {
                ...state,
                posts: (state.posts.map((post) => {
                    console.log(post.id, action.postId)
                    if (post.id === action.postId) {
                        if (action.option == 'upVote') {
                            post.voteScore = post.voteScore+1
                        } else {
                            post.voteScore = post.voteScore-1
                        }

                    }
                    return post
                }))
            }
        case ADD_POST:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    action.post
                ],
                newPostModalOpen: false
            }
        case EDIT_POST:
            return {
                ...state.posts,
                [postIndex]: {
                    ...state.posts[postIndex],
                    title: action.title,
                    author: action.content
                }
            }
        case DELETE_POST:
            return{
                ...state,
                posts: state.posts(post => post.id !== action.post.id)
            }
        case ADD_COMMENT:
            return {
                ...state,
                posts: {
                    ...state.posts,
                    [postIndex]: {
                        ...state.posts[postIndex],
                        comments: [
                            ...state.posts[postIndex].comment,
                            action.comment
                        ]
                    }
                }
            }
        case OPEN_POST_MODAL:
            return {
                ...state,
                postModalOpen: true
            }
        case CLOSE_POST_MODAL:
            return {
                ...state,
                postModalOpen: false
            }
        default:
            return state
    }
}

export default postReducer
