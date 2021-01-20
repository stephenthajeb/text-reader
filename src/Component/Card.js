import React from 'react'
import './Card.css'

const Card = ({ item: { image, text }, idx, onClick }) => {
  return (
    <div className="card" id={`card${idx}`} onClick={() => onClick(text, idx)}>
      <img src={process.env.PUBLIC_URL + image} alt={text} key={image} />
      <p style={{ textAlign: 'center' }}>{text}</p>
    </div>
  )
}

export default Card
