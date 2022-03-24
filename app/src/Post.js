import React, {useEffect, useState} from "react";
import './Post.css';
import {Avatar, Button} from '@material-ui/core'

const BASE_URL = 'http://localhost:8000/'


function Post({ post, AuthTokenType, AuthToken }) {

    const [imageUrl, setImageUrl] = useState('')
    const [comments, setComments] = useState([])

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
        </div>
    )
}

export default Post;