import React, {useState} from 'react';
import {Button} from '@material-ui/core';
import './ImageUpload.css';

const BASE_URL = 'http://localhost:8000/'


function ImageUpload({AuthToken, AuthTokenType, userId}) {
    const [caption, setCaption] = useState('');
    const [image, setImage] = useState(null);


    const handleChange = (e) => {
        if (e.target.files[0]) {
            setImage(e.target.files[0])
        }
    }

    const handleUpload = (e) => {
        e?.preventDefault();

        const formData = new FormData();
        formData.append('image', image);

        const requestOptions = {
            method: 'POST',
            headers: new Headers({ 'Authorization': AuthTokenType + ' ' + AuthToken }),
            body: formData
        }

        fetch(BASE_URL + 'posts/add_image', requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        })
        .then(data => {
            create_post(data.filename)
        })
        .catch(error => {
            alert(error)
        })
        .finally(() => {
            setCaption('');
            setImage(null);
            document.getElementById('fileInput').value = null
        })
    }

    const create_post = (imageUrl) => {
        const json_str = JSON.stringify({
            'image_url': imageUrl,
            'image_url_type': 'relative',
            'caption': caption,
            'user_id': userId
        })
        const requestOptions = {
            method: 'POST',
            headers: new Headers({ 'Authorization': AuthTokenType + ' ' + AuthToken, 'Content-Type': 'application/json'}),
            body: json_str
        }

        fetch(BASE_URL + 'posts/create', requestOptions)
        .then(response => {
            if (response.ok) {
                return response.json();
            }
            throw response;
        })
        .then(data => {
            window.location.reload()
            window.scrollTo(0, 0)
        })
        .catch(error => {
            alert(error)
        })
    }

    return (
        <div className="image_upload">
            <input type="text" placeholder="Enter a caption" onChange={(event) => setCaption(event.target.value)} value={caption}/>
            <input type="file" id="fileInput" onChange={handleChange}/>
            <Button className="imageUpload_button"onClick={handleUpload}>Upload post</Button>
        </div>
        )
}

export default ImageUpload;