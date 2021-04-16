import React from 'react';
import Grid from '@material-ui/core/Grid';
import heroImage from '../../images/heroComponent2.jpg'
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';


const useStyles = makeStyles((theme) => ({
  container:{
    display: 'flex',
    height: '100vh',
    width: '100%',
    flexDirection: 'column',
    alignItems: 'center',
    zIndex:'-1',
    objectFit:'cover'
  },
  imageContainer: {
    position: 'relative',
    backgroundSize: 'contain',
    backgroundRepeat: 'no-repeat',
    overflow: 'hidden'
  },
  image :{
    display:'block',
    objectFit: 'cover',
    width: '100%',
    maxHeight: '100%',
  },
  title: {
    display: 'inline-block',
    position: 'absolute',
    top: '38%',
    margin: '10,10',
    color: 'white',
    textAlign: 'center',
    height: '0',
    right:'44%',
    zIndex:1,
  },
  subtitle: {
    display: 'inline-block',
    position: 'absolute',
    top: '0',
    color: 'white',
    textAlign: 'center',
    right:'50%',
    fontSize:'15px'
  },
}));

 export default function HeroComponent() {

  const classes = useStyles();

  return (
    <Grid container direction="row"
    justify="center"
    alignItems="center"
    className={classes.container}>
      <Grid item xs={12} container className={classes.imageContainer}>
        <img src= {heroImage} className = {classes.image}  />
        <Grid item>
        <Typography variant='h1' className={classes.title}>CAFFA</Typography>
        <Typography variant='p' className={classes.subtitle}>Bringing energy to your mornings</Typography>
        </Grid>
      </Grid>
      {/* <Grid item xs container direction ='column'>
        <Grid item xs={12}>
        <Typography variant='h1' className={classes.title}>CAFFA</Typography>
        <Typography variant='p' className={classes.subtitle}>Bringing energy to your mornings</Typography>
        </Grid> */}
      {/* </Grid> */}
    </Grid>
  )
}