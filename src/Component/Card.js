import React from 'react'
import './Card.css'

const Card = ({ item: { image, text } }) => {
  return (
    <div className="box" onClick={() => console.log('abc')}>
      <img src={process.env.PUBLIC_URL + image} alt={text} key={image} />
      <p style={{ textAlign: 'center' }}>{text}</p>
    </div>
  )
}

export default Card
