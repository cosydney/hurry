import React from 'react'
import Confetti from "../../images/confetti-bg.png";

const Title = () => {
  const isMobile = window.innerWidth <= 500;
  console.log('node_env', process.env.NODE_ENV)
  console.log("env", process.env)
  return (
    <div style={{display: 'flex', justifyContent: 'space-around', flexDirection: 'column', margin: '20px 0px 0px 0px', minHeight: 413}}>
      <h1>Harry (ALPHA)</h1>
      <h1 style={{zIndex: 2, fontSize: 46, color: '#232E50',  fontWeight: 600}}>Increase the attendance
rate at your Eventbrite events</h1>
      <h2 style={{zIndex: 2, color: '#9197A7', fontSize: 24}}>Simply import you event contacts, schedule  your messages and send them !</h2>
      <div className='confetti' style={{background: `url(${Confetti})`, right: isMobile ? 0 : false}}></div>
    </div>
  )
}

export default Title
