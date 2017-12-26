import React, { Component } from 'react';
import { connect } from 'react-redux'
import { Button } from 'react-bootstrap';

import { addComment, editComment } from '../actions'
import { openCommentModal, closeCommentModal } from '../actions'

import * as Helper from '../utils/helper'
import * as API from '../utils/api'

class CommentForm extends Component {

    state = {
        currComment: {},
        isEditing: false
    }

    componentDidMount() {
        if (this.props.comment) {
            this.setState({ isEditing: true })
            this.setAuthor(this.props.comment.author)
            this.setBody(this.props.comment.body)
        }
    }

    setAuthor = (author) => {
        this.setState({ currComment : Object.assign(this.state.currComment, { author:author })})
    }

    setBody = (body) => {
        this.setState({ currComment : Object.assign(this.state.currComment, { body:body })})
    }

    setId = (id) => {
        this.setState({ currComment : Object.assign(this.state.currComment, { id: (id || Helper.createUUID()) })})
    }

    setTimestamp = () => {
        this.setState({ currComment : Object.assign(this.state.currComment, { timestamp: Date.now() })})
    }

    setParentId = (postId) => {
        this.setState({ currComment : Object.assign(this.state.currComment, { parentId:postId })})
    }

    setScore = () => {
        this.setState({ currPost : Object.assign(this.state.currComment, { voteScore: 1 })})
    }


    submitComment = () => {
        this.setTimestamp()
        if (this.state.isEditing) {
            API.editComment(
                this.props.comment.id,
                this.state.currComment.timestamp,
                this.state.currComment.body)
            this.props.editComment(
                this.props.comment.parentId,
                this.props.comment.id,
                this.state.currComment.timestamp,
                this.state.currComment.body)
        } else {
            this.setId()
            this.setScore()
            this.setParentId(this.props.post.id)
            API.addComment(this.state.currComment)
            this.props.addComment(this.props.post.id, this.state.currComment)
        }
        this.props.closeCommentModal()
    }

    render() {

        const { currComment, isEditing } = this.state

        return (
            <div>
                <form>
                    <div>
                        <div><label>Username:</label></div>
                        <input type='text'
                            value={(currComment.author&&currComment.author)||''}
                            disabled={isEditing}
                            onChange={(event)=>this.setAuthor(event.target.value)}/>
                    </div>

                    <div>
                        <div><label>Content:</label></div>
                        <textarea value={(currComment&&currComment.body)}
                            onChange={(event)=>this.setBody(event.target.value)}/>
                    </div>

                    <div className='submit-post'>
                        <Button className='btn btn-outline-warning' onClick={this.submitComment}>Submit</Button>
                    </div>
                </form>
            </div>
        )
    }
}


function mapStateToProps (state) {
    return {
        post: state.post,
        comment: state.comment
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addComment: (postId, comment) => dispatch(addComment(postId, comment)),
        editComment: (postId, commentId, timestamp, body) => dispatch(editComment(postId, commentId, timestamp, body)),
        openCommentModal: () => dispatch(openCommentModal()),
        closeCommentModal: () => dispatch(closeCommentModal())
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(CommentForm);


