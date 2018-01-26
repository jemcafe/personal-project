import React, { Component } from 'react';
import axios from 'axios';

import Post from './Post/Post';

class Posts extends Component {
    constructor () {
        super();
        this.state = {
            posts: [],
            title: '',
            text: '',
            image: ''
        }
        this.editPost = this.editPost.bind(this);
        this.deletePost = this.deletePost.bind(this);
    }

    componentDidMount () {
        axios.get('/api/posts').then( res => {
            this.setState({ posts: res.data });
        }).catch( err => console.log(err) );
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    createPost ( title, text, image ) {
        const body = {
            title: title,
            text: text,
            image: image
        };

        axios.post('/api/new-post', body).then( res => {
            console.log( res.data );

            axios.get('/api/posts').then( resp => {
                this.setState({ posts: resp.data, title: '', text: '', image: '' });
            }).catch( err => console.log(err) );

        }).catch( err => console.log( err ) );
    }

    editPost ( id, title, text, image ) {
        const body = {
            title: title,
            text: text,
            image: image
        };

        axios.put(`/api/edit-post/${ id }`, body).then( res => {
            console.log( res.data );

            // Eventually this should only update one post instead of all of them
            axios.get('/api/posts').then( resp => {
                this.setState({ posts: resp.data });
            }).catch( err => console.log( err ) );

        }).catch( err => console.log( err ) );
    }
    

    deletePost ( id ) {
        axios.delete(`/api/delete-post/${ id }`).then( res => {
            console.log( res.data );

            axios.get('/api/posts').then( resp => {
                this.setState({ posts: resp.data });
            }).catch( err => console.log( err ) );

        }).catch( err => console.log( err ) );
    }

    render () {
        const { posts } = this.state;

        const listOfPosts = posts.map( post => {
            return <Post key={ post.id } 
                         post={ post }
                         editPost={ this.editPost }
                         deletePost={ this.deletePost } />
        });

        return (
            <div className="posts">
                <div className="posts-container">
                    {/* <div>POSTS COMPONENT</div> */}

                    <div className="new-post">
                        {/* <div>New Post</div> */}
                        <input className="input" value={ this.state.title } placeholder="Title" onChange={ (e) => this.handleChange('title', e.target.value) }/>
                        {/* <input value={ this.state.text } placeholder="Text" onChange={ (e) => this.handleChange('text', e.target.value) }/> */}
                        <input className="input" value={ this.state.image } placeholder="Image Url" onChange={ (e) => this.handleChange('image', e.target.value) }/>
                        <textarea className="input" rows="1" cols="10" value={ this.state.text } placeholder="Text" onChange={ (e) => this.handleChange('text', e.target.value) }></textarea>
                        <button className="btn" onClick={ () => this.createPost(this.state.title, this.state.text, this.state.image) }>Post</button>
                    </div>
                    
                    <ul className="posts-list">

                        { listOfPosts }

                    </ul>

                </div>
            </div>
        )
    }
}

export default Posts;