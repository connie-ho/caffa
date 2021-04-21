import {React, useContext, useEffect} from 'react';
import classes from './editorPick.module.scss'
import DataContext from '../../contexts/DataContext.js';

export default function EditorPick(props) {

  const {userid, number, img, description} = props
  const {state} = useContext(DataContext);
  const users = Object.values(state.users);
  const coffees =  Object.values(state.coffees);
  const coffee = coffees[number - 1]
  const user = users[userid - 1]


  return (
    <>
      <div className={classes['editor-coffee-card']}>
  
        <img className={classes['editor-coffee-image']} src={ coffee && coffee.image_url} />
        <div className={classes['imgover']}>
        <a href={coffee && `/coffees/${coffee.id}`}>
          <div className={classes['editor-details-section']}>
            <h2 className={classes['coffee-details-brand']}>{ coffee && coffee.brand}</h2>
            <h2 className={classes['coffee-details-name']}>{coffee && coffee.name}</h2>
            <p className={classes['coffee-details-paragraph']}>{description}
            </p>
            <h2 className={classes['coffee-details-chosen']}>Chosen by:</h2>
            <h2 className={classes['coffee-details-person']}>{user && `${user.first_name} ${user.last_name}`}</h2>
            <div className={classes['editor-pic-container']}>
            <img className={classes['editor-pic']} src={img} />
          </div>
          </div>
          </a>
        </div>
      
      </div>
    </>
  )
}
