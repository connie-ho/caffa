import { useState, useContext, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Grid,
  TextField,
  CardActions,
} from '@material-ui/core';


const AccountSettings = (props) => {
  const {editUserHandler} = props
  const {classes} = props
  const {user} = useContext(UserContext);
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
    avatar_url: '',
  })

  useEffect(()=>{
    setValues(prev => ({
      ...prev,
      first_name: user? user.first_name : '',
      last_name: user? user.last_name : '',
      email: user? user.email : '',
      avatar_url: user? user.avatar_url : '',
  }))
  },[user])

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    editUserHandler(values.first_name, values.last_name, values.email)
  }

  return (
    <form
      autoComplete="off"
      noValidate
      {...props}
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="Update your account details here"
          title="My Profile"
        />
        <CardContent>
      <Box>
        <img
          width="150px"
          src={values.avatar_url}
          alt={values.first_name}
          style={{borderRadius: '50%'}}
        />
      </Box>
    </CardContent>
    <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions>
        <CardContent>
          <Grid
            container
            spacing={3}
          >
            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                label="First name"
                name="first_name"
                onChange={handleChange}
                required
                value={values.first_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                label="Last name"
                name="last_name"
                onChange={handleChange}
                required
                value={values.last_name}
                variant="outlined"
              />
            </Grid>
            <Grid
              item
              xs={12}
            >
              <TextField
                fullWidth
                label="Email Address"
                name="email"
                onChange={handleChange}
                required
                value={values.email}
                variant="outlined"
              />
            </Grid>
          </Grid>
        </CardContent>
        <Box
          m={2}
        >
          <Button
            className={classes.settingsButton}
            type="submit"
            color="primary"
            variant="outlined"
            onSubmit={handleSubmit}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
  );
};

export default AccountSettings;