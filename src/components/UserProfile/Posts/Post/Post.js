import React, { Component } from 'react';
import './Post.css';
import FaEdit from 'react-icons/lib/fa/edit';
import { Link } from 'react-router-dom';

import { connect } from 'react-redux';

class Post extends Component {
    constructor (props) {
        super(props);
        this.state = {
            title: this.props.post.title,
            text: this.props.post.text,
            image: this.props.post.imageurl,
            editMode: false
        }
    }

    handleChange ( property, value ) {
        this.setState({ [property]: value });
    }

    toggleEdit () {
        console.log( this.state.editMode );
        if ( this.state.editMode === false) {
            this.setState({ editMode: true }); 
        } else {
            this.setState({ editMode: false });
        }
    }

    saveEdit (id, title, text, image) {
        this.toggleEdit();
        this.props.editPost(id, title, text, image);
    }

    render () {
        const { id, title, text, imageurl, dateposted, username } = this.props.post;
        const { profileUser, paramsUsername, user } = this.props;

        // The image will be displayed if the input begins with the condition
        const imageurlCheck = (imageurl.slice(0,7) === 'http://' || imageurl.slice(0,8) === 'https://') ? true : false;

        return (
            <li className="post">
                { !this.state.editMode ? (
                    <div className="post-container">

                        <div className="name-title padding-align">
                            <Link to={`/${username}`}><img src={ profileUser.imageurl} alt="Proifle pic"/></Link>
                            <h3>{ title }</h3>
                        </div>
                        { imageurlCheck && <div className="image"><img src={ imageurl } alt="Url not found"/></div> }
                        <div className="text padding-align" >{ text }</div>
                        <div className="date-edit padding-align">
                            <div>{ dateposted }</div>
                            { user.username === paramsUsername && <div><FaEdit className="fa-edit" onClick={ () => this.toggleEdit() } size={25} color="gray" /></div> }
                        </div>

                    </div>
                ) : (
                    <div className="post-container">

                        { imageurlCheck && <div className="image"><img src={ imageurl } alt="Url not found"/></div> }
                        <div>
                            <input placeholder="Url" defaultValue={ imageurl } onChange={ (e) => this.handleChange('image', e.target.value) }/>
                        </div>
                        <div>
                            <div>Title: <input placeholder="Title" defaultValue={ title } onChange={ (e) => this.handleChange('title', e.target.value) }/></div>
                            <div>Username: { username }</div>
                        </div>
                        <div>Text: <input placeholder="Text" defaultValue={ text } onChange={ (e) => this.handleChange('text', e.target.value) }/></div>
                        <div>{ dateposted }</div>
                        <span>
                            <button onClick={ () => this.toggleEdit() }>Cancel</button>
                            <button onClick={ () => this.saveEdit( id, this.state.title, this.state.text, this.state.image ) }>Save</button>
                            <button onClick={ () => this.props.deletePost( id ) }>Delete</button>
                        </span>

                    </div>
                ) }
            </li>
        )
    }
}

export default connect( state => state )( Post );