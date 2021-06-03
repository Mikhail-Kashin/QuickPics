import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { useSelector } from 'react-redux';


const UploadPicture = () => {
    const history = useHistory(); // so that we can redirect after the image upload is successful
    const [image, setImage] = useState(null);
    const [imageLoading, setImageLoading] = useState(false);
    // const userId = useSelector(state =>
    //     state.session.user.id
    // )
    const [caption, setCaption] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("image", image);
        formData.append("caption", caption)

        // aws uploads can be a bit slow—displaying
        // some sort of loading message is a good idea
        setImageLoading(true);

        const res = await fetch('/api/upload', {
            method: "POST",
            body: formData,
        });
        if (res.ok) {
            await res.json();
            setImageLoading(false);
            history.push("/");
        }
        else {
            setImageLoading(false);
            // a real app would probably use more advanced
            // error handling
            console.log("error");
        }
    }

    const updateImage = (e) => {
        const file = e.target.files[0];
        setImage(file);
    }

    return (
        <main>
            <div className='page'>
                <div className='header'>
                    <h1 className='logo'>Upload your photo!</h1>
                    <p>Add a photo, write a caption, share with friends!</p>
                </div>
                <div className='container'>
                    <form className='uploadForm' onSubmit={handleSubmit}>
                        <input
                            type="file"
                            accept="image/*"
                            onChange={updateImage}
                        />
                        <textarea
                            type='text'
                            placeholder='Caption'
                            value={caption}
                            onChange={(e) => setCaption(e.target.value)}
                        />
                        <button type="submit">Submit</button>
                        {(imageLoading) && <p>Loading...</p>}
                    </form>
                </div>
            </div>
        </main>

    )
}

export default UploadPicture;
