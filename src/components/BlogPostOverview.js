import React, { Component } from 'react';
import { nav, Button, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux'
import { votePost } from '../actions'
import PropTypes from 'prop-types'
import { header, url } from '../index'
import * as API from '../utils/api'


class BlogPostOverview extends Component {
    static propTypes = {
        postId: PropTypes.string.isRequired
    }

    state = {}


    getPostInfo = (postId) => {
        if (postId && this.props.posts) {
            var intersect = this.props.posts.filter(function(post) {
                if (post.id === postId) {
                    return post
                }
            })
            if (intersect.length > 0) {
                return intersect[0]
            }
        }
    }

    convertDate = (timestamp) => {
        if (timestamp) {
            if (typeof timestamp !== 'number') {
                timestamp = parseInt(timestamp)
            }
            var date = new Date(timestamp)
            return date.toString().slice(4, 16)
        }
    }

    vote = (option) => {
        API.votePost(this.props.postId, option)
        this.props.votePost(this.props.postId, option)
    }



    render() {
        const post = this.getPostInfo(this.props.postId)
        return (
            (post && !post.deleted &&
            <div className='row post-overview'>
                <div className='col-12'>
                    <h5>{post.title}</h5>
                    <h6>Author: {post.author}</h6>
                    <h6>Category: {post.category}</h6>
                    <h6>Created on {this.convertDate(post.timestamp)}</h6>

                    <div className='post-operations'>
                        <button className='btn-op'>Edit</button>
                        <button className='btn-op'>Delete</button>
                    </div>

                    <p className='content'>{post.body}</p>

                    <div className='score'>
                        <div><p>Score: {post.voteScore} </p></div>
                        <button className='btn-vote' onClick={()=>{this.vote('upVote')}}>Upvote</button>
                        <button className='btn-vote' onClick={()=>{this.vote('downVote')}}>Downvote</button>
                    </div>

                    <div className='divider'>
                        <hr></hr>
                    </div>
                </div>
            </div>)
        )
    }
}


function mapStateToProps (state) {
    return {
        posts: state.posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        votePost: (postId, option) => dispatch(votePost(postId, option))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BlogPostOverview);
