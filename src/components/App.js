import React, { Component } from 'react';
import '../App.css';
import { nav, Button, ButtonGroup } from 'react-bootstrap';
import { connect } from 'react-redux'
import { loadCategories, loadPosts } from '../actions'
import BlogPostOverview from './BlogPostOverview'
import { header, url } from '../index'


class App extends Component {


    componentDidMount() {
        fetch(url+'categories', {headers: header})
            .then((response) => response.json())
            .then((cates => this.props.loadCategories(cates)))

        fetch(url+'posts', {headers: header})
            .then((response) => response.json())
            .then((posts => this.props.loadPosts(posts)))
    }


    render() {

        const { categories, posts } = this.props
        const cates = (categories && categories.categories)

        return (
            <div className='App'>
                <div className='container'>
                    <nav className='navbar navbar-light bg-light'>
                        <ButtonGroup>
                            <Button className='btn-sm btn-success'>All</Button>
                            {(cates != null && cates.length > 0) && (cates.map((cate) => (
                                <Button key={cate.name} className='btn-sm btn-success'>{cate.name}</Button>
                            )))}
                        </ButtonGroup>
                        <ButtonGroup>
                            <Button className='btn-sm btn-primary'>Sort by Date</Button>
                            <Button className='btn-sm btn-primary'>Sort by Vote</Button>
                        </ButtonGroup>
                        <div className='new-post'>
                            <Button className='btn btn-warning'>New Post</Button>
                        </div>
                    </nav>

                    {(posts && posts.length > 0) && (posts.map((post) => (
                        <BlogPostOverview key={post.id} postId={post.id} />
                    )))}

                </div>
            </div>
        )
    }
}


function mapStateToProps (state) {
    return {
        categories: state.categories,
        posts: state.posts
    }
}

function mapDispatchToProps(dispatch) {
    return {
        loadCategories: (categories) => dispatch(loadCategories(categories)),
        loadPosts: (posts) => dispatch(loadPosts(posts)),
    }
}




export default connect(mapStateToProps, mapDispatchToProps)(App);
