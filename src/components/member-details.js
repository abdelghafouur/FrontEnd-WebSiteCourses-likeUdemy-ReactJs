import React from 'react'


import './member-details.css'

const MemberDetails = (props) => {
  return (
    <div className="member-details-container">
      <img
        alt={props.image_alt}
        src={props.image_src}
        className="member-details-image"
      />
      <h1 className="member-details-text TextXL">{props.heading1}</h1>
      <h1 className="member-details-text1 TextSM">{props.heading11}</h1>
    </div>
  )
}


export default MemberDetails
