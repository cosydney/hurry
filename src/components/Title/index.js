import React from 'react'
import Confetti from "../../images/confetti-bg.png";

const Title = () => {
  return (
    <div style={{display: 'flex', justifyContent: 'space-around', flexDirection: 'column', margin: '20px 0px 0px 0px', minHeight: 413}}>
      <h1>Harry</h1>
      <h1 style={{zIndex: 2, fontSize: 42, color: '#232E50',  fontWeight: 600}}>The best way to increase the attendance
rate at your Eventbrite events</h1>
      <h2 style={{zIndex: 2, color: '#232E50'}}>Simply import you event contacts, schedule  your messages and send them !</h2>
      <div className='confetti' style={{background: `url(${Confetti})`}}></div>
    </div>
  )
}

export default Title
