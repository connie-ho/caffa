import React from 'react';
import TextField from '@material-ui/core/TextField';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
  root: {
    '& .MuiTextField-root': {
      margin: theme.spacing(1),
      width: '25ch',
    },
  },
}));

export default function FormPropsTextFields() {
  const classes = useStyles();

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <div>
      <TextField id="standard-search" label="Email" type="email" />
        <TextField
          id="standard-password-input"
          label="Password"
          type="password"
          autoComplete="current-password"
        />
      </div>
    </form>
  );
}