import React from 'react';
import Grid from '@material-ui/core/Grid';
import heroImage from '../../images/heroComponent2.jpg'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  container:{
    display: 'flex',
    height: '80vh',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex:'-1',
    objectFit:'cover'
  },
  imageContainer: {
    position: 'relative',
    height: '80vh',
    width: '100%',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    overflow: 'hidden'
  },
  image :{
    objectFit: 'cover',
    width: '100%',
    maxHeight: '100%',
  },
  title: {
    position: 'absolute',
    top: '38%',
    color: 'white',
    textAlign: 'center',
    right:'43%',
  },
  subtitle: {
    position: 'absolute',
    top: '50%',
    color: 'white',
    textAlign: 'center',
    right:'45%',
  },
}));

 export default function HeroComponent() {

  const classes = useStyles();

  return (
    <Grid container direction="row"
    justify="center"
    alignItems="center"
    className={classes.container}>
      <Grid item xs={12} className={classes.imageContainer}>
        <img src= {heroImage} className = {classes.image}  />
      </Grid>
      
      <Grid item xs container direction ='column'>
        <Grid item xs={12}>
        <Typography variant='h1' className={classes.title}>CAFFA</Typography>
        <Typography variant='p' className={classes.subtitle}>Bringing energy to your mornings</Typography>
        </Grid>
      </Grid>
    </Grid>
  )
}