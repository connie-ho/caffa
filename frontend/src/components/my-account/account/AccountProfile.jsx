import moment from 'moment';
import {useContext} from 'react';
import UserContext from '../../../contexts/UserContext';
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


export default function AccountProfile(props) {
  const {user} = useContext(UserContext);

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
            src='/static/images/avatars/avatar_6.png'
            sx={{
              height: 100,
              width: 100
            }}
          />

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
        }
