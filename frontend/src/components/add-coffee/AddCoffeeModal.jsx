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

const useStyles = makeStyles((theme) => ({
  formControl: {
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

export default function CoffeeModal(props) {

  const classes = useStyles();
  const {open, setOpen, url} = props
  const [formState, setFormState] = useState({
    name:'',
    description:'',
    region:'',
    roast:'',
    brand:'',
    acidity:'',
    grain_species:''
  })

  const handleClose = () => {
    setFormState({ name:'',
    description:'',
    region:'',
    roast:'',
    brand:'',
    acidity:'',
    grain_species:''
  })
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };

  const handleChange =(event) => {
    console.log('event changed', event.target.name)
    setFormState({...formState, [event.target.name]: event.target.value})
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} aria-labelledby="form-dialog-title">
        <DialogTitle id="form-dialog-title">Add Your Coffee</DialogTitle>
        <DialogContent>
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
            />
          </Grid>
          <Grid item >
            <TextField
            autoFocus
            margin="dense"
            id="name"
            label="Region"
            type="name"
            name='region'
            fullWidth
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
            >
              <MenuItem value={'Arabica'}>Arabica</MenuItem>
              <MenuItem value={'Robusta'}>Robusta</MenuItem>
            </Select>
            </FormControl>
          </Grid>
          <Grid item >
          <InputLabel id="coffee-image">Coffee Image</InputLabel>
            <Image
              src={url}
            />
          </Grid>
        </Grid>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Cancel
          </Button>
          <Button onClick={handleClose} color="primary">
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}