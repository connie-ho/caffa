import React from 'react';
import AccountFavourites from './AccountFavourites';
import Typography from '@material-ui/core/Typography';
import { spacing } from '@material-ui/system';


export default function AccountProfile(props) {

  const {classes} = props;
  
  return (
    
    <div>
      <Typography variant='h1' className={classes.title}>My Caffa</Typography>
    </div>
  )



}