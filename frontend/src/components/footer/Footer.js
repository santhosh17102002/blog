import React from 'react'
import './Footer.css'
function Footer() {
  return (
    <div className='bg-dark text-white d-flex justify-content-around p-5'>
      <address>
        <p className='lead'>PVPSIT</p>
        <p className='lead'>Vijayawada</p>
      </address>
      <div>
        <p className='lead'>pvpsit@gmail.com</p>
        <p className='lead'>7997567567</p>
      </div>
    </div>
  )
}

export default Footer
