import React from 'react';
import classes from './editorPick.module.scss'

export default function EditorPick(props) {
  return (
    <>
      <div className={classes['editor-coffee-card']}>
        <div className={classes['img-gradient']}>
        <img className={classes['editor-coffee-image']} src ='https://firebasestorage.googleapis.com/v0/b/project-test-123-84049.appspot.com/o/coffee.jpg?alt=media&token=4638dd01-f7dc-45f2-abe1-970507257065' />
        </div>   
        <div className={classes['editor-details-section']}>
          Some text overlaying the container
        </div>
      </div>
    </>
  )
}
