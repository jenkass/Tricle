import React, {useEffect, useState} from "react";
import './Post.css';
import {Avatar, Button} from '@material-ui/core'

const BASE_URL = 'http://localhost:8000/'


function Post({ post, AuthTokenType, AuthToken, username }) {

    const [imageUrl, setImageUrl] = useState('');
    const [comments, setComments] = useState([]);
    const [newComments, setNewComments] = useState('');

    useEffect(() => {
        if (post.image_url_type === "absolute") {
            setImageUrl(post.image_url)
        } else {
            setImageUrl(BASE_URL + post.image_url)
        }
    }, [])

    useEffect(() =>  {
        setComments(post.comments)
    }, [])

    const handleDelete = (event) => {
        event?.preventDefault()
        
        const requestOptions = {
            method: 'GET',
            headers: new Headers({ 'Authorization': AuthTokenType + ' ' + AuthToken})
        }

        fetch(BASE_URL + 'posts/delete/' + post.id, requestOptions)
        .then(response => {
            if (response.ok) {
                window.location.reload()
            } throw response
        })
        .catch(error => {
            alert(error);
        })
    }


    const postComment = (event) => {
        event?.preventDefault()

        const json_str = JSON.stringify({
            'username': username,
            'text': newComments,
            'post_id': post.id
        })

        const requestOptions = {
            method: 'POST',
            headers: new Headers({ 'Authorization': AuthTokenType + ' ' + AuthToken, 'Content-Type': 'application/json'}),
            body: json_str
        }

        fetch(BASE_URL + "comment/create", requestOptions)
        .then(response => {
            if (response.ok){
                return response.json()
            }
        })
        .then(data => {
            fetchComments()
        })
        .catch(error => {
            alert(error);
        })
        .finally(() => {
            setNewComments('');
        })
    }

    const fetchComments = () => {
        fetch(BASE_URL + "comment/all_comments_for/" + post.id)
        .then(response => {
            if (response.ok){
                return response.json()
            } throw response
        })
        .then(data => {
            setComments(data)
        })
        .catch(error => {
            alert(error);
        })
    }

    return (
        <div className="post">
            <div className="post_header">
                <Avatar alt="Catalin" src=""/>
                <div className="post_header_info">
                    <h3>{post.user.username}</h3>
                    <Button className="post_delete" onClick={handleDelete}>Delete</Button>
                </div>
            </div>
            <img className="post_image" src={imageUrl} alt=""/>
            <h4 className="post_text">{post.caption}</h4>
            <div className="post_comments">
                {
                    comments.map((comment) => (
                        <p>
                            <strong>{comment.username}:</strong> {comment.text}
                        </p>
                    ))
                }
            </div>

            <div>
                {AuthToken && (
                    <form className="post_commentsbox">
                        <input className="post_input" type="text" placeholder="Add a comment" value={newComments} onChange={(e) => setNewComments(e.target.value)}/>
                        <button className="post_button" type="submit" disabled={!newComments} onClick={postComment}>Post</button>
                    </form>
                )}
            </div>
        </div>
    )
}

export default Post;