import React from 'react';
import Typography from '@material-ui/core/Typography';
import { Grid } from "@material-ui/core";


export default function AccountProfile(props) {
  const {classes} = props;
  
  return (  
    <Grid container className={classes.title}>
      <Typography variant='h2' className={classes.title}>My Caffa</Typography>
    </Grid>
  )

}