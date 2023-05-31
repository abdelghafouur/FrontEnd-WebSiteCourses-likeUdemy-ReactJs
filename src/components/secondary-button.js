import React from 'react'

import './secondary-button.css'

const SecondaryButton = (props) => {
  return (
    <div className={`secondary-button-container ${props.rootClassName} `}>
      <button type="submit" className="secondary-button-button TextXS button">
        {props.button}
      </button>
    </div>
  )
}

export default SecondaryButton
