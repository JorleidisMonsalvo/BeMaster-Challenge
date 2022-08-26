import React from 'react'

const Notification = ({show, message}) => {
  return (
    <div>
        <div id='snackbar' className={show ? 'animation-in' : 'not-show'}>
            {message}
        </div>
    </div>
  )
}

export default Notification