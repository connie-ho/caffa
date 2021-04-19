import React from 'react'
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import headIcon from "../images/Caffa2.png"
import FacebookIcon from '@material-ui/icons/Facebook';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import InstagramIcon from '@material-ui/icons/Instagram';

const useStyles = makeStyles((theme) => ({ 
  footer:{
    marginTop:'50px',
    marginBottom:'0px',
    paddingTop: '30px',
    paddingBottom: '30px',
    backgroundColor: '#fff7f5',
  },
  footerContainer: {
    display:'flex',
    flexDirection:'column',
    alignItems:'center',
    justifyContent:'center',
    
    [theme.breakpoints.up('sm')]: {
    display:'flex',
    flexDirection:'column',
    alignItems:'flex-start',
    alignContent:'center',
    }
  }
}))

export default function Footer() {

  const classes = useStyles();

    return (
      <Grid container direction='row' justify='center' className={classes.footer}>
        <Grid container xs={12} sm={3} className={classes.footerContainer}> 
              <img src={headIcon} width="50" height="50"  /> 
          <Typography variant="caption" color="inherit">
           © 2021
          </Typography>
        </Grid>
        <Grid container xs={12} sm={3} className={classes.footerContainer} > 
          <Typography variant="body1" color="inherit">
               Company
          </Typography>
          <Typography variant="caption" color="secondary">
               About us
          </Typography>
        </Grid>
        <Grid container xs={12} sm={3} className={classes.footerContainer}> 
          <Typography variant="body1" color="inherit">
               Further Information
          </Typography>
          <Typography variant="caption" color="secondary">
               Terms and conditions
          </Typography>
          <Typography variant="caption" color="secondary">
               Private policy
          </Typography>
        </Grid>
        <Grid container xs={12} sm={3} className={classes.footerContainer}> 
          <Typography variant="body1" color="inherit">
               Follow us
          </Typography>
          <Grid>
          <FacebookIcon />
          <LinkedInIcon />
          <InstagramIcon />
          </Grid>
        </Grid>
      </Grid>
    
  )
}