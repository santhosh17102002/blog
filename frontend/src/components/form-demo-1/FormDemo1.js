import React from 'react'

import {useForm} from 'react-hook-form'
function FormDemo1() {
    let {register,handleState,handleSubmit} = useForm();
    function onFormSubmit(userObj){
        console.log(userObj)
    }
  return (
    <div className='grp'>
        <p>Forms</p>
        <form onSubmit = {handleSubmit(onFormSubmit)}>
            <div className='hello'>
            <label htmlFor="username">Name:</label>
            <input type="text" id="username"{...register('username')}></input></div>
            <div className='hello'>
            <label htmlFor="email">email:</label>
            <input type="email" id="email"{...register('email')}></input></div>
            <button type="submit">Submit</button>
        </form>
      
    </div>
  )
}

export default FormDemo1
