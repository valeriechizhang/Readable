import React, { Component } from 'react';
import { connect } from 'react-redux'
import PropTypes from 'prop-types'
import { Button } from 'react-bootstrap';
import Form, { Input, Fieldset } from 'react-bootstrap-form';
import { addPost, closePostModal } from '../actions'
import * as API from '../utils/api'
import {DebounceInput} from 'react-debounce-input';


class PostForm extends Component {
    // if the post already exists, fetch the post
    state = {
        oldPost: {},
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

    setId = () => {
        this.setState({ currPost : Object.assign(this.state.currPost, { id: this.guid() })})
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
            var res = API.editPost(
                this.state.oldPost.id,
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
            this.setState({oldPost: this.props.post, isEditing: true})
        }
    }

    // type checking!!!

    render() {

        const { categories } = this.props
        const { oldPost, currPost, isEditing } = this.state

        return (
            <div>
                <form readOnly={true}>
                    <div>
                        <label>Title:&nbsp;&nbsp;</label>
                        <input type='text'
                            value={(oldPost&&oldPost.title)}
                            onChange={(event)=>this.setTitle(event.target.value)}/>
                    </div>

                    <div>
                        <label>Username:&nbsp;&nbsp;</label>
                        <input type='text'
                            placeholder={(oldPost&&oldPost.author)}
                            disabled={isEditing}
                            onChange={(event)=>this.setAuthor(event.target.value)}/>
                    </div>

                    <div>
                        <label>Category:&nbsp;&nbsp;</label>
                        <select value={((oldPost&&oldPost.category)||(currPost&&currPost.category)) || 'none'}
                            onChange={(event)=>this.setCategory(event.target.value)}
                            disabled={isEditing}>
                            <option value="none" disabled>Select one...</option>
                            {categories && categories.map((cate) => (
                                <option key={cate.name} value={cate.name}>{cate.name}</option>
                            ))}
                        </select>
                    </div>

                    <div>
                        <textarea placeholder={(oldPost&&oldPost.body)}
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
        categories: state.categories
    }
}

function mapDispatchToProps(dispatch) {
    return {
        addPost: (post) => dispatch(addPost(post)),
        closePostModal: () => dispatch(closePostModal())
        //votePost: (postId, option) => dispatch(votePost(postId, option))
    }
}


export default connect(mapStateToProps, mapDispatchToProps)(PostForm);
