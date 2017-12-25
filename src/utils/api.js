const url = 'http://localhost:3001/'
const header = {'Authorization':'***'}


function get(endpoint) {
    return fetch('http://localhost:3001/'+endpoint, {headers: header})
    .then((response) => response.json())
    .then((res) => { return res })
}

export const fetchCategories = () => { return get('categories') }
export const fetchPosts = () => { return get('posts') }
export const fetchPostsByCategory = (category) => { return get(category+'/posts') }
export const fetchSinglePost = (postId) => { return get('posts/'+postId) }
export const fetchPostComments = (postId) => { return get('posts/'+postId+'/comments') }
export const fetchSingleComment = (commentId) => { return get('comments/'+commentId)}


function post(endpoint) {
    return fetch(url+endpoint, { method: 'POST', headers: header }).then((res)=>res)
}

export const votePost = (postId, option) => { return post('posts/'+postId+'?option='+option)}

export const addPost = (newPost) => {
    return post('posts?id=' + newPost.id
            + '&timestamp=' + newPost.timestamp
            + '&title=' + newPost.title
            + '&body=' + newPost.body
            + '&author=' + newPost.author
            + '&category=' + newPost.category)
}

export const addComment = (newComment) => {
    return post('comments?id=' + newComment.id
            + '&timestamp=' + newComment.timestamp
            + '&body=' + newComment.body
            + '&author=' + newComment.author
            + '&parentId=' + newComment.postId)
}


function del(endpoint) {
    return fetch(url+endpoint, { method: 'DELETE', headers: header })
}

export const deletePost = (postId) => { return del('posts/'+postId) }
export const deleteComment = (commentId) => { return del('comments/'+commentId)}



function put(endpoint) {
    return fetch(url+endpoint, { method: 'PUT', headers: header })
}

export const editPost = (postId, title, body) => {
    return put('posts/'+postId+'?title='+title+'&body='+body)
}
export const editComment = (commentId, timestamp, body) => {
    return put('comments/'+commentId+'?timestamp='+timestamp+'&body='+body)
}






