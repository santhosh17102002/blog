import React from 'react'
import './FormDemo.css'
import {useForm} from 'react-hook-form'
function FormDemo() {
    let {register,handleSubmit} = useForm() //also study about form state
    function onFormSubmit(userObj){
        console.log(userObj)
    } 
  return (
    <div>
      <p className="display-1 text-info text-center">Form Demo</p>
      {/*username*/}
      <form className="w-50 mx-auto mt-5" onSubmit={handleSubmit(onFormSubmit)}>

      <div className='mb-3'>
        <label htmlFor="username" className="form-label">Username</label>
        <input type = "text" id="username"className="form-control"{...register('username')}/>

      </div>
      {/*email*/}
      <div className='mb-3'>
        <label htmlFor="email" className="form-label">Email</label>
        <input type = "email" id="email" className="form-control"{...register('email')}/>

      </div>
      {/*submit button */}
      <button type="submit" className='btn btn-success'>Submit</button>
      
      </form>
    </div>
  )
}

export default FormDemo
