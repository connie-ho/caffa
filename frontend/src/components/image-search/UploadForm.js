import React, { useState } from 'react';
// import ProgressBar from './ProgressBar';
// import UploadedImage from './UploadedImage';
// import useStorage from '../hooks/useStorage';
// import axios from 'axios';
import './UploadForm.scss';

const UploadForm = (props) =>  {
  const {file, setFile, error, setError} = props
  
  const [tempURL, setTempURL] = useState('');
  const types = ['image/png', 'image/jpeg'];
  
  const changeHandler = (e) => {
    let selected = e.target.files[0]

    if (selected && types.includes(selected.type)) {
      console.log(process.env.REACT_APP_FIREBASE_API_KEY)
      setFile(selected);
      setTempURL(URL.createObjectURL(e.target.files[0]))
      setError('');
    } else {
      setFile(null);
      setError('Please select an image file(png or jpeg)');
    }
  }

  return (
    <form>
      <label>
        <input type="file" accept="image/*" capture onChange={changeHandler} />
        <span>+</span>
      </label>
      { error && <div className='error'>{ error }</div>}
     { file &&  
      <div className="output">
        { tempURL && <img src={tempURL} width="250" height="250" />}
        {/* { file && <ProgressBar file={file} setFile={setFile} />} */}
      </div>
      }
    </form>

  )


}

export default UploadForm;
