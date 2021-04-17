import {React, useState, useEffect, useContext} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import { makeStyles } from '@material-ui/core';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import Typography from '@material-ui/core/Typography';
import DialogTitle from '@material-ui/core/DialogTitle';
import CircularProgress from '@material-ui/core/CircularProgress';
import UploadForm from './UploadForm';
import { projectStorage } from '../../firebase/config';
import {googleImageDetection} from './helpers'
import { useHistory } from 'react-router-dom';
import SearchContext from '../../contexts/SearchContext'

export default function FormDialog(props) {

  const {results, setResults} = useContext(SearchContext)
  const [file, setFile] = useState(null);
  const [uploadFile, setUploadFile] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [url, setUrl] = useState(null);
  const [textArray, setTextArray] = useState([]);
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
      
      await setResults({
        url,
        textArray: textArray
      })
      
      localStorage.setItem("url", url)
      localStorage.setItem("textarray", textArray)

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
    paper: { 
      overflow:'auto', maxHeight: '500px', height:400, width:400, alignItems: 'center'
    },
    content: {
      overflow:'auto', display:'flex', flexDirection:'column', justifyContent:'space-between', height:300, width:300, alignItems: 'center', border:"1px dotted black"
    },
    loading: {
      transform: `translate(0em, 0rem)`
    },
    dialogTitle: {
      root: {
        fontSize:'2em'  
      } 
    }
  })
  
  const classes = useStyles()

  return (
    <div>
      <Dialog classes={{ paper: classes.paper }} open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">
          <Typography variant="h6" style={{fontSize: '1.5em'}} > Image Upload </Typography>
        </DialogTitle>
        <DialogContent className={classes.content}>
          <UploadForm file={file} setFile={setFile} error={error} setError={setError} loading={loading}/>
          {loading && <CircularProgress color="primary" style={{position: 'center'}} /> }  
        </DialogContent>

        <DialogActions classes = {{root: classes.centreAlignDialogActions }}>
          <Button variant="outlined" onClick={handleClose} style={{fontSize: '1.0em', margin:'0.5rem'}} color="primary">
            Cancel
          </Button>
          <Button variant="outlined" onClick={() => {uploadAndSearch(file)}} style={{fontSize: '1.0em', margin:'0.5rem'}} color="primary">
            Search
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
