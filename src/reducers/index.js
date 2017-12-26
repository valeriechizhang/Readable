import { combineReducers } from 'redux'

import {
    LOAD_POSTS,
    LOAD_CATEGORIES,
    LOAD_SINGLE_POST,

    VOTE_POST,
    ADD_POST,
    EDIT_POST,
    DELETE_POST,

    OPEN_POST_MODAL,
    CLOSE_POST_MODAL,

    LOAD_COMMENTS,
    LOAD_SINGLE_COMMENT,
    VOTE_COMMENT,
    ADD_COMMENT,
    EDIT_COMMENT,
    DELETE_COMMENT,

    OPEN_COMMENT_MODAL,
    CLOSE_COMMENT_MODAL,


} from '../actions'


const initialState = {
    categories: [],
    posts: [],
    postModalOpen: false,
    post: null,
    comment: null,
    commentModalOpen: false
}


function postReducer(state=initialState, action) {
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
        case LOAD_SINGLE_POST:
            return {
                ...state,
                post: action.post
            }
        case VOTE_POST:
            return {
                ...state,
                posts: (state.posts.map((post) => {
                    console.log(post.id, action.postId)
                    if (post.id === action.postId) {
                        if (action.option === 'upVote') {
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
                ...state,
                posts: (state.posts.map((post) => {
                    if (post.id === action.postId) {
                        post.title = action.title
                        post.body = action.body
                    }
                    return post
                }))
            }
        case DELETE_POST:
            return {
                ...state,
                posts: state.posts.filter(post => post.id !== action.postId)
            }
        case LOAD_COMMENTS:
            return {
                ...state,
                posts: (state.posts.map((post) => {
                    if (post.id === action.postId) {
                        post.comments = action.comments
                    }
                    return post
                }))
            }
        case LOAD_SINGLE_COMMENT:
            return {
                ...state,
                comment: action.comment
            }
        case VOTE_COMMENT:
            return {
                ...state,
                posts: (state.posts.map((post) => {
                    if (post.id === action.postId) {
                        if (!post.comments) {
                            post.comments = []
                        }
                        post.comments = post.comments.map((comment) => {
                            if (comment.id === action.commentId) {
                                if (action.option === 'upVote') {
                                    comment.voteScore = comment.voteScore+1
                                } else {
                                    comment.voteScore = comment.voteScore-1
                                }
                            }
                            return comment
                        })
                    }
                    return post
                }))
            }
        case ADD_COMMENT:
            return {
                ...state,
                posts: (state.posts.map((post) => {
                    if (post.id === action.postId) {
                        if (!post.comments) {
                            post.comments = []
                        }
                        post.comments.push(action.comment)
                    }
                    return post
                }))
            }
        case EDIT_COMMENT:
            return {
                ...state,
                posts: (state.posts.map((post) => {
                    if (post.id === action.postId) {
                        if (post.comments) {
                            post.comments = post.comments.map((comment) => {
                                if (comment.id === action.commentId) {
                                    comment.timestamp = action.timestamp
                                    comment.body = action.body
                                }
                                return comment
                            })
                        }
                    }
                    return post
                }))
            }
        case DELETE_COMMENT:
            return {
                ...state,
                posts: (state.posts.map((post) => {
                    if (post.id === action.postId) {
                        post.comments = post.comments.filter((comment) => comment.id !== action.commentId)
                    }
                    return post
                }))
            }
        case OPEN_POST_MODAL:
            return {
                ...state,
                commentModalOpen:false,
                postModalOpen: true
            }
        case CLOSE_POST_MODAL:
            return {
                ...state,
                post: null,
                postModalOpen: false
            }
        case OPEN_COMMENT_MODAL:
            return {
                ...state,
                postModalOpen: false,
                commentModalOpen: true
            }
        case CLOSE_COMMENT_MODAL:
            return {
                ...state,
                comment: null,
                commentModalOpen: false
            }
        default:
            return state
    }
}

export default postReducer
