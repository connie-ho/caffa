import React from 'react';
import AccountFavourites from './AccountFavourites';
import Typography from '@material-ui/core/Typography';


export default function AccountProfile(props) {

  const {classes} = props;
  
  return (
    
    <div>
      <Typography variant='h1' className={classes.title}>My Caffa</Typography>
    </div>
  )



}