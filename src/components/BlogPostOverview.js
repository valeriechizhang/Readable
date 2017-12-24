import React, { Component } from 'react';
import '../App.css';
import { nav, Button, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux'
import { upVote, downVote } from '../actions'
import PropTypes from 'prop-types'
import { header, url } from '../index'


class BlogPostOverview extends Component {
    static propTypes = {
        postId: PropTypes.string.isRequired
    }

    state = {}

    componentDidMount() {
        console.log(this)
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
        fetch(url+'posts/'+this.props.postId+'?option='+option, {
            method: 'POST',
            headers: header,
        }).then((data) => {console.log(data)})
        if (option === 'upVote') {
            this.props.upVote(this.props.postId)
        }
        if (option === 'downVote') {
            this.props.downVote(this.props.postId)
        }
    }



    render() {
        const post = this.getPostInfo(this.props.postId)
        return (
            (post && !post.deleted &&
            <div className='row post-overview'>
                <div className='col-12'>
                    <h5>{post.title}</h5>
                    <h6>{post.author}</h6>
                    <h6>{post.category}</h6>
                    <h6>Score: {post.voteScore}</h6>
                    <ButtonGroup>
                        <Button className='btn-info btn-xs' onClick={()=>{this.vote('upVote')}}>Upvote</Button>
                        <Button className='btn-info btn-xs' onClick={()=>{this.vote('downVote')}}>Downvote</Button>
                    </ButtonGroup>
                    <p className='content'>{post.body}</p>
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
        upVote: (post) => dispatch(upVote(post)),
        downVote: (post) => dispatch(downVote(post)),
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(BlogPostOverview);
