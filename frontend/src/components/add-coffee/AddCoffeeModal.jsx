import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Grid from '@material-ui/core/Grid';
import Image from 'material-ui-image';
import { useHistory } from "react-router-dom";


const useStyles = makeStyles((theme) => ({
  root: {
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  title: {
    fontSize: '1px'
  },
  form: {
    margin: '0'
  },
  imageLabel:{
    color: '#000000',
    fontSize:'1em',
  },
  dialogAction: {
    justifyContent:'center'
  },
  image: {
    width:'400px !important',
    height:'400px !important',
    objectFit:'contain !important',
    display:'flex',
    paddingTop:'1em',
    paddingBottom:'1em'
  }
}));

export default function CoffeeModal(props) {

  const classes = useStyles();
  const {open, setOpen, url, addCoffee} = props
  const [formState, setFormState] = useState({
    name:'',
    description:'',
    region:'',
    roast:'',
    brand:'',
    acidity:'',
    grain_species:'',
    image_url: url
  })

  let history = useHistory();

  const [errors, setErrors] = useState({})

  const validate = () => {
    let temp = {}
    temp.name = formState.name ? "" : "This field is required"
    temp.description = formState.description ? "" : "This field is required"
    temp.region = formState.region ? "" : "This field is required"
    temp.roast = formState.roast ? "" : "This field is required"
    temp.brand = formState.brand ? "" : "This field is required"
    temp.acidity = formState.acidity ? "": "This field is required"
    temp.grain_species = formState.grain_species ? "": "This field is required"
    setErrors({...temp})

    return Object.values(temp).every( x => x === "")
  }

  
  const handleClose = () => {
    setFormState({ name:'',
    description:'',
    region:'',
    roast:'',
    brand:'',
    acidity:'',
    grain_species:''
  })
    setErrors({})
    setOpen(false);
  };

  const handleChange =(event) => {
    setFormState({...formState, [event.target.name]: event.target.value})
  }

  const handleSubmit =(event) => {
    event.preventDefault()
    if(validate()) {
      addCoffee(formState)
      .then ((data) => {
        history.push(`/coffees/${data}`)
      })
    }
  }

  return (
      <Dialog fullWidth maxWidth="sm" open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle className={classes.title} id="form-dialog-title">Add Your Coffee</DialogTitle>
        <form className={classes.form} noValidate autoComplete="off" onSubmit={handleSubmit}>
        <DialogContent maxWidth="sm" fullWidth>
          <DialogContentText>
            Please fill in the fields below to add your coffee.
          </DialogContentText>
          <Grid container direction={"column"} spacing={4}>
          <Grid item >
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Name"
              type="name"
              name='name'
              fullWidth
              value={formState.name || ''}
              onChange={handleChange}
              required
              {...(errors.name && {error:true,helperText:errors.name})}

            />
          </Grid>
          <Grid item >
            <TextField
              autoFocus
              margin="dense"
              id="brand"
              label="Brand"
              type="brand"
              name='brand'
              fullWidth
              value={formState.brand || ''}
              onChange={handleChange}
              required
              {...(errors.brand && {error:true,helperText:errors.brand})}
            />
            </Grid>
          <Grid item >
            <TextField
            id="outlined-multiline-static"
            label="Description"
            multiline
            rows={4}
            variant="outlined"
            fullWidth
            name="description"
            value={formState.description || ''}
            onChange={handleChange}
            required
            {...(errors.description && {error:true,helperText:errors.description})}
            />
          </Grid>
          <Grid item >
            <TextField
            autoFocus
            margin="dense"
            id="region"
            label="Region"
            type="region"
            name='region'
            value={formState.region || ''}
            onChange={handleChange}
            fullWidth
            required
            {...(errors.region && {error:true,helperText:errors.region})}
          />
          </Grid>
          <Grid item >
            <FormControl fullWidth>
            <InputLabel id="roast-label">Roast</InputLabel>
            <Select
              labelId="roast-label"
              id="roast"
              value={formState.roast || ''}
              name="roast"
              onChange={handleChange}
              fullWidth
              required
              {...(errors.roast && {error:true,helperText:errors.roast})}
            >
              <MenuItem value={'Light'}>Light</MenuItem>
              <MenuItem value={'Medium'}>Medium</MenuItem>
              <MenuItem value={'Dark'}>Dark</MenuItem>
            </Select>
            </FormControl>
          </Grid>
          <Grid item >
          <FormControl fullWidth>
            <InputLabel id="acidity-label">Acidity</InputLabel>
            <Select
              labelId="acidity-label"
              id="acidity"
              value={formState.acidity || ''}
              name="acidity"
              onChange={handleChange}
              fullWidth
              required
              {...(errors.acidity && {error:true,helperText:errors.acidity})}
            >
              <MenuItem value={'Low'}>Low</MenuItem>
              <MenuItem value={'Low-Medium'}>Low-Medium</MenuItem>
              <MenuItem value={'Medium'}>Medium</MenuItem>
              <MenuItem value={'Medium-High'}>Medium-High</MenuItem>
              <MenuItem value={'High'}>High</MenuItem>
            </Select>
            </FormControl>
          </Grid>
          <Grid item >
          <FormControl fullWidth>
            <InputLabel id="grain-species-label">Grain Species</InputLabel>
            <Select
              labelId="grain-species-label"
              id="grain-species"
              value={formState.grain_species || ''}
              name="grain_species"
              onChange={handleChange}
              fullWidth
              required
              {...(errors.grain_species && {error:true,helperText:errors.grain_species})}
            >
              <MenuItem value={'Arabica'}>Arabica</MenuItem>
              <MenuItem value={'Robusta'}>Robusta</MenuItem>
            </Select>
            </FormControl>
          </Grid>
          <Grid container justify='center' alignItems='center' >
          <br></br>
            <img className={classes.image}
              src={url}
            />
          </Grid>
        </Grid>
        </DialogContent>
        <DialogActions className={classes.dialogAction}>
          <Button variant="outlined" color="primary" onClick={handleClose}  color="primary">
            Cancel
          </Button>
          <Button variant="outlined" color="primary" type="submit" style={{margin:'0.5em'}} color="primary">
            Add
          </Button>
        </DialogActions>
        </form>
      </Dialog>

  );
}