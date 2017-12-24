import {
    LOAD_POSTS,
    LOAD_CATEGORIES,
    ADD_POST,
    EDIT_POST,
    DELETE_POST,
    UP_VOTE,
    DOWN_VOTE,
    FETCH_COMMENTS,
    ADD_COMMENT
} from '../actions'


const initialState = {
    categories: [],
    posts: []
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


function postReducer (state = initialState, action) {
    const postIndex = getPostIndex(state.posts, action.postId)

    switch(action.type) {
        case LOAD_CATEGORIES:
            return {
                ...state,
                categories: action.categories
            }
        case LOAD_POSTS:
            return {
                ...state,
                posts: action.posts
            }
        case ADD_POST:
            return {
                ...state,
                posts: [
                    ...state.posts,
                    action.post
                ]
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
        case UP_VOTE:
            return {
                ...state,
                posts: (state.posts.map((post) => {
                    console.log(post.id, action.postId)
                    if (post.id === action.postId) {
                        post.voteScore = post.voteScore+1
                    }
                    return post
                }))
            }
        case DOWN_VOTE:
            return {
                ...state,
                posts: (state.posts.map((post) => {
                    if (post.id === action.postId) {
                        console.log(post.voteScore)
                        post.voteScore -= 1
                        console.log(post.voteScore)
                    }
                    return post
                }))
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
        default:
            return state
    }
}

export default postReducer
