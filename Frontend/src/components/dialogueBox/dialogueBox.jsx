import React,{props} from 'react'
import Styles from './dialogueBox.module.css';


function DialogueBox({info}) {
  return (
    <div className={Styles.outer}>
      <p>
        {info}
      </p> 
    </div>
  )
}

export default DialogueBox