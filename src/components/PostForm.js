import React, { Component } from 'react';
import { connect } from 'react-redux'
import { addPost, editPost, closePostModal } from '../actions'
import * as API from '../utils/api'

import { Button } from 'react-bootstrap';


class PostForm extends Component {
    // if the post already exists, fetch the post
    state = {
        currPost: {},
        isEditing: false
    }

    setTitle = (title) => {
        this.setState({ currPost : Object.assign(this.state.currPost, { title:title })})
    }

    setAuthor = (author) => {
        this.setState({ currPost : Object.assign(this.state.currPost, { author:author })})
    }

    setCategory = (category) => {
        this.setState({ currPost : Object.assign(this.state.currPost, { category:category })})
    }

    setBody = (body) => {
        this.setState({ currPost : Object.assign(this.state.currPost, { body:body })})
    }

    setId = (id) => {
        this.setState({ currPost : Object.assign(this.state.currPost, { id: (id || this.guid()) })})
    }

    setTimestamp = () => {
        this.setState({ currPost : Object.assign(this.state.currPost, { timestamp: Date.now() })})
    }

    setScore = () => {
        this.setState({ currPost : Object.assign(this.state.currPost, { voteScore: 1 })})
    }

    // https://stackoverflow.com/questions/105034/create-guid-uuid-in-javascript
    guid = () => {
      function s4() {
        return Math.floor((1 + Math.random()) * 0x10000)
          .toString(16)
          .substring(1);
      }
      return s4() + s4() + '-' + s4() + '-' + s4() + '-' +
        s4() + '-' + s4() + s4() + s4();
    }

    submitPost = () => {
        if (this.state.isEditing) {
            API.editPost(
                this.props.post.id,
                this.state.currPost.title,
                this.state.currPost.body)
            this.props.editPost(this.props.post.id,
                this.state.currPost.title,
                this.state.currPost.body)
        } else {
            this.setId()
            this.setTimestamp()
            this.setScore()
            console.log(this.state.currPost)
            var res = API.addPost(this.state.currPost)
            this.props.addPost(this.state.currPost)
        }
        this.props.closePostModal()

    }

    componentDidMount() {
        if (this.props.post) {
            this.setState({ isEditing: true })
            this.setTitle(this.props.post.title)
            this.setAuthor(this.props.post.author)
            this.setCategory(this.props.post.category)
            this.setBody(this.props.post.body)
        }
    }

    // type checking!!!

    render() {

        const { categories } = this.props
        const { oldPost, currPost, isEditing } = this.state

        return (
            <div>
                <form>
                    <div>
                        <div><label>Title:</label></div>
                        <input type='text'
                            value={(currPost.title&&currPost.title)||''}
                            onChange={(event)=>this.setTitle(event.target.value)}/>
                    </div>

                    <div>
                        <div><label>Username:</label></div>
                        <input type='text'
                            value={(currPost.author&&currPost.author)||''}
                            disabled={isEditing}
                            onChange={(event)=>this.setAuthor(event.target.value)}/>
                    </div>

                    <div>
                        <div><label>Category:</label></div>
                        <select value={(currPost&&currPost.category) || 'none'}
                            onChange={(event)=>this.setCategory(event.target.value)}
                            disabled={isEditing}>
                            <option value="none" disabled>Select one...</option>
                            {categories && categories.map((cate) => (
                                <option key={cate.name} value={cate.name}>{cate.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <div><label>Content:</label></div>
                        <textarea value={(currPost&&currPost.body)}
                            onChange={(event)=>this.setBody(event.target.value)}/>
                    </div>

                </form>

                <div className='submit-post'>
                    <Button className='btn btn-outline-warning' onClick={this.submitPost}>Submit</Button>
                </div>
            </div>
        )
    }
}




function mapStateToProps (state) {
    return {
        categories: state.categories,
        post: state.post
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addPost: (post) => dispatch(addPost(post)),
        editPost: (postId, title, body) => dispatch(editPost(postId, title, body)),
        closePostModal: () => dispatch(closePostModal())
        //votePost: (postId, option) => dispatch(votePost(postId, option))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
