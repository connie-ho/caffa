import { useState, useContext, useEffect } from 'react';
import UserContext from '../../contexts/UserContext';
import { makeStyles } from '@material-ui/core/styles';

import {
  Box,
  Button,
  Card,
  CardContent,
  CardHeader,
  Divider,
  Grid,
  TextField
} from '@material-ui/core';



const AccountSettings = (props) => {
  const {editUserHandler, classes} = props
  const {user} = useContext(UserContext);
  const [values, setValues] = useState({
    first_name: '',
    last_name: '',
    email: '',
  })

  useEffect(()=>{
    setValues(prev => ({
      ...prev,
    first_name: user? user.first_name : '',
    last_name: user? user.last_name : '',
    email: user? user.email : '',
  }))
  },[user])

  // console.log("USER IN SETTINGS: ", user)
  // console.log("PROP IN SETTINGS: ", props)

  const handleChange = (event) => {
    setValues({
      ...values,
      [event.target.name]: event.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault()
    console.log('First Name', values.first_name, 'Last Name', values.last_name, 'Email', values.email)
    editUserHandler(values.first_name, values.last_name, values.email)
  }

  return (
    <Grid container>
    <form
      autoComplete="off"
      noValidate
      {...props}
      onSubmit={handleSubmit}
    >
      <Card>
        <CardHeader
          subheader="The information can be edited"
          title="Profile"
        />
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
            onSubmit={editUserHandler}
          >
            Save details
          </Button>
        </Box>
      </Card>
    </form>
    </Grid>
  );
};

export default AccountSettings;