import React from 'react';
import ListItem from '@material-ui/core/ListItem';
import ListItemText from '@material-ui/core/ListItemText';


export default function SortListItem(props) {

  const {key, name} = props;

  return (
      <ListItem button>
        <ListItemText primary={name} />
      </ListItem>
  )

}
