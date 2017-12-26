import React, { Component } from 'react';
import { connect } from 'react-redux'

import { votePost, deletePost, loadSinglePost } from '../actions'
import { openPostModal, closePostModal } from '../actions'
import { loadComments } from '../actions'
import { openCommentModal, closeCommentModal } from '../actions'

import PropTypes from 'prop-types'
import Modal from 'react-modal'

import {Collapse} from 'react-collapse';

import Comment from './Comment'

import * as Helper from '../utils/helper'
import * as API from '../utils/api'


class BlogPostOverview extends Component {
    static propTypes = {
        postId: PropTypes.string.isRequired
    }

    state = {
        post: {},
        deleteModalOpen: false,
        commentSectionExpand: false
    }

    componentDidMount = () => {
        this.loadComments()
        this.setState({ post:this.getPostInfo(this.props.postId) })
    }

    openDeleteModal = () => {
        this.setState({ deleteModalOpen: true })
    }

    closeDeleteModal = () => {
        this.setState({ deleteModalOpen: false })
    }

    toggleCommentSection = () => {
        this.setState(
            { commentSectionExpand:!this.state.commentSectionExpand })
    }


    loadComments = () => {
        API.fetchPostComments(this.props.postId)
                        .then((response)=>{
                            this.props.loadComments(this.props.postId, response)
                        })
    }

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

    vote = (option) => {
        API.votePost(this.props.postId, option)
        this.props.votePost(this.props.postId, option)
    }


    beginEdit = (post) => {
        this.props.loadSinglePost(post)
        this.props.openPostModal()
    }

    finalDelete = (postId) => {
        API.deletePost(postId)
        this.props.deletePost(postId)
    }

    beginAddComment = (post) => {
        this.props.loadSinglePost(post)
        this.props.openCommentModal()
    }


    render() {
        const { postId } = this.props
        const { post, deleteModalOpen, commentSectionExpand } = this.state

        return (
            (post && !post.deleted &&
            <div className='post-detail'>
                <div className='row post-overview'>
                    <div className='col-12'>
                        <h5>{post.title}</h5>
                        <h6>Author: {post.author}</h6>
                        <h6>Category: {post.category}</h6>
                        <h6>Created on {Helper.formatDate(post.timestamp)}</h6>

                        <div className='post-operations'>
                            <button className='btn-op' onClick={()=>this.beginEdit(post)}>Edit</button>
                            <button className='btn-op' onClick={()=>this.openDeleteModal()}>Delete</button>
                        </div>

                        <p className='content'>{post.body}</p>

                        <div className='score'>
                            <div><p>Score: {post.voteScore} </p></div>
                            <button className='btn-vote' onClick={()=>{this.vote('upVote')}}>Upvote</button>
                            <button className='btn-vote' onClick={()=>{this.vote('downVote')}}>Downvote</button>
                        </div>

                        <Modal
                            className='delete-modal'
                            overlayClassName='overlay'
                            isOpen={this.state.deleteModalOpen}
                            onRequestClose={()=>{this.closeDeleteModal()}}
                        >
                            <div>
                                <h5>Are you sure you want to detele this post?</h5>
                                <div className='center'>
                                    <button className='btn-del' onClick={()=>this.closeDeleteModal()}>Go back</button>
                                    <button className='btn-del' onClick={()=>this.finalDelete(postId)}>Yes, delete!</button>
                                </div>
                            </div>

                        </Modal>
                    </div>
                </div>

                <div className='row comment'>
                    <div className='col-12'>
                        <div className='center'>
                            <button className='btn-comment'
                                    onClick={this.toggleCommentSection}>
                                    {this.state.commentSectionExpand?'collapse comments':'expand comments'}</button>
                        </div>
                        <Collapse isOpened={this.state.commentSectionExpand}>
                            <div><hr></hr></div>
                            <div className='comment-title center'>
                                <h6>Comments</h6>
                                <button className='btn-post-comment' onClick={()=>this.beginAddComment(post)}>Post a comment</button>
                            </div>
                            <div>
                                {post.comments && post.comments.map((comment) => (
                                    <Comment key={comment.id} postId={post.id} commentId={comment.id}/>
                                ))}
                            </div>
                        </Collapse>
                    </div>
                </div>

                <div className='row divider'>
                    <div className='col-12'><hr></hr></div>
                </div>
            </div>)
        )
    }
}


function mapStateToProps (state) {
    return {
        posts: state.posts,
        postModalOpen: state.postModalOpen
    }
}

function mapDispatchToProps(dispatch) {
    return {
        votePost: (postId, option) => dispatch(votePost(postId, option)),
        loadSinglePost: (post) => dispatch(loadSinglePost(post)),
        deletePost: (postId) => dispatch(deletePost(postId)),
        openPostModal: () => dispatch(openPostModal()),
        closePostModal: () => dispatch(closePostModal()),
        loadComments: (postId, comments) => dispatch(loadComments(postId, comments)),
        openCommentModal: () => dispatch(openCommentModal()),
        closeCommentModal: () => dispatch(closeCommentModal())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BlogPostOverview);
