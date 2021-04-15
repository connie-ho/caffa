import React, { useState } from 'react';
import AddCircleOutlineOutlinedIcon from '@material-ui/icons/AddCircleOutlineOutlined';
import './UploadForm.scss';
import { makeStyles } from '@material-ui/styles'


const UploadForm = (props) =>  {
  const {file, setFile, error, setError, loading} = props
  
  const useClasses = makeStyles(() => ({
    AddHoverColor: {
      "&:hover": {
        background: 'white',
        color: '#f7bc2c'
      }
    },
    transform: {
      transform: `translate(0px, 6rem)`,
      color: '#3d3a3a'
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
       {!tempURL && (<><input type="file" accept="image/*" capture onChange={changeHandler} /> 
       <AddCircleOutlineOutlinedIcon color="primary" className ={classes.transform} classes={{ root: classes.AddHoverColor }} fontSize='large'/></>)}
       { file &&  
      <div className="output">
        { tempURL && (<>
        <input type="file" accept="image/*" capture onChange={changeHandler} /> 
        <img src={tempURL} width="200" height="200" /> </>)}
      </div>
      }
      { error && <div className='error'>{ error }</div>}
      
      </label>
    </form>

  )


}

export default UploadForm;
