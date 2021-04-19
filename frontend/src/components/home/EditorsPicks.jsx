import React from 'react';
import classes from './editorPick.module.scss'
import Paper from '@material-ui/core/Paper';
export default function EditorPick(props) {

  const {coffees} = props
  console.log('caffa', coffees)
  return (
    <>
      <div className={classes['editor-coffee-card']}>
  
        <img className={classes['editor-coffee-image']} src='https://firebasestorage.googleapis.com/v0/b/project-test-123-84049.appspot.com/o/coffee.jpg?alt=media&token=4638dd01-f7dc-45f2-abe1-970507257065' />
        <div className={classes['imgover']}>
        <a href="/coffees/2">
          <div className={classes['editor-details-section']}>
            <h2 className={classes['coffee-details-brand']}>SF Bay Coffee</h2>
            <h2 className={classes['coffee-details-name']}>The skull crusher</h2>
            <p className={classes['coffee-details-paragraph']}>This coffee reminds me of saturday mornings, breakfast in bed. Perfect for those mornings where you just want to stay in bed all day!
            </p>
            <h2 className={classes['coffee-details-chosen']}>Chosen by:</h2>
            <h2 className={classes['coffee-details-person']}>Connie Ho</h2>
            <div className={classes['editor-pic-container']}>
            <img className={classes['editor-pic']} src='https://avatars.githubusercontent.com/u/66891817?v=4' />
          </div>
          </div>
          </a>
        </div>
      
      </div>
    </>
  )
}
