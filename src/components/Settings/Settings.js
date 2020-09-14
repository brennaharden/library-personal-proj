import React, {useState} from 'react';
import axios from 'axios';
import {v4 as randomString} from 'uuid';
import {useSelector, useDispatch} from 'react-redux';
import {getUser} from '../../ducks/authReducer';
import {useDropzone} from 'react-dropzone';

function Settings() {
    const {user} = useSelector((state) => state.authReducer)
    const {id, img} = user
    const [imgUrl, setUrl] = useState(`${img}`)
    
    const [isUploading, setUploading] = useState(false)
    const dispatch = useDispatch()

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
            axios.put(`/api/user`, {id, url}).then(() => {
                axios.get('/auth/user').then(res => {
                    console.log(res.data)
                    dispatch(getUser(res.data))
                }).catch(err => {
                    if (err.response.status !== 401) {
                        console.log(err)
                    }
                })
            })
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
        <div className="set-wrapper">
        <div className="settings">
            <header>
            <h1>My Settings</h1>
            </header>
            <div className="set-grid">
                <div className="photo-box">
                    <img className="preview" src={(img === null) ? `https://www.pngitem.com/pimgs/m/30-307416_profile-icon-png-image-free-download-searchpng-employee.png` : `${imgUrl}`} alt="profile preview" width="300px"/>
                    <div 
                         {...getRootProps({className: 'dropzone'})}>
                        <input {...getInputProps()} />
                        {isUploading ? <p>Please Wait...</p> : <p>Change Profile Picture:<br/><br/>Drop File or Click Here</p>}
                    </div>
                </div>
                <div className="option-container">
                    <div className="branch-wrapper">
                        <select 
                        className="branch"
                        >
                            <option value='2'>North Branch</option>
                            <option value='3'>South Branch</option>
                            <option value='1'>Emily Fowler Branch</option>
                        </select>
                    </div>
                    <div className="checkbox-wrapper">
                        <input name="" type="checkbox" className="checkbox"></input>
                    </div>
                    <div className="old-wrapper">
                        <input placeholder="Old Password"></input>
                    </div>
                    <div className="new-wrapper">
                        <input placeholder="New Password"></input>
                    </div>
                    <button >Save Changes</button>
                </div>
            </div>
        </div>
        </div>
    )
}

export default Settings;