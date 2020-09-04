import React, {useState} from 'react';
import axios from 'axios';
import {v4 as randomString} from 'uuid';
import {useSelector} from 'react-redux';
import {useDropzone} from 'react-dropzone';

function Settings() {
    const [imgUrl, setUrl] = useState('https://www.midlandcareconnection.org/wp-content/uploads/cropped-placeholder.jpg')
    const [isUploading, setUploading] = useState(false)
    
    const {user} = useSelector((state) => state.authReducer)
    const {id} = user
    const {getRootProps, getInputProps} = useDropzone({
        accept: "image/*",
        multiple: false,
        onDrop: (file) => {
            getSignedReq(file)
        }
    });

    const getSignedReq = ([file]) => {
        setUploading(true)
        
        const fileName = `${randomString()}-${file.name.replace(/\s/g, '-')}`;
        axios.get('/api/signs3', {
            params: {
                'file-name': fileName,
                'file-type': file.type
            }
        }).then(res => {
            const {signedRequest, url} = res.data
            uploadFile(file, signedRequest, url);
        }).catch(err => console.log(err))
    }

    const uploadFile = (file, signedRequest, url) => {
        const options = {
            headers: {
                'Content-Type': file.type
            }
        }
        axios.put(signedRequest, file, options).then(() => {
            setUrl(url)
            axios.put(`/api/user`, {id, url})
            setUploading(false)
        }).catch(err => {
            setUploading(false)
            if (err.response.status === 403){
                alert(`Your request for a signed URL failed with a status 403. Double check the CORS config and bucket policy in Matts repo.\n${err.stack}`)
            } else {
                alert(`Error: ${err.status}\n ${err.stack}`)
            }
        })
    }

    return (
        <div className="settings">
            <h1>Preview</h1>
            <img src={imgUrl} alt="profile preview" width="300px"/>
            <div 
                 {...getRootProps({className: 'dropzone'})}>
                <input {...getInputProps()} />
                {isUploading ? <p>Please Wait...</p> : <p>Drop File or Click Here</p>}
            </div>
            

        </div>
    )
}

export default Settings;