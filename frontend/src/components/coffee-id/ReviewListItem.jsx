import React, {useContext, useState} from 'react';
import UserContext from '../../contexts/UserContext';
import ReviewContext from '../../contexts/ReviewContext';

import DeleteReview from './DeleteReview';
import EditReview from './EditReview';

import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';

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
  const {review, reviewUser, coffee} = props;

  // formatting date
  const dateArr = new Date(review.created_at).toDateString().split(' ');
  const date = `${dateArr[1]} ${dateArr[2]}, ${dateArr[3]}`;
  
  const {user} = useContext(UserContext);
  
  // define edit and delete functionality
  const {editReview, deleteReview} = useContext(ReviewContext);
  const [openDelete, setOpenDelete] = useState(false);
  const [openReviewForm, setOpenReviewForm] = useState(false);
  
  const handleClickOpenDelete = () => {
    setOpenDelete(true);
  };

  const handleCloseDelete = () => {
    setOpenDelete(false);
  };

  const handleClickOpenReviewForm = () => {
    setOpenReviewForm(true);
  };

  const handleCloseReviewForm = () => {
    setOpenReviewForm(false);
  };
  console.log(reviewUser)
  return (
    <>
    <Card className={classes.root}>
      <CardContent>
       <div>{review.rating} Stars </div>
       <div>{review.description}</div>
       <div>{reviewUser.first_name} {reviewUser.last_name}</div>
       <img src={reviewUser.avatar_url} alt={reviewUser.first_name} />
       <div>{date}</div>
      </CardContent>
      <CardActions>
        {
          (user && user.id === review.user_id) ? 
          (<div>
            <Button 
              size="small"
              onClick={handleClickOpenReviewForm}
            >Edit</Button>
            <Button 
              size="small"
              onClick={handleClickOpenDelete}
            >Delete</Button>
          </div>) : ''
        }
      </CardActions>
    </Card>
    <DeleteReview
      id={review.id}
      open={openDelete}
      handleClose={handleCloseDelete}
      handleClickOpen={handleClickOpenDelete}
    />
     <EditReview
      coffee={coffee}
      review={review}
      openReviewForm={openReviewForm}
      setOpenReviewForm={setOpenReviewForm}
      handleCloseReviewForm={handleCloseReviewForm}
      handleClickOpenReviewForm={handleClickOpenReviewForm}
    />
    </>
  );
}
