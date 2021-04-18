import moment from 'moment';
import { useContext } from 'react';
import UserContext from '../../contexts/UserContext';
import {
  Avatar,
  Box,
  Button,
  Card,
  CardActions,
  CardContent,
  Divider,
  Typography
} from '@material-ui/core';


// const user = {
  //   avatar: '/static/images/avatars/avatar_6.png',
  //   city: 'Los Angeles',
  //   country: 'USA',
  //   jobTitle: 'Senior Developer',
  //   name: 'Katarina Smith',
  //   timezone: 'GTM-7'
  // };
  
  export default function AccountAvatar(props) {
  const {user} = useContext(UserContext);
  const {avatar, firstName} = props;

  return (
  <Card {...props}>
    <CardContent>
      <Box
        sx={{
          alignItems: 'center',
          display: 'flex',
          flexDirection: 'column'
        }}
      >
        <Avatar
          src={avatar}
          sx={{
            height: 100,
            width: 100
          }}
        />
        <Typography
          color="textPrimary"
          gutterBottom
          variant="h3"
        >
          {firstName}
        </Typography>
        {/* <Typography
          color="textSecondary"
          variant="body1"
        >
          {`${moment().format('hh:mm A')} ${user.timezone}`}
        </Typography> */}
      </Box>
    </CardContent>
    <Divider />
    <CardActions>
      <Button
        color="primary"
        fullWidth
        variant="text"
      >
        Upload picture
      </Button>
    </CardActions>
  </Card>
  )
};
