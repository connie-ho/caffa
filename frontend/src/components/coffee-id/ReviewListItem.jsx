import React, {useContext} from 'react';
import UserContext from '../../contexts/UserContext';


import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const useStyles = makeStyles({
  root: {
    minWidth: 400,
  },
  bullet: {
    display: 'inline-block',
    margin: '0 2px',
    transform: 'scale(0.8)',
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
});

export default function ReviewListItem(props) {

  const classes = useStyles();
  const {review, reviewUser} = props;
  const dateArr = new Date(review.created_at).toDateString().split(' ');
  const date = `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
  const {user} = useContext(UserContext);

  return (
    <Card className={classes.root}>
      <CardContent>
       <div>{review.rating} Stars </div>
       <div>{review.description}</div>
       <div>{reviewUser.first_name} {reviewUser.last_name}</div>
       <div>{date}</div>
      </CardContent>
      <CardActions>
        {
          (user.id === review.user_id) ? 
          (<div>
            <Button size="small">Edit</Button>
            <Button size="small">Delete</Button>
          </div>) : ''
        }
      </CardActions>
    </Card>
  );
}
