import React from 'react';
import AccountFavourites from './AccountFavourites';
import Typography from '@material-ui/core/Typography';
import { Grid, GridListTile, Link } from "@material-ui/core";


export default function AccountProfile(props) {
  const {classes} = props;
  
  return (
    
    <Grid container className={classes.title}>
      <Typography variant='h1'>My Caffa</Typography>
    </Grid>
  )



}