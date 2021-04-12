import React, { useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import './UploadForm.scss';
import { makeStyles } from '@material-ui/styles'


const UploadForm = (props) =>  {
  const {file, setFile, error, setError} = props
  
  const useClasses = makeStyles(() => ({
    AddHoverColor: {
      "&:hover": {
        background: 'white',
        color: 'blue'
      }
    }
  }))

  const classes = useClasses()


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
      <label className='file-upload'>
        <input type="file" accept="image/*" capture onChange={changeHandler} />
        <AddCircleOutlineOutlinedIcon classes={{ root: classes.AddHoverColor }} fontSize='large'/>
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
