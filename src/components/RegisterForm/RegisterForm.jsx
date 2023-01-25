import React, { useState } from 'react'
import { useDispatch } from 'react-redux'

export default function RegisterForm() {
const [name, setName] = useState('')
const [email, setEmail] = useState('')
const [password, setPassword] = useState('')

const dispatch = useDispatch()

const handleChange = (e) => {
const {name, value} = e.target

if(name === 'name') setName(value);
if(name === 'email') setEmail(value);
if(name === 'password') setPassword(value);
}

const handleSubmit = (e) => {
e.preventDefault();
// dispatch(register({name, email, password}));

setName('');
setEmail('');
setPassword('');
};
  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="">
            <span>name</span>
            <input value={name} name='name' required type="text" onChange={handleChange}/>
        </label>
        <label htmlFor="">
            <span>email</span>
            <input value={email} name='email' required type="text" onChange={handleChange}/>
        </label>
        <label htmlFor="">
            <span>password</span>
            <input value={password} name='password' required type="password" onChange={handleChange}/>
        </label>
        <button type='submit'>REGISTER</button>
      </form>
    </div>
  )
}
