import React, { Component } from 'react';
import '../App.css';

import { loadCategories, loadPosts } from '../actions'
import { openPostModal, closePostModal } from '../actions'
import { openCommentModal, closeCommentModal } from '../actions'

import * as API from '../utils/api'

import BlogPostOverview from './BlogPostOverview'
import PostForm from './PostForm'
import CommentForm from './CommentForm'

import { nav, Button, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux'
import Modal from 'react-modal'
import sortBy from 'sort-by'
import CloseIcon from 'react-icons/lib/fa/close'


class App extends Component {

    state = {
        sortAttr: 'timestamp',
        categoryFilter: 'all'
    }


    sortByTime = () => {
        this.setState({ sortAttr: 'timestamp' })
    }

    sortByVote = () => {
        this.setState({ sortAttr: 'voteScore'})
    }

    changeCategory = (category) => {
        this.setState({ categoryFilter: category})
    }


    componentDidMount() {
        API.fetchCategories().then((cates) => this.props.loadCategories(cates))
        API.fetchPosts().then((posts) => this.props.loadPosts(posts))
    }


    render() {

        const { categories, posts } = this.props
        const { sortAttr, categoryFilter } = this.state

        console.log(this.state)

        var displayPosts = posts.sort(sortBy(this.state.sortAttr))

        if (categoryFilter !== 'all') {
            displayPosts = displayPosts.filter(function(post){
                return post.category===categoryFilter
            })
        }


        return (

            <div className='App'>
                <div className='container'>
                    <nav className='navbar navbar-light bg-light'>
                        <ButtonGroup>
                            <Button className={(categoryFilter==='all'
                                    &&'btn-sm btn-category-selected')||'btn-sm btn-category-unselected'}
                                    onClick={()=>this.changeCategory('all')}>All</Button>
                            {categories && (categories.map((cate) => (
                                <Button key={cate.name} className={(categoryFilter===cate.name
                                    &&'btn-sm btn-category-selected')||'btn-sm btn-category-unselected'}
                                    onClick={()=>this.changeCategory(cate.name)}>{cate.name}</Button>
                            )))}
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button className=
                                {(this.state.sortAttr==='timestamp'&&'btn-sm btn-sort-selected')
                                    || 'btn-sm btn-sort-unselected'}
                                onClick={this.sortByTime}>Sort by Date</Button>
                            <Button className={(this.state.sortAttr==='voteScore'&&'btn-sm btn-sort-selected')
                                    || 'btn-sm btn-sort-unselected'}
                                onClick={this.sortByVote}>Sort by Vote</Button>
                        </ButtonGroup>
                        <div className='new-post'>
                            <Button className='btn btn-warning' onClick={()=>{this.props.openPostModal()}}>New Post</Button>
                        </div>
                    </nav>

                    <div>
                        {displayPosts && (displayPosts.map((post) => (
                            <BlogPostOverview key={post.id} postId={post.id} />
                        )))}
                    </div>

                    <Modal
                        className='edit-modal'
                        overlayClassName='overlay'
                        isOpen={this.props.postModalOpen}
                        onRequestClose={()=>{this.props.closePostModal()}}
                    >
                        <div className='close-icon'>
                            <CloseIcon size={30} onClick={()=>this.props.closePostModal()}/>
                        </div>
                        <div>
                            <PostForm />
                        </div>
                    </Modal>


                    <Modal
                        className='edit-modal'
                        overlayClassName='overlay'
                        isOpen={this.props.commentModalOpen}
                        onRequestClose={()=>{this.props.closeCommentModal()}}
                    >
                        <div className='close-icon'>
                            <CloseIcon size={30} onClick={()=>this.props.closeCommentModal()}/>
                        </div>
                        <div>
                            <CommentForm />
                        </div>
                    </Modal>


                </div>
            </div>
        )
    }
}


function mapStateToProps (state) {
    return {
        categories: state.categories,
        posts: state.posts,
        postModalOpen: state.postModalOpen,
        commentModalOpen: state.commentModalOpen
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadCategories: (categories) => dispatch(loadCategories(categories)),
        loadPosts: (posts) => dispatch(loadPosts(posts)),
        openPostModal: () => dispatch(openPostModal()),
        closePostModal: () => dispatch(closePostModal()),
        openCommentModal: () => dispatch(openCommentModal()),
        closeCommentModal: () => dispatch(closeCommentModal())
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(App);
