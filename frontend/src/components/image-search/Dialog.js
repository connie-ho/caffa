import {React, useState, useEffect, useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadForm from './UploadForm';
import { projectStorage } from '../../firebase/config';
import googleImageDetection from './helpers'
import { useHistory } from 'react-router-dom';
import SearchContext from '../../contexts/SearchContext'

export default function FormDialog(props) {

  const {results, setResults} = useContext(SearchContext)
  const [file, setFile] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null);
  const [TextArray, setTextArray] = useState([]);
  const history = useHistory();

  useEffect(() => {
    if(uploadFile) {
    setLoading(true)
    // Google storage image upload, state logic to redirect to /search updating results
    const storageRef = projectStorage.ref(uploadFile.name);
    storageRef.put(uploadFile).on('state_changed', (snap) => {

    }, (err) => {
      setError(err)
    }, async () => {
      const url = await storageRef.getDownloadURL();
      const textArray = await googleImageDetection(url)

      setUrl(url)
      setTextArray(textArray)
      
      setResults({
        url,
        textArray: textArray
      })

      console.log('completed functions', url, textArray)
      setLoading(false)
      history.push('/search')
      setOpen(false)
    })
    }
  },[uploadFile])

  const {open, setOpen} = props
  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const uploadAndSearch = (file) => {
    if (file) {
      setUploadFile(file)
    }
    else {
      setError('File not selected')
    }
  }

  const useStyles = makeStyles({
    centreAlignDialogActions: {
      justifyContent: 'center'
    },
    paper: { overflow:'auto', height: '50vh', alignItems: 'center'}
  })
  
  const classes = useStyles()

  return (
    <div>
      <Dialog classes={{ paper: classes.paper }} fullWidth={true} fullHeight={true} maxHeight={'lg'}
  maxWidth={'sm'} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Image Upload</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Please upload your image here
          </DialogContentText>
          <UploadForm file={file} setFile={setFile} error={error} setError={setError}/>  
        </DialogContent>
        {loading && <CircularProgress style={{position: 'center'}} /> }
        <DialogActions classes = {{root: classes.centreAlignDialogActions }}>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={() => {uploadAndSearch(file)}} color="primary">
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}