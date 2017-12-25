export const LOAD_POSTS = 'LOAD_POSTS'
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const VOTE_POST = 'VOTE_POST'
export const ADD_POST = 'ADD_POST'

export const OPEN_POST_MODAL = 'OPEN_POST_MODAL'
export const CLOSE_POST_MODAL = 'CLOSE_POST_MODAL'


export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'
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

export const votePost = (postId, option) => ({
    type: VOTE_POST,
    postId,
    option
})

export const addPost = (post) => ({
    type: ADD_POST,
    post
})

export const openPostModal = () => ({
    type: OPEN_POST_MODAL
})

export const closePostModal = () => ({
    type: CLOSE_POST_MODAL
})





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


