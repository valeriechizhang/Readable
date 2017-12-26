export const LOAD_POSTS = 'LOAD_POSTS'
export const LOAD_CATEGORIES = 'LOAD_CATEGORIES'
export const LOAD_SINGLE_POST = 'LOAD_SINGLE_POST'

export const VOTE_POST = 'VOTE_POST'
export const ADD_POST = 'ADD_POST'

export const OPEN_POST_MODAL = 'OPEN_POST_MODAL'
export const CLOSE_POST_MODAL = 'CLOSE_POST_MODAL'

export const EDIT_POST = 'EDIT_POST'
export const DELETE_POST = 'DELETE_POST'

export const LOAD_COMMENTS = 'LOAD_COMMENTS'
export const LOAD_SINGLE_COMMENT = 'LOAD_SINGLE_COMMENT'
export const ADD_COMMENT = 'ADD_COMMENT'
export const VOTE_COMMENT = 'VOTE_COMMENT'
export const EDIT_COMMENT = 'EDIT_COMMENT'
export const DELETE_COMMENT = 'DELETE_COMMENT'

export const OPEN_COMMENT_MODAL = 'OPEN_COMMENT_MODAL'
export const CLOSE_COMMENT_MODAL = 'CLOSE_COMMENT_MODAL'


export const loadPosts = posts => ({
    type: LOAD_POSTS,
    posts
});

export const loadCategories = categories => ({
    type: LOAD_CATEGORIES,
    categories
})

export const loadSinglePost = post => ({
    type: LOAD_SINGLE_POST,
    post
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

export const openCommentModal = () => ({
    type: OPEN_COMMENT_MODAL
})

export const closeCommentModal = () => ({
    type: CLOSE_COMMENT_MODAL
})

export const editPost = (postId, title, body) => ({
    type: EDIT_POST,
    postId,
    title,
    body,
})

export const deletePost = (postId) => ({
    type: DELETE_POST,
    postId
})

export const loadComments = (postId, comments) => ({
    type: LOAD_COMMENTS,
    postId,
    comments
})

export const loadSingleComment = (comment) => ({
    type: LOAD_SINGLE_COMMENT,
    comment
})

export const addComment = (postId, comment) => ({
    type: ADD_COMMENT,
    postId,
    comment
})

export const voteComment = (postId, commentId, option) => ({
    type: VOTE_COMMENT,
    postId,
    commentId,
    option
})

export const editComment = (postId, commentId, timestamp, body) => ({
    type: EDIT_COMMENT,
    postId,
    commentId,
    timestamp,
    body
})

export const deleteComment = (postId, commentId) => ({
    type: DELETE_COMMENT,
    postId,
    commentId
})







